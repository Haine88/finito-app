import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onComplete }) => {
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  const durationIcons = {
    quick: '⚡',
    short: '🕐',
    medium: '🕓',
    long: '📅'
  };

  const durationLabels = {
    quick: 'Quick',
    short: 'Short',
    medium: 'Medium',
    long: 'Long'
  };

  const calculateReward = (duration, priority) => {
    const baseRewards = {
      quick: 50,
      short: 100,
      medium: 200,
      long: 300
    };
    
    const multiplier = priority === 'high' ? 1.5 : priority === 'medium' ? 1.2 : 1;
    return Math.floor(baseRewards[duration] * multiplier);
  };

  const reward = calculateReward(task.duration, task.priority);
  const xp = Math.floor(reward / 5);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="task-card"
      style={{ borderLeftColor: priorityColors[task.priority] }}
    >
      <div className="task-content">
        <h4>{task.title}</h4>
        <div className="task-meta">
          <span>{durationIcons[task.duration]} {durationLabels[task.duration]}</span>
          {task.deadline && (
            <span>📅 {new Date(task.deadline).toLocaleDateString()}</span>
          )}
        </div>
        <div className="task-reward">
          💰 {reward} + ⭐ {xp} XP
        </div>
      </div>
      <button className="complete-btn" onClick={() => onComplete(task.id, reward, xp)}>
        ✓
      </button>
    </motion.div>
  );
};

export default TaskCard;