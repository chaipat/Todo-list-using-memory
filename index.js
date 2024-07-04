const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];
let id = 1;

// GET /todos - ดึงรายการทั้งหมด
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos - เพิ่มรายการใหม่
app.post('/todos', (req, res) => {
  const newTodo = {
    id: id++,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos/:id - ดึงรายการเฉพาะ ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// PUT /todos/:id - อัพเดตสถานะรายการด้วย ID รับค่า (completed)
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    todo.task = req.body.task !== undefined ? req.body.task : todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE /todos/:id - ลบรายการด้วย ID
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Todo API listening at http://localhost:${port}`);
});
