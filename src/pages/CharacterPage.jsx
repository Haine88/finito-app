import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/CharacterPage.css';

// Import character images
import flipsyImg from '../assets/images/flopsy(st1).gif';
import embixImg from '../assets/images/embix(st1).gif';
import mallowImg from '../assets/images/mallow(st1).gif';

const CharacterPage = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { 
      id: 'flipsy', 
      name: 'Flopsy', 
      image: flipsyImg,
      stages: [
        { stage: 1, image: flipsyImg },
        { stage: 2, image: '../assets/images/flopsy(st2).gif' },
        { stage: 3, image: '../assets/images/flopsy(st3).gif' }
      ],
      color: '#ff9a56' 
    },
    { 
      id: 'embix', 
      name: 'Embix', 
      image: embixImg,
      stages: [
        { stage: 1, image: embixImg },
        { stage: 2, image: '../assets/images/embix(st2).gif' },
        { stage: 3, image: '../assets/images/embix(st3).gif' }
      ],
      color: '#ff6b6b' 
    },
    { 
      id: 'mallow', 
      name: 'Mallow', 
      image: mallowImg,
      stages: [
        { stage: 1, image: mallowImg },
        { stage: 2, image: '../assets/images/mallow(st2).gif' },
        { stage: 3, image: '../assets/images/mallow(st3).gif' }
      ],
      color: '#a29bfe' 
    }
  ];

  const handleSelect = (character) => {
    setSelectedCharacter(character);
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  return (
    <div className="character-select-page">
      <motion.div 
        className="select-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="select-header">
          <div className="select-title">
            <h1>SELECT YOUR PET</h1>
          </div>
        </div>

        <div className="characters-grid">
          {characters.map((character) => (
            <motion.div
              key={character.id}
              className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(character)}
            >
              <div className="character-card-inner">
                <div className="character-image">
                  <img src={character.image} alt={character.name} />
                </div>
                <h3>{character.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterPage;