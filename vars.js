require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENVURL = process.env.ENVURL || "http://localhost:3000";
const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.token;
const role = process.env.role || false;
const sourceName = process.env.sourceName || "mediachat";

module.exports = {
    PORT: PORT,
    ENVURL: ENVURL,
    role: role,
    clientId: clientId,
    guildId: guildId,
    token: token,
    sourceName: sourceName
}
