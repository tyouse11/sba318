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

  if (task) {
    res.render('task', { task, tasks });
  } else {
    res.status(404).send('Task not found');
  }
});

// PATCH /tasks/:id
router.patch('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
  
    const index = tasks.findIndex(task => task.id === taskId);
  
    if (index !== -1) {
      // Update the task if properties are provided in the request body
      if (title) tasks[index].title = title;
      if (completed !== undefined) tasks[index].completed = completed;
  
      res.json({ success: true, message: 'Task updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  });

  // POST /tasks/:id (for updating completion status)
router.post('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { completed } = req.body;
  
    const index = tasks.findIndex(task => task.id === taskId);
  
    if (index !== -1) {
      // Update the completion status if provided in the request body
      if (completed !== undefined) tasks[index].completed = (completed === 'true');
  
      res.json({ success: true, message: 'Task updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  });

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === taskId);

    if (index !== -1) {
        // Remove the task from the tasks array
        tasks.splice(index, 1);
    
        res.json({ success: true, message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Task not found' });
      }
      
      res.redirect('/tasks');
});
    
module.exports = router;