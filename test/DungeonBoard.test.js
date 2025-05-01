import { describe, it, expect, beforeEach } from "vitest";
import { DungeonBoard } from "../src/game/dungeon/DungeonBoard.js";
import { BlankSpace, LavaSpace, MudSpace, SpeederSpace, GoalSpace, StartSpace } from "../src/game/dungeon/SpaceStatuses.js";

describe("DungeonBoard", () => {
    let dungeonBoard;

    beforeEach(() => {
        dungeonBoard = new DungeonBoard();
    });

    it("should initialize with the correct number of rows and columns", () => {
        expect(dungeonBoard.boardRows).toBeGreaterThan(0);
        expect(dungeonBoard.boardCols).toBeGreaterThan(0);
        expect(dungeonBoard.getSpaces().length).toBe(dungeonBoard.boardRows);
        expect(dungeonBoard.getSpaces()[0].length).toBe(dungeonBoard.boardCols);
    });

    it("should place a GoalSpace at the bottom-right corner", () => {
        const goalSpace = dungeonBoard.getSpace(dungeonBoard.boardRows - 1, dungeonBoard.boardCols - 1);
        expect(goalSpace).toBeInstanceOf(GoalSpace);
    });

    it("should place a StartSpace at the top-left corner", () => {
        const startSpace = dungeonBoard.getSpace(0, 0);
        expect(startSpace).toBeInstanceOf(StartSpace);
    });

    it("should generate a board with valid spaces", () => {
        for (const { space } of dungeonBoard) {
            expect(
                space instanceof BlankSpace ||
                space instanceof LavaSpace ||
                space instanceof MudSpace ||
                space instanceof SpeederSpace ||
                space instanceof GoalSpace ||
                space instanceof StartSpace
            ).toBe(true);
        }
    });

    it("should reset the board to its initial state", () => {
        dungeonBoard.reset();
        const goalSpace = dungeonBoard.getSpace(dungeonBoard.boardRows - 1, dungeonBoard.boardCols - 1);
        const startSpace = dungeonBoard.getSpace(0, 0);

        expect(goalSpace).toBeInstanceOf(GoalSpace);
        expect(startSpace).toBeInstanceOf(StartSpace);
    });

    it("should allow retrieving a specific space by coordinates", () => {
        const space = dungeonBoard.getSpace(1, 1);
        expect(space).toBeDefined();
    });

    it("should iterate over all spaces with their positions", () => {
        let count = 0;
        for (const { position, space } of dungeonBoard) {
            expect(position).toHaveProperty("x");
            expect(position).toHaveProperty("y");
            expect(space).toBeDefined();
            count++;
        }
        expect(count).toBe(dungeonBoard.boardRows * dungeonBoard.boardCols);
    });

    it("should generate a truly random board when generateTrueRandomBoard is called", () => {
        dungeonBoard.generateTrueRandomBoard();
        let hasNonBlankSpace = false;

        for (const { space } of dungeonBoard) {
            if (!(space instanceof BlankSpace)) {
                hasNonBlankSpace = true;
                break;
            }
        }

        expect(hasNonBlankSpace).toBe(true);
    });
});