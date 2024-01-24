const express = require('express');
const tasks = require('../data/tasks')
const taskDetails = require('../data/taskDetails');
const router = express.Router();

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
    const taskDetail = taskDetails.find(task => task.id === taskId);
  
    if (taskDetail) {
      res.render('task', { task: taskDetail });
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

// GET /tasks
router.get('/', (req, res) => {
    const completedFilter = req.query.completed; // Get the completed query parameter
    
    if (!completedFilter) {
      return res.status(400).json({error: "completed parameter is required"});
    }

    // Filter tasks based of completed status
    

});


    
module.exports = router;