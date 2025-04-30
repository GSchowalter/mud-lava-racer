import { LightPalette, DarkPalette } from './Palette.config.js';

class ThemeManager {
    constructor() {
        this.currentTheme = LightPalette; // Default to light theme
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