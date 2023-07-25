const PORT = process.env.PORT || 3000;
const ENVURL = process.env.ENVURL || 'http://localhost:' + PORT;

module.exports = { PORT, ENVURL };
