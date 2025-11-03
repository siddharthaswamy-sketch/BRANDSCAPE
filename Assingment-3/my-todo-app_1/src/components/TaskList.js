import React from "react";

function TaskList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty">No tasks yet! 🎯</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.text}</span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
