require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Query = require("./model/query");

const URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000 // 60 seconds timeout
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
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
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
