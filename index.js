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

app.post('/addQuery', async (req, res) => {
  try {
    const { title, message } = req.body;

    // Check for required fields
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    // Create and save new data
    const data = new Query({ title, message });
    await data.save();

    // Send response
    res.status(201).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/getQuery', async (req, res) => {
  try {
    const data = await Query.find();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(4501);
