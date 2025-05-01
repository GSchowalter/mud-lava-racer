import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Player } from '../src/game/dungeon/Player.js';
import { EventBus } from '../src/game/EventBus.js';

// Mock EventBus
vi.mock('../src/game/dungeon/EventBus.js', () => ({
    EventBus: {
        emit: vi.fn(),
    },
}));

// Mock Grid Constants
vi.mock('../src/config/Grid.config.js', () => ({
    GridConstants: {
        gridDimension: 500,
        gridCellDimension: 10,
    },
}));

describe('Player Class', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    it('should initialize with default values', () => {
        expect(player.getPosition()).toEqual([0, 0]);
        expect(player.getHealth()).toBe(200);
        expect(player.getMoves()).toBe(4500);
    });

    it('should set and get position correctly', () => {
        player.setPosition(5, 10);
        expect(player.getPosition()).toEqual([5, 10]);
    });

    it('should update status correctly', () => {
        const space = { healthHit: -20, movesHit: -50 };
        player.updateStatus(space);
        expect(player.getHealth()).toBe(180);
        expect(player.getMoves()).toBe(4450);
        expect(EventBus.emit).toHaveBeenCalledWith('player-state-changed', player);
    });
});