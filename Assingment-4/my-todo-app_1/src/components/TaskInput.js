import React, { useState } from "react";

function TaskInput({ onAddTask, onClose }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(value);
    setValue("");
  };

  return (
    <div className="task-input-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Enter task..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <div className="form-actions">
          <button type="submit" className="btn primary">Add</button>
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskInput;
