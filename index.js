const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Import the tasks router
const tasksRouter = require('./routes/tasks'); 

// Middleware for logging incoming requests
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware or route handler
  }); 

// Middleware for parsing form and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS template engine
app.set('view engine', 'ejs');

// Use the tasks router
app.use('/tasks', tasksRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });