require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  todos.push({ task });
  res.status(201).json({ message: 'Todo added' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo app running on port ${PORT}`);
});
