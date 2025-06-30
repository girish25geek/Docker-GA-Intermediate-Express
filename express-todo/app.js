require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 handles form data

const todos = [];

app.get('/', (req, res) => {
  res.send('Welcome to the TODO API. Use /todos');
});

app.get('/todos', (req, res) => {
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

app.post('/todos', (req, res) => {
  const { task } = req.body;
  todos.push({ task });
  res.redirect('/todos'); // 👈 redirect to view updated list in browser
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo app running on port ${PORT}`);
});
