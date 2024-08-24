require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mes = require("./model/query")
const URI=process.env.MONGO_URI;
mongoose.connect(URI);
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.get('/', async (req, res) => {
    res.send("hi");
});
app.post('/add', async (req, res) => {
    try {
      const { title, message } = req.body;
  
      // Check for required fields
      if (!title || !message) {
        return res.status(400).json({ error: 'Title and message are required' });
      }
  
      // Create and save new data
      const data = new mes({ title, message }); // Assuming `port` is the Mongoose model
      await data.save();
  
      // Send response
      res.status(201).json(data);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message }); // 500 Internal Server Error for general errors
    }
  });
app.get('/getData', async (req, res) => {
    let data = await mes.find();
    res.send(data);
})
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
