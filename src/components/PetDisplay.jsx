import React from 'react';
import goldCoin from '../assets/images/gold-coin.png';

const PetDisplay = ({ character, energy, happiness, currentStage }) => {
  // Determine which stage image to show
  const getCharacterImage = () => {
    if (!character || !character.stages) return character?.image;
    
    const stage = character.stages.find(s => s.stage === currentStage);
    return stage ? stage.image : character.image;
  };

  return (
    <>
      <div className="stats-display">
        <div className="stat-bar">
          <span className="stat-bar-label">Energy</span>
          <div className="bar">
            <div 
              className="bar-fill" 
              style={{ 
                width: `${energy}%`, 
                backgroundColor: '#ff9a56' 
              }} 
            />
          </div>
        </div>
        <div className="stat-bar">
          <span className="stat-bar-label">Happiness</span>
          <div className="bar">
            <div 
              className="bar-fill" 
              style={{ 
                width: `${happiness}%`, 
                backgroundColor: '#10b981' 
              }} 
            />
          </div>
        </div>
      </div>

      <div className="pet-display">
        <div className="pet-sprite">
          <img src={getCharacterImage()} alt={character?.name || 'Pet'} />
        </div>
        <div className="pet-info">
          <h3>{character?.name || 'No Pet'}</h3>
          <p>stage: {currentStage}</p>
        </div>
      </div>
    </>
  );
};

export default PetDisplay;