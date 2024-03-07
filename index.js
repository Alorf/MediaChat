const {ENVURL} = require("./vars.js");
const express = require("express");
const cors = require('cors')
const stream = require("stream");
const http = require("http");
const youtubedl = require("youtube-dl-exec");
const {Server} = require("socket.io");
const bodyParser = require('body-parser');
const {client, token} = require('./discord/index.js');
const {deployCommands} = require('./discord/deploy-commands.js');
const axios = require("axios");
const semver = require('semver');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const {PORT} = require('./vars.js');
const {Video} = require("./entity/Video");
const {FileToSend} = require("./entity/FileToSend");

app.use(bodyParser.json({limit: '100mb'}));
app.use(express.static(__dirname + "/static"));
app.use("/assets", express.static(__dirname + "/static/dist/assets"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

async function get_mp4_url(url) {
    return new Promise((resolve, reject) => {
        youtubedl(url, {
            download: false,
            "get-url": true,
        })
            .then((output) => resolve(output))
            .catch((error) => reject(error));
    });
}

app.get("/video-url", async (req, res) => {
    const video_url = req.query.url;

    if (video_url) {
        if (video_url.includes("youtube") || video_url.includes("twitch")) {
            return res.status(200).json({
                message: "Impossible d'obtenir l'URL de la vidéo.",
            });
        }

        try {
            const url = await get_mp4_url(video_url);
            if (url) {

                let video = new Video(url)
                let fileToSend = new FileToSend(video)
                return res.status(200).json(fileToSend);
            } else {
                return res.status(200).json({
                    message: "Impossible d'obtenir l'URL de la vidéo.",
                });
            }
        } catch (error) {
            return res
                .status(200)
                .json({message: "Veuillez fournir une URL de vidéo."});
        }
    } else {
        return res
            .status(200)
            .json({message: "Veuillez fournir une URL de vidéo."});
    }
});

app.get("/cors", async (req, res) => {
    const video_url = req.query.url;

    try {
        const response = await axios.get(video_url, {responseType: 'arraybuffer'});

        // Copy all headers from the original response to the proxy response
        for (let [key, value] of Object.entries(response.headers)) {
            res.setHeader(key, value);
        }

        // Axios get arraybuffer
        let buffer = new Uint8Array(response.data);

        const readStream = new stream.PassThrough();
        readStream.end(buffer);

        readStream.pipe(res);
    } catch (error) {
        console.error(`Failed to fetch from ${video_url}:`, error.message);
        res.status(500).send({message: 'Error fetching data'});
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/dist/index.html");
});

app.get("/stream", (req, res) => {
    res.sendFile(__dirname + "/static/dist/index.html");
});

app.post("/sendFile", (req, res) => {
    const fileToSend = req.body;

    if (fileToSend.destination.name !== undefined) {
        io.in(fileToSend.destination.name).emit("sendFile", fileToSend);
    } else {
        io.emit("sendFile", fileToSend);
    }

    console.log("Média envoyé");
    res.status(200).send("ok");

});

app.post("/flush", (req, res) => {
    const data = req.body;

    if (data.user !== undefined) {
        io.in(data.user).emit("flush");
    } else {
        io.emit("flush");
    }

    console.log("Chat vidé");

    res.status(200).send("ok");
});


app.post("/skip", (req, res) => {
    const data = req.body;

    if (data.user !== undefined && data.user != null && data.user !== "null") {
        io.in(data.user).emit("skip");
    } else {
        io.emit("skip");
    }

    console.log("Média skip");

    res.status(200).send("ok");
});

let isQueue = false;

app.post("/setup", (req, res) => {
    const data = req.body;
    isQueue = data.queue;

    io.emit("setup", data);

    console.log("Setup envoyé");

    res.status(200).send("ok");
});

app.get("/env", (req, res) => {
    res.status(200).json({env: ENVURL});
});

io.on("connection", (socket) => {

    socket.emit("setup", {queue: isQueue});

    socket.on("join", (key) => {
        socket.join(key);
    });

    socket.on("leave", (key) => {
        socket.leave(key);
    });
});


server.listen(PORT, () => {
    console.log("Listening on *:" + PORT);

    fetch('https://api.github.com/repos/Alorf/MediaChat/contents/package.json?ref=master')
        .then(response => response.json())
        .then(data => {
            const package = JSON.parse(Buffer.from(data.content, 'base64').toString());
            const latestVersion = package.version;
            const currentVersion = require('./package.json').version;
            if (semver.gt(latestVersion, currentVersion)) {
                console.log(`\x1b[33m[INFO]\x1b[0m A new version of mediachat is available (${latestVersion}), current (${currentVersion}).`);
            }
        })

    //Load discord bot commands
    deployCommands();
    //Start discord server
    client.login(token);
});