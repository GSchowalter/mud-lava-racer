import { LightPalette, DarkPalette } from './Palette.js';

class ThemeManager {
    constructor() {
        this.currentTheme = DarkPalette; // Default to light theme
    }

    setTheme(theme) {
        this.currentTheme = theme;
    }

    getTheme() {
        return this.currentTheme;
    }
}

const themeManager = new ThemeManager();
export default themeManager;