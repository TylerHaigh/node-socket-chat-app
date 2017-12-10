const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();

// Middleware

app.use(express.status(publicPath));

// Routes


// Listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});