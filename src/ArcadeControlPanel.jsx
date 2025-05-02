import React from 'react';

/**
 * ArcadeControlPanel component provides a control interface for the game.
 * It includes buttons for starting, resetting, and controlling player movement,
 * as well as displaying the player's health and remaining moves.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onStart - Callback function triggered when the "Start" button is clicked.
 * @param {function} props.onReset - Callback function triggered when the "Reset" button is clicked.
 * @param {function} props.onDirection - Callback function triggered when an arrow key button is clicked.
 * @param {number} props.health - The player's current health.
 * @param {number} props.moves - The player's remaining moves.
 * @returns {JSX.Element} The rendered ArcadeControlPanel component.
 */
const ArcadeControlPanel = ({ onStart, onReset, onDirection, health, moves }) => {
    return (
        <div className="arcade-control-panel">
            {/* Player Status */}
            <div className="player-status">
                <div>Health: {health}</div>
                <div>Moves: {moves}</div>
            </div>

            {/* Top row: Start and Reset buttons */}
            <div className="control-buttons">
                <button className="arcade-button" onClick={onStart}>Start</button>
                <button className="arcade-button" onClick={onReset}>Reset</button>
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