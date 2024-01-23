// routes/tasks.js
const express = require('express');
const router = express.Router();

// Sample data for tasks
let tasks = [
  { id: 1, title: 'Laundry', completed: false },
  { id: 2, title: 'Dishes', completed: true },
  { id: 3, title: 'Mow Lawn', completed: false},
];

// GET /tasks
router.get('/', (req, res) => {
  res.render('tasks', { tasks });
});

// POST /tasks
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.redirect('/tasks');
});

// GET /tasks/:id
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  res.render('task', { task });
});

module.exports = router;