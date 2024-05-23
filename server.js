const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Array to store comments
let comments = [];

// Route to handle comment submission
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    comments.push({ name, comment });
    res.status(201).send('Comment added successfully');
});

// Route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
