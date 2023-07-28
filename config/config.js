const dotenv = require("dotenv")
dotenv.config();

const config ={
server_port: process.env.SERVERPORT
}

module.exports = config
