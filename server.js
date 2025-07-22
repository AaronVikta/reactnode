const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');  

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { title } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ message: 'Invalid todo format. "title" must be a non-empty string.' });
    }

    const todo = {
        id: uuidv4(),
        title: title.trim(),
        completed: false
    };

    todos.push(todo);
    res.json({ message: 'Todo added successfully', todo });
});

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, completed } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ message: 'Invalid todo format. "title" must be a non-empty string.' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid todo format. "completed" must be a boolean.' });
    }

    todos[todoIndex] = { id, title: title.trim(), completed };
    res.json({ message: 'Todo updated successfully', todo: todos[todoIndex] });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const userCredentials = {
    username: 'admin',
    password: 'password123'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === userCredentials.username && password === userCredentials.password) {
        return res.json({ success: true, message: 'Login successful' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});