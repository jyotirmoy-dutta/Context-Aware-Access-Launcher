export type UserSettings = {
  theme: 'light' | 'dark';
  customRules: string; // JSON string for custom rules
  widgetPosition: { top: number; right: number };
};

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  customRules: '',
  widgetPosition: { top: 20, right: 20 },
};

export function getSettings(): UserSettings {
  try {
    const raw = localStorage.getItem('accessLauncherSettings');
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings) {
  localStorage.setItem('accessLauncherSettings', JSON.stringify(settings));
} 