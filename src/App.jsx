import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './PhaserGame';
import { EventBus } from './game/EventBus';
import ArcadeControlPanel from './ArcadeControlPanel';

function App ()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    // Player can only be moved in the Game Scene
    const [canMovePlayer, setCanMovePlayer] = useState(false);

    const [health, setHealth] = useState(200);
    const [moves, setMoves] = useState(4500);
    
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const startGame = () => {
        const scene = phaserRef.current.scene;

        if (scene && (scene.scene.key === 'MainMenu' || scene.scene.key === 'GameOver'))
        {
            //  Start the game scene
            scene.changeScene();
        }
    }

    const changeScene = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }

    const moveSprite = () => {

        const scene = phaserRef.current.scene;

        if (scene && scene.scene.key === 'MainMenu')
        {
            // Get the update logo position
            scene.moveLogo(({ x, y }) => {

                setSpritePosition({ x, y });

            });
        }
    }

    const addSprite = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        setCanMovePlayer(scene.scene.key === 'Game');
    };

    // Event emitted from the PhaserGame when player state changes
    const handlePlayerStateChanged = (playerState) => {
        setHealth(playerState.health);
        setMoves(playerState.moves);
    };

    const handleDirection = (direction) => {
        console.log(`Move ${direction}`);
        // Add logic to move the sprite in the specified direction
        if (canMovePlayer) {
            //  Emit the event to move the player in the Phaser scene
            EventBus.emit('move-player', direction);
        }
    };

    const handleStart = () => {
        startGame();
    }   

    const handleSelect = () => { 
        console.log('Select');
        // Add logic to select an item or perform an action
    }

    return (
        <div id="app">
            <PhaserGame className="game-window" ref={phaserRef} currentActiveScene={currentScene} updatePlayerState={handlePlayerStateChanged} />
            {/* <div>
                <div>
                    <button className="button" onClick={startGame}>Start Game</button>
                </div>
                <div>
                    <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
                </div>
                <div className="spritePosition">Sprite Position:
                    <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div>
            </div> */}

            <ArcadeControlPanel
                onStart={handleStart}
                onSelect={handleSelect}
                onDirection={handleDirection}
                health={health}
                moves={moves}
            />
        </div>
    )
}

export default App;
