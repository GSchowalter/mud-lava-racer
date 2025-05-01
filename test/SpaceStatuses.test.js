import { describe, it, expect } from 'vitest';
import { BlankSpace, SpeederSpace, LavaSpace, MudSpace, SpaceStatuses, StartSpace, GoalSpace } from '../src/game/dungeon/SpaceStatuses';

describe('SpaceStatuses and its subclasses', () => {
    it('should create a default SpaceStatuses instance', () => {
        const space = new SpaceStatuses();
        expect(space.getSpaceName()).toBe('Default');
        expect(space.healthHit).toBe(0);
        expect(space.movesHit).toBe(0);
        expect(space.color).toBe(0x000000);
    });

    it('should create a BlankSpace instance', () => {
        const blankSpace = new BlankSpace();
        expect(blankSpace.getSpaceName()).toBe('Blank');
        expect(blankSpace.healthHit).toBe(0);
        expect(blankSpace.movesHit).toBe(-1);
        expect(blankSpace.color).toBe(0xFFFFFF);
    });

    it('should create a SpeederSpace instance', () => {
        const speederSpace = new SpeederSpace();
        expect(speederSpace.getSpaceName()).toBe('Speeder');
        expect(speederSpace.healthHit).toBe(-5);
        expect(speederSpace.movesHit).toBe(0);
        expect(speederSpace.color).toBe(0x008223);
    });

    it('should create a LavaSpace instance', () => {
        const lavaSpace = new LavaSpace();
        expect(lavaSpace.getSpaceName()).toBe('Lava');
        expect(lavaSpace.healthHit).toBe(-50);
        expect(lavaSpace.movesHit).toBe(-10);
        expect(lavaSpace.color).toBe(0xdb2114);
    });

    it('should create a MudSpace instance', () => {
        const mudSpace = new MudSpace();
        expect(mudSpace.getSpaceName()).toBe('Mud');
        expect(mudSpace.healthHit).toBe(-50);
        expect(mudSpace.movesHit).toBe(-10);
        expect(mudSpace.color).toBe(0x452a28);
    });

    it('should create a StartSpace instance', () => {
        const startSpace = new StartSpace();
        expect(startSpace.getSpaceName()).toBe('Start');
        expect(startSpace.healthHit).toBe(0);
        expect(startSpace.movesHit).toBe(0);
        expect(startSpace.color).toBe(0xFFFFFF);
    });

    it('should create a GoalSpace instance', () => {
        const goalSpace = new GoalSpace();
        expect(goalSpace.getSpaceName()).toBe('Goal');
        expect(goalSpace.healthHit).toBe(0);
        expect(goalSpace.movesHit).toBe(0);
        expect(goalSpace.color).toBe(0xD5B60A);
    });
});