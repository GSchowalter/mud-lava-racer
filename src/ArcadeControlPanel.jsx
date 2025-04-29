import React from 'react';

const ArcadeControlPanel = ({ onStart, onMove, onAddSprite, onDirection }) => {
    return (
        <div className="arcade-control-panel">
            <div className="control-buttons">
                <button className="arcade-button start-button" onClick={onStart}>
                    Start Game
                </button>
                <button className="arcade-button move-button" onClick={onMove}>
                    Move Sprite
                </button>
                <button className="arcade-button add-sprite-button" onClick={onAddSprite}>
                    Add Sprite
                </button>
            </div>
            <div className="arrow-key-controls">
                <button className="arrow-key up" onClick={() => onDirection('up')}>↑</button>
                <div className="arrow-key-row">
                    <button className="arrow-key left" onClick={() => onDirection('left')}>←</button>
                    <button className="arrow-key down" onClick={() => onDirection('down')}>↓</button>
                    <button className="arrow-key right" onClick={() => onDirection('right')}>→</button>
                </div>
            </div>
        </div>
    );
};

export default ArcadeControlPanel;