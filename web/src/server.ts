import express = require("express")
import bodyParser = require("body-parser")
const Redis = require('ioredis-json')

const rediscon = new Redis({
    port: 6379, // Redis port
    host: "redis" 
  });
rediscon.connect();

const app = express()
const PORT = 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/gmailhook", (req, res) => {
  console.log(req.body);
  const buff = Buffer.from(req.body.message.data, 'base64');
  const message = JSON.parse(buff.toString());
  rediscon.set(message.emailAddress, '.', req.body);
  res.status(200).end() // Responding status code
});

app.post("/outlookhook", (req, res) => {
  console.log(req.body);
  rediscon.set(req.body.value[0].resourceData.Id, '.', req.body);
  res.status(200).end() // Responding status code
});


      