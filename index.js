require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Query  = require("./model/query")
const URI=process.env.MONGO_URI;
mongoose.connect(URI);
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json("hello");
});

app.post('/adding', async (req, res) => {
    if (req.body.title && req.body.message) {
        let data = new Query(req.body);
        data = await data.save();
        res.send({ Status: "Successfully send Message" });
    } else {
        res.send({ Required: "All Fields are Required" });
    }
})
app.get('/looking', async (req, res) => {
    let data = await Quer.find();
    res.send(data);
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
