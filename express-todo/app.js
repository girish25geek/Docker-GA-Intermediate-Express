require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // handles form data from HTML

const todos = [];

// Root route now shows the TODO list directly
app.get('/', (req, res) => {
  let html = `
    <h1>TODO List</h1>
    <ul>
      ${todos.map(t => `<li>${t.task}</li>`).join('')}
    </ul>
    <form method="POST" action="/todos">
      <input name="task" placeholder="New task" required />
      <button type="submit">Add</button>
    </form>
  `;
  res.send(html);
});

// Redundant now but keeping it if you want a separate endpoint for APIs or automation
app.get('/todos', (req, res) => {
  res.redirect('/'); // Optional: redirect /todos back to /
});

// Handles adding new tasks
app.post('/todos', (req, res) => {
  const { task } = req.body;
  todos.push({ task });
  res.redirect('/'); // Redirects to the main view after adding
});

// Listen on the port defined in .env or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo app running on port ${PORT}`);
});
