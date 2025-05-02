# Mud Lava Racer

This is a simple web game built using Phaser 3 and React. You play as a knight tasked with dodging lava, mud, and speeding your way
through a dungeon to reach the finish.

## Game Manual

### Get Started

This game is deployed fully deployed on [Vercel](https://mud-lava-racer.vercel.app/). You can play the game there, or you can run it locally.

#### Local Installation
To run the game locally, start by cloning the repository and installing the dependencies:

```bash
git clone https://github.com/GSchowalter/mud-lava-racer.git
cd mud-lava-racer
npm install
```
Then, start the development server:

```bash
npm run dev
```

This will start a local server at `http://localhost:8080`. Navigate to that URL in your browser to play the game.

### Controls
- **Arrow Keys or WASD**: Move the knight around the screen.
- **Start**: Start the game from the main menu. Or navigate back to the main menu from the game over screen.
- **Reset**: Reset health, moves, and go back to the start. Does not change the board.
- **?**: Launch a help screen with instructions on how to play the game.
- **G and L**: Win or lose the game. A secret command! Thanks for reading the manual. Knowledge is power!

### Space effects
- **Bank space**: White space that takes 1 move.
- **Lava**: Red space that takes away 50 health and 10 moves.
- **Mud**: Brown space that takes away 10 health and 5 moves.
- **Speeder**: Green space that costs no moves to move to but takes away 5 health.
- **Finish**: Yellow space. The goal of the game. You win when you reach this space.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

### Versions

**[This application was built starting with the Phaser React Template.](https://github.com/phaserjs/template-react)**

This project runs on the following versions of the libraries:

- [Phaser 3.88.2](https://github.com/phaserjs/phaser)
- [React 19.0.0](https://github.com/facebook/react)
- [Vite 6.3.1](https://github.com/vitejs/vite)

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm install --save-dev` | Install project dev dependencies |
| `npm run lint` | Run ESLint on the source code |
| `npm run lint-fix` | Run ESLint on the source code and attempt to fix any issues |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |
| `npm run dev-nolog` | Launch a development web server without sending anonymous data (see "About log.js" below) |
| `npm run build-nolog` | Create a production build in the `dist` folder without sending anonymous data (see "About log.js" below) |
| `npm run test` | Run the test suite |

## Project Structure

| Path                          | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| `index.html`                  | A basic HTML page to contain the game.                                     |
| `src`                         | Contains the React client source code.                                     |
| `src/main.jsx`                | The main **React** entry point. This bootstraps the React application.      |
| `src/App.jsx`                 | The main React component.                                                  |
| `src/PhaserGame.jsx`          | The React component that initializes the Phaser Game and serves as a bridge between React and Phaser. |
| `src/game/EventBus.js`        | An event bus to communicate between React and Phaser.                |
| `src/game`                    | Contains the game source code.                                             |
| `src/game/main.jsx`           | The main **game** entry point. This contains the game configuration and starts the game. |
| `src/game/scenes/`            | The Phaser Scenes are in this folder.                                      |
| `src/game/dungeon/`           | Game objects and logic.                             |
| `src/handlers/`               | Contains the logic for event handlers.                                 |
| `src/config/`                  | Contains configuration constants used in game logic and scene rendering.                      |
| `test/`                    | Contains the test files.                                                  |
| `public/style.css`            | Some simple CSS rules to help with page layout.                            |
| `public/assets`               | Contains the static assets used by the game.                               |

## Testing

Testing in this project is done using [Vitest](https://vitest.dev/). Vitest is a Vite-native unit test framework. Testing in this environmnet reqires running tests in a virtual browser environment using the jsdom library as well as mocking the phaser object to avoid browser dependent functionality from being run during testing. To run the tests, use the following command:

```bash
npm run test
```

## React Bridge

The `PhaserGame.jsx` component is the bridge between React and Phaser. It initializes the Phaser game and passes events between the two.
The **EventBus.js** file is a simple event bus that allows you to emit and listen for events from both React and Phaser.

## Deploying to Production

Deployment is handled via the vercel app. Vercel is a cloud platform for static sites and serverless functions. Vecel plays nicely with Vite and React, making deployment trivial. To deploy this app to Vercel, you need to create a Vercel account and install the Vercel CLI. Once you have the CLI installed, you can run the following command to deploy your app:

```bash
vercel deploy
```
