import React, { useState } from 'react';
import TodoApp from './TodoApp';
import Login from './Login';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    const handleLogout = () => setUser(null);

    return (
        <div>
            {user ? (
                <>
                    <h3>Welcome, {user} <button onClick={handleLogout}>Logout</button></h3>
                    <TodoApp />
                </>
            ) : (
                <Login onLogin={setUser} />
            )}
        </div>
    );
}

export default App;
