import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/WelcomePage.css';
import rabbitCarrot from '../assets/images/rabbit-carrot.gif';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      {/* Falling leaves - add your falling leaves GIF here */}
      <div className="falling-leaves">
        {/* <img src={fallingLeavesGif} alt="Falling leaves" /> */}
      </div>

      {/* Rabbit decoration at bottom */}
      <motion.div 
        className="rabbit-decoration"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <img src={rabbitCarrot} alt="Rabbit with carrot" />
      </motion.div>

      {/* Welcome card */}
      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="welcome-card">
          <h3>Let's make it Finito!</h3>
          <p>A todo app that combines simplicity with satisfaction. Do more, stress less, and enjoy every checkpoint along the way.</p>
          </div>
          <button className="begin-btn" onClick={() => navigate('/character-select')}>
            Begin
          </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;