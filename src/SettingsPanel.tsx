import React, { useState } from 'react';
import { getSettings, saveSettings, UserSettings } from './settings';

const SettingsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  const [customRules, setCustomRules] = useState(settings.customRules);

  const handleSave = () => {
    const newSettings = { ...settings, customRules };
    setSettings(newSettings);
    saveSettings(newSettings);
    onClose();
  };

  return (
    <div style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.15)', minWidth: 350 }}>
      <h3>Settings</h3>
      <div style={{ marginBottom: 12 }}>
        <label>Theme: </label>
        <select value={settings.theme} onChange={e => setSettings(s => ({ ...s, theme: e.target.value as 'light' | 'dark' }))}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Widget Position: </label>
        <input type="number" value={settings.widgetPosition.top} onChange={e => setSettings(s => ({ ...s, widgetPosition: { ...s.widgetPosition, top: Number(e.target.value) } }))} style={{ width: 60 }} />
        <span> px from top</span>
        <input type="number" value={settings.widgetPosition.right} onChange={e => setSettings(s => ({ ...s, widgetPosition: { ...s.widgetPosition, right: Number(e.target.value) } }))} style={{ width: 60, marginLeft: 8 }} />
        <span> px from right</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Custom Rules (JSON):</label>
        <textarea value={customRules} onChange={e => setCustomRules(e.target.value)} rows={6} style={{ width: '100%' }} />
      </div>
      <button onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SettingsPanel; 