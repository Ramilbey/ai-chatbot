const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const brain = [
  { pattern: /hello|hi|hey/i, response: "Hey there! How are you today?" },
  { pattern: /who are you/i, response: "I'm a learning AI built with you 😎" },
  {
    pattern: /your name/i,
    response: "You can call me ProtoAI — still learning!",
  },
  { pattern: /bye/i, response: "Goodbye! Come back soon to teach me more." },
];

app.post("/message", (req, res) => {
    const message = req.body.text;
    let reply = "I am not sure i understand that yet"

    for (let item of brain) {
        if (item.pattern.test(message)) {
            reply = item.response;
            break;
        }
    }

    res.json({reply})
})

app.listen (5000, ()=> console.log("Server running on http://localhost:5000"))