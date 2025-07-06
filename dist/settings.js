"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = getSettings;
exports.saveSettings = saveSettings;
const DEFAULT_SETTINGS = {
    theme: 'light',
    customRules: '',
    widgetPosition: { top: 20, right: 20 },
};
function getSettings() {
    try {
        const raw = localStorage.getItem('accessLauncherSettings');
        if (!raw)
            return DEFAULT_SETTINGS;
        return Object.assign(Object.assign({}, DEFAULT_SETTINGS), JSON.parse(raw));
    }
    catch (_a) {
        return DEFAULT_SETTINGS;
    }
}
function saveSettings(settings) {
    localStorage.setItem('accessLauncherSettings', JSON.stringify(settings));
}
