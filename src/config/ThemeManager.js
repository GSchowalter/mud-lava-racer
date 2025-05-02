import { LightPalette, DarkPalette } from './Palette.config.js';

class ThemeManager {
    constructor() {
        // Will eventually allow for dark and light themes
        // For now, we will just use the light theme
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