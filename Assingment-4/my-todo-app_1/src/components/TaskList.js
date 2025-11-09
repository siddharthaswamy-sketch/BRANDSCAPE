import React from "react";

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <section className="task-list-wrapper">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet — click <strong>+ Add Task</strong> to create one.</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
              <div className="task-left">
                <input
                  id={`checkbox-${task.id}`}
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onToggle(task.id)}
                />
                <label htmlFor={`checkbox-${task.id}`} className="task-text">
                  {task.text}
                </label>
              </div>
              <div className="task-actions">
                <button className="btn small" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
