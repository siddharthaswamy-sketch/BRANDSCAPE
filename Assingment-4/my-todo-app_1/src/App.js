import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import TaskInput from "./components/TaskInput";
import About from "./components/About";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks_v4");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks_v4", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text || !text.trim()) return;
    const newTask = { id: Date.now(), text: text.trim(), done: false };
    setTasks((prev) => [newTask, ...prev]);
    setIsModalOpen(false);
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleDone = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <Router>
      <div className="app-root">
        <header className="navbar">
          <h1 className="brand">📝 Task Manager</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <button className="add-btn" onClick={() => setIsModalOpen(true)}>
              + Add Task
            </button>
          </nav>
        </header>

        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleDone} />
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </ErrorBoundary>
        </main>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <TaskInput onAddTask={addTask} onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}

        <footer className="footer">
          <small>Made with React • Responsive design • Assignment 4</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
