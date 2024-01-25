const router = require("../routes/tasks");


// Sample data for tasks
let tasks = [
    { 
        id: 1, 
        title: 'Laundry', 
        completed: false 
    },
    { 
        id: 2, 
        title: 'Dishes', 
        completed: true },

    { 
        id: 3, 
        title: 'Mow Lawn', 
        completed: false
    },
    { 
        id: 4, 
        title: 'Feed Dog', 
        completed: true
    },
    { 
        id: 5, 
        title: 'Get Groceries', 
        completed: true
    },
  ];

module.exports = tasks;
