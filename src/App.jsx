import { useState, useRef } from 'react';
import React from 'react';

import { PhaserGame } from './PhaserGame';
import ArcadeControlPanel from './ArcadeControlPanel';
import { EventBus } from './game/EventBus';
import { startGame, resetGame } from './handlers/ArcadeControlPanel';

/**
 * Main App component that initializes the Phaser game and handles game state.
 * It also manages the control panel for player actions and displays player status.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    // Player can only be moved in the Game Scene
    const [canMovePlayer, setCanMovePlayer] = useState(false);

    // Player state variables
    const [health, setHealth] = useState(200);
    const [moves, setMoves] = useState(450);

    /**
     * Handles scene change events.
     * This function is called when the scene changes in the Phaser game.
     * @param {Scene} scene 
     */
    function currentScene(scene) {
        setCanMovePlayer(scene.scene.key === 'Game');
    };

    /**
     * Handles the player state changes.
     * @param {Player} playerState 
     */
    function handlePlayerStateChange(playerState) {
        setHealth(playerState.health);
        setMoves(playerState.moves);
    };

    /**
     * Handles the direction input from the ArcadeControlPanel.
     * @param {string} direction 
     */
    function handleDirection(direction) {
        if (canMovePlayer) {
            //  Emit the event to move the player in the Phaser scene
            EventBus.emit('move-player', direction);
        }
    };

    /**
     * Starts the game by calling the startGame function.
     * This function is called when the start button is clicked in the ArcadeControlPanel.
     */
    function handleStart() {
        startGame(phaserRef);
    }

    /**
     * Resets the game state and starts a new game.
     * This function is called when the reset button is clicked in the ArcadeControlPanel.
     */
    function handleReset() {
        resetGame(phaserRef);
    }

    /**
     * Displays help information for the game.
     * This function is called when the help button is clicked in the ArcadeControlPanel.
     */
    function handleHelp() {
        alert("Use the arrow keys to move the player. Press Start to begin the game and Reset to restart.");
    }

    return (
        <div id="app">
            <h1>Mud Lava Racer</h1>
            <PhaserGame className="game-window" ref={phaserRef} currentActiveScene={currentScene} updatePlayerState={handlePlayerStateChange} />
            <ArcadeControlPanel
                onStart={handleStart}
                onReset={handleReset}
                onDirection={handleDirection}
                health={health}
                moves={moves}
            />
        </div>
    )
}

export default App;
