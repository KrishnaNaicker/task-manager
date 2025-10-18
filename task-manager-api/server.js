require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// connect to Database
connectDB();

// middleware
app.use(cors());
app.use(express.json()); 

// test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Management API is running! 🚀',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'GET /tasks/:id': 'Get task by ID',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

// API Routes
app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`**Server running on port ${PORT}**`);
  console.log(`**API Base URL: http://localhost:${PORT}**`);
});