const PORT = process.env.PORT || 3000;
const ENVURL = process.env.ENVURL || 'http://localhost:' + PORT;
const { role } = require('./config.json') || false;

module.exports = { PORT, ENVURL, role };
