import React, { useState } from 'react';

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
    const [showHelp, setShowHelp] = useState(false);

    /**
     * Toggles the visibility of the help pop-up.
     */
    const onHelp = () => {
        setShowHelp(!showHelp);
    };

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
                <button className="arcade-help-button" onClick={onHelp}>?</button>
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

            {/* Help Pop-Up */}
            {showHelp && (
                <div className="help-modal">
                    <div className="help-content">
                        <h2>How to Play</h2>
                        <p>Use the arrow keys or WASD to move your player across the grid.</p>
                        <p>You have 450 moves to make it from point A (where you start) to point B in the bottom right corner.</p>
                        <p>There are three obstacles:
                            <ul>
                                <li>Lava: Lose 50 health and 10 moves</li>
                                <li>Mud: Lose 10 health and 5 moves</li>
                                <li>Speeder: Lose 5 health but does not cost a move</li>
                            </ul>
                        </p>
                        <p>Click &quot;Start&quot; to begin the game and &quot;Reset&quot; to restart.</p>
                        <div className='close-button-container'> 
                            <button className="close-button" onClick={onHelp}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArcadeControlPanel;