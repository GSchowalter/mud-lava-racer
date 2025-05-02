import { forwardRef, useEffect, useLayoutEffect, useRef, React } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';

/**
 * PhaserGame component integrates a Phaser game instance into a React application.
 * It creates and manages the Phaser game lifecycle and communicates with React via events.
 *
 * @param {Object} props - The component props.
 * @param {function} props.currentActiveScene - Callback function to set the current active Phaser scene.
 * @param {function} props.updatePlayerState - Callback function to update the player's state in React.
 * @param {React.Ref} ref - A React ref to access the Phaser game instance and current scene.
 * @returns {JSX.Element} The rendered PhaserGame component.
 */
export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene, updatePlayerState }, ref) {
    const game = useRef();

    /**
     * Initializes the Phaser game instance inside the DOM using a `useLayoutEffect` hook.
     * Ensures the game is created only once and cleans up on component unmount.
     */
    useLayoutEffect(() => {
        if (game.current === undefined) {
            game.current = StartGame("game-container");

            if (ref !== null) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        };
    }, [ref]);

    /**
     * Sets up event listeners for communication between Phaser and React using the EventBus.
     * - Listens for the `current-scene-ready` event to set the active scene.
     * - Listens for the `player-state-changed` event to update the player's state.
     */
    useEffect(() => {
        EventBus.on('current-scene-ready', (currentScene) => {
            if (currentActiveScene instanceof Function) {
                currentActiveScene(currentScene);
            }
            ref.current.scene = currentScene;
        });

        EventBus.on('player-state-changed', (playerState) => {
            updatePlayerState(playerState);
        });

        return () => {
            EventBus.removeListener('current-scene-ready');
            EventBus.removeListener('player-state-changed');
        };
    }, [currentActiveScene, updatePlayerState, ref]);

    /**
     * Renders the container for the Phaser game.
     */
    return (
        <div id="game-container"></div>
    );
});
