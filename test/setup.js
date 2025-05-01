import '@testing-library/jest-dom'; // Add custom matchers for DOM testing
import { vi } from 'vitest';

console.log('Setting up test environment...');

// Mock global window and document if needed
global.window = {
    innerWidth: 1024,
    innerHeight: 768,
    ontouchstart: null, // Mock ontouchstart property
    ontouchend: null,
};
global.document = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
};

vi.mock('phaser', () => {
    const EventEmitter = class {
        constructor() {
            this.on = vi.fn();
            this.emit = vi.fn();
        }
    };

    const Scene = class {
        constructor() {
            this.add = { sprite: vi.fn(), text: vi.fn() };
            this.cameras = { main: { setBackgroundColor: vi.fn() } };
            this.input = { keyboard: { addKeys: vi.fn() } };
        }
    };

    return {
        Scene,
        Events: { EventEmitter },
        default: { Scene, Events: { EventEmitter } }, // Add default export
    };
});