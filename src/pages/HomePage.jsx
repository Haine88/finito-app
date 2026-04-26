import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import PetDisplay from '../components/PetDisplay';
import '../styles/HomePage.css';
import goldCoin from '../assets/images/gold-coin.png';

const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [coins, setCoins] = useState(260);
  const [energy, setEnergy] = useState(20);  // Start at 20
  const [happiness, setHappiness] = useState(20);  // Start at 20
  const [xp, setXp] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);

  // Get selected character from localStorage
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }
  }, []);

  // Calculate stage based on XP
  useEffect(() => {
    if (xp >= 3000) {
      setCurrentStage(3);
    } else if (xp >= 1000) {
      setCurrentStage(2);
    } else {
      setCurrentStage(1);
    }
  }, [xp]);

  // Energy and Happiness decay system
  useEffect(() => {
    // Decay every minute (60000ms)
    const decayInterval = setInterval(() => {
      // Energy decreases by 5 per hour = ~0.083 per minute
      // Happiness decreases by 3 per hour = ~0.05 per minute
      
      setEnergy(prev => {
        const newEnergy = prev - 0.083;
        return newEnergy < 0 ? 0 : Math.round(newEnergy * 100) / 100;
      });
      
      setHappiness(prev => {
        const newHappiness = prev - 0.05;
        return newHappiness < 0 ? 0 : Math.round(newHappiness * 100) / 100;
      });
    }, 60000); // Every 1 minute

    return () => clearInterval(decayInterval);
  }, []);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  const completeTask = (taskId, reward, earnedXp) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      // Move to completed
      setCompletedTasks([...completedTasks, { 
        ...task, 
        completedAt: new Date().toISOString() 
      }]);
      setTasks(tasks.filter(t => t.id !== taskId));
      
      // Add rewards
      setCoins(coins + reward);
      setXp(xp + earnedXp);
      setHappiness(Math.min(100, happiness + 10));
      setEnergy(Math.min(100, energy + 5));
    }
  };

  const handleFeed = () => {
    if (coins >= 150) {
      setCoins(coins - 150);
      setEnergy(Math.min(100, energy + 30));
    } else {
      alert('Not enough coins! 💰 Complete tasks to earn more!');
    }
  };

  const handlePlay = () => {
    if (coins >= 250) {
      setCoins(coins - 250);
      setHappiness(Math.min(100, happiness + 35));
    } else {
      alert('Not enough coins! 💰 Complete tasks to earn more!');
    }
  };

  const handleEvolve = () => {
    if (coins >= 1000) {
      if (currentStage < 3) {
        if (xp >= (currentStage === 1 ? 1000 : 3000)) {
          setCoins(coins - 1000);
          setXp(xp + 1000);
          alert(`✨ ${character?.name} is evolving to Stage ${currentStage + 1}!`);
        } else {
          const xpNeeded = currentStage === 1 ? 1000 : 3000;
          alert(`Need ${xpNeeded - xp} more XP to evolve! Complete more tasks! ⭐`);
        }
      } else {
        alert('Already at max stage! 🎉');
      }
    } else {
      alert('Not enough coins! 💰 Need 1000 coins to evolve!');
    }
  };

  return (
    <div className="home-page">
      {/* Top Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <img src={goldCoin} alt="coin" style={{ width: '24px', height: '24px' }} />
          {coins}
        </div>
        <div className="stat">⚡ {Math.round(energy)}/100</div>
        <div className="stat">😊 {Math.round(happiness)}/100</div>
        <div className="stat">⭐ {xp} XP</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Current Tasks Panel */}
        <div className="task-panel">
          <div className="panel-header">
            <h2>Current Task</h2>
          </div>
          
          <div className="task-list">
            {isFormOpen ? (
              <TaskForm 
                onSubmit={addTask}
                onCancel={() => setIsFormOpen(false)}
              />
            ) : (
              <>
                <AnimatePresence>
                  {tasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onComplete={completeTask} 
                    />
                  ))}
                </AnimatePresence>
                
                {tasks.length === 0 && (
                  <div className="empty-state">
                    No tasks yet. Click "Add Task" to get started!
                  </div>
                )}
              </>
            )}
          </div>

          {!isFormOpen && (
            <button 
              className="add-task-btn" 
              onClick={() => setIsFormOpen(true)}
            >
              <Plus size={28} />
              <span>Add Task</span>
            </button>
          )}
        </div>

        {/* Pet Display */}
        <div className="pet-container"> 
          <div className="pet-frame">
            <div className="pet-frame-inner">
              <PetDisplay 
                character={character}
                energy={Math.round(energy)}
                happiness={Math.round(happiness)}
                currentStage={currentStage}
              />
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn" onClick={handleFeed}>
              <span className="action-btn-label">FEED</span>
              <span className="action-btn-cost">
                <img src={goldCoin} alt="coin" style={{ width: '20px' }} />
                150
              </span>
            </button>
            
            <button className="action-btn" onClick={handlePlay}>
              <span className="action-btn-label">PLAY</span>
              <span className="action-btn-cost">
                <img src={goldCoin} alt="coin" style={{ width: '20px' }} />
                250
              </span>
            </button>
            
            <button className="action-btn evolve" onClick={handleEvolve}>
              <span className="action-btn-label">EVOLVE</span>
              <span className="action-btn-cost">
                <img src={goldCoin} alt="coin" style={{ width: '20px' }} />
                1000
              </span>
            </button>
          </div>
        </div>

        {/* Completed Tasks Panel */}
        <div className="task-panel">
          <div className="panel-header">
            <h2>Completed Task</h2>
          </div>
          
          <div className="task-list">
            {completedTasks.length === 0 ? (
              <div className="empty-state">
                No completed tasks yet
              </div>
            ) : (
              completedTasks.slice(-10).reverse().map(task => (
                <div key={task.id} className="completed-task">
                  <span>✓ {task.title}</span>
                  <span className="completed-time">
                    {new Date(task.completedAt).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
