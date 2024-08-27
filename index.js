require("dotenv").config();
const mongoose = require('mongoose');
const URI=process.env.MONGO_URI;
mongoose.connect(URI);
const ch = require('./temp');
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.get("/", (req,res) =>{
    res.send("helo");
});

app.post('/addmessage', async (req, res) => {
    if (req.body.title && req.body.message ) {
        let data = new ch(req.body);
        data = await data.save();
        res.send({ Status: "Message Send Successfully" });
    } else {

    }

});
app.get('/getmessage', async (req, res) => {
    let data = await ch.find();
    res.send(data);
})

app.listen(4500);
