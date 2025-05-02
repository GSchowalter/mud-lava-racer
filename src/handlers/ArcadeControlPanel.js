/**
 * Starts the game by calling the start function on the Phaser scene.
 */
function startGame(phaserRef) {
    const scene = phaserRef.current.scene;

    if (scene) {
        //  Start the game scene
        scene.start();
    }
}

/**
 * Resets the game state and starts a new game.
 * 
 * When reset is called during the Game scene, call retry which will reset player state but not the board.
 * When reset is called during the GameOver or Win scene, call reset which will reset the player state and the board.
 */
function resetGame(phaserRef) {
    const scene = phaserRef.current.scene;

    if (scene && (scene.scene.key === 'Game')) {
        console.log("Resetting game from app.jsx");
        scene.retry();
    } else if (scene && (scene.scene.key === 'GameOver' || scene.scene.key === 'Win')) {
        console.log("Resetting game from app.jsx");
        scene.reset();
    }
}

export { startGame, resetGame };