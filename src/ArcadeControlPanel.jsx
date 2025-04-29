import React from 'react';

const ArcadeControlPanel = ({ onStart, onSelect, onDirection, health, moves }) => {
    return (
        <div className="arcade-control-panel">
            {/* Player Status */}
            <div className="player-status">
                <div>Health: {health}</div>
                <div>Moves: {moves}</div>
            </div>

            {/* Top row: Start and Select buttons */}
            <div className="control-buttons">
                <button className="arcade-button" onClick={onStart}>Start</button>
                <button className="arcade-button" onClick={onSelect}>Select</button>
            </div>

            {/* Bottom row: Arrow keys */}
            <div className="arrow-keys">
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