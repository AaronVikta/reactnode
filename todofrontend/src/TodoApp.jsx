import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css'

const API_URL = 'http://localhost:5000/todos';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(API_URL);
            setTodos(res.data);
        } catch (err) {
            console.error('Error fetching todos', err);
        }
    };

    const addTodo = async () => {
        if (!newTitle.trim()) return;
        try {
            const res = await axios.post(API_URL, { title: newTitle });
            setTodos([...todos, res.data.todo]);
            setNewTitle('');
        } catch (err) {
            console.error('Error adding todo', err);
        }
    };

    const toggleCompleted = async (todo) => {
        try {
            await axios.put(`${API_URL}/${todo.id}`, { title: todo.title, completed: !todo.completed });
            setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
        } catch (err) {
            console.error('Error updating todo', err);
        }
    };

    const startEditing = (todo) => {
        setEditingId(todo.id);
        setEditingTitle(todo.title);
    };

    const saveEdit = async (todo) => {
        if (!editingTitle.trim()) return;
        try {
            await axios.put(`${API_URL}/${todo.id}`, { title: editingTitle, completed: todo.completed });
            setTodos(todos.map(t => t.id === todo.id ? { ...t, title: editingTitle } : t));
            setEditingId(null);
            setEditingTitle('');
        } catch (err) {
            console.error('Error saving todo', err);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingTitle('');
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Error deleting todo', err);
        }
    };

    return (
        <div >
            <h1 className='app__intro'>Todo List</h1>
            <div className='todo__form'>
               <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            </div>
           
            
            <div className='todo__container'>
               <ul className='todo__list'>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleCompleted(todo)}
                        />
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                />
                                <button onClick={() => saveEdit(todo)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        marginLeft: '6px', marginRight: '10px'
                                    }}
                                >
                                    {todo.title}
                                </span>
                                <button onClick={() => startEditing(todo)}
                                  
                                  style={{marginRight:'5px'}}>Edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>X</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            </div>
           
        </div>
    );
}

export default TodoApp;
