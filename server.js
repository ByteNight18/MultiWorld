const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Array to store comments
let comments = [];

// Route to handle comment submission
app.post('/comments', upload.single('image'), (req, res) => {
    const { name, comment } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    comments.push({ name, comment, imageUrl });
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

