const express = require('express');
const app = express();
const http = require('http')
const config = require('./config/config')
const server = http.createServer(app);
const cors = require('cors');
const routes = require('')

const port = process.env.SERVERPORT




app.use(cors());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Methods', "*");

})

app.get('/', (req, res) => {
    res.send('Server Started!')
})

app.use(express.json());
app.use("/", routes);
server.listen(config.server_port, ()=>{
    console.log(`Server started on port ${port}`)
})