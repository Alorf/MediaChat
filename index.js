const express = require("express");
const http = require("http");
const youtubedl = require("youtube-dl-exec");
const {Server} = require("socket.io");
const multer = require("multer");
const bodyParser = require('body-parser');
const {client, token} = require('./discord/index.js');
const {deployCommands} = require('./discord/deploy-commands.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const upload = multer({
    limits: {fieldSize: 25 * 1024 * 1024},
});

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

async function get_mp4_url(url) {
    return new Promise((resolve, reject) => {
        youtubedl(url, {
            download: false,
            "get-url": true,
        }).then((output) => resolve(output));
    });
}

app.get("/video-url", async (req, res) => {
    const video_url = req.query.url;

    if (video_url) {
        if (video_url.includes("youtube") || video_url.includes("twitch")) {
            return res.status(200).json({
                url: "none",
                message: "Impossible d'obtenir l'URL de la vidéo.",
            });
        }

        try {
            const url = await get_mp4_url(video_url);
            if (url) {
                return res.status(200).json({url: url, type: "mp4"});
            } else {
                return res.status(200).json({
                    url: "none",
                    message: "Impossible d'obtenir l'URL de la vidéo.",
                });
            }
        } catch (error) {
            return res
                .status(200)
                .json({url: "none", message: "Veuillez fournir une URL de vidéo."});
        }
    } else {
        return res
            .status(200)
            .json({url: "none", message: "Veuillez fournir une URL de vidéo."});
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/template/upload.html");
});

app.get("/stream", (req, res) => {
    res.sendFile(__dirname + "/template/stream.html");
});

app.post("/sendFile", upload.single("file"), (req, res) => {
    const data = req.body;
    const file = req.file;

    if (data.isLink === "true") {
        io.emit("sendFile", data);

        console.log("Fichier envoyé");

        res.status(200).send("ok");
    } else {
        if (file && file.buffer.length < 25 * 1000000) {
            io.emit("sendFile", data);

            console.log("Fichier envoyé");

            res.status(200).send("ok");
        } else {
            res.status(501).send("fileTooBig");
        }
    }
});

app.post("/sendText", (req, res) => {
    const data = req.body;

    io.emit("text", data);

    console.log("Texte envoyé");

    res.status(200).send("ok");
});

app.post("/flush", (req, res) => {

    io.emit("flush");

    console.log("Chat vidé");

    res.status(200).send("ok");
});

io.on("connection", (socket) => {
    socket.on("flush", () => {
        io.emit("flush");
    });

    socket.on("text", (data) => {
        io.emit("text", data);
    });
});

server.listen(PORT, () => {
    console.log("listening on *:" + PORT);
    //Load discord bot commands
    deployCommands();
    //Start discord server
    client.login(token);
});