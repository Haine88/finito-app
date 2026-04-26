import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import '../styles/TaskForm.css';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    priority: 'medium',
    duration: 'short',
    deadline: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (taskData.title.trim()) {
      onSubmit(taskData);
      setTaskData({ 
        title: '', 
        priority: 'medium', 
        duration: 'short', 
        deadline: '', 
        notes: '' 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="task-form-container"
    >
      <div className="form-header">
        <h3>Add New Task</h3>
        <button className="close-form-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label>Task Title *</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            autoFocus
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select
              value={taskData.priority}
              onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duration</label>
            <select
              value={taskData.duration}
              onChange={(e) => setTaskData({ ...taskData, duration: e.target.value })}
            >
              <option value="quick">⚡ Quick (&lt;1h)</option>
              <option value="short">🕐 Short (1-4h)</option>
              <option value="medium">🕓 Medium (4-8h)</option>
              <option value="long">📅 Long (1+ day)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Deadline (Optional)</label>
          <input
            type="datetime-local"
            value={taskData.deadline}
            onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea
            placeholder="Any additional details..."
            value={taskData.notes}
            onChange={(e) => setTaskData({ ...taskData, notes: e.target.value })}
          />
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskForm;