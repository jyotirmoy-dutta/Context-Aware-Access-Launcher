import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { rules, ShortcutAction, getAllRules } from './shortcutRules';
import SettingsPanel from './SettingsPanel';
import { getSettings, saveSettings, UserSettings } from './settings';

type Context = {
  app: string;
  title: string;
  processId: number;
  path: string;
};

declare global {
  interface Window {
    accessLauncher: {
      getActiveContext: () => Promise<Context | null>;
    };
  }
}

const openExternal = (url: string) => {
  window.open(url, '_blank');
};

const getSuggestions = (context: Context | null, customRules: string): ShortcutAction[] => {
  if (!context) return [];
  for (const rule of getAllRules(customRules)) {
    if (rule.match(context)) {
      return rule.actions;
    }
  }
  return [];
};

const App = () => {
  const [context, setContext] = useState<Context | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [collapsed, setCollapsed] = useState(() => {
    const c = localStorage.getItem('accessLauncherCollapsed');
    return c === 'true';
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const ctx = await window.accessLauncher.getActiveContext();
      setContext(ctx);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSettings(getSettings());
  }, [showSettings]);

  // Drag logic
  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => {
      if (!dragOffset) return;
      const top = e.clientY - dragOffset.y;
      const right = window.innerWidth - (e.clientX + dragOffset.x);
      setSettings(s => {
        const newSettings = { ...s, widgetPosition: { top, right } };
        saveSettings(newSettings);
        return newSettings;
      });
    };
    const onMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, dragOffset]);

  const suggestions = getSuggestions(context, settings.customRules);
  const themeStyles = settings.theme === 'dark' ? {
    background: '#222', color: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.35)'
  } : {
    background: '#fff', color: '#222', boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCollapse = () => {
    setCollapsed(c => {
      localStorage.setItem('accessLauncherCollapsed', (!c).toString());
      return !c;
    });
  };

  return (
    <div style={{ position: 'fixed', top: settings.widgetPosition.top, right: settings.widgetPosition.right, zIndex: 9999, borderRadius: 12, padding: 0, minWidth: 300, ...themeStyles, userSelect: dragging ? 'none' : 'auto', transition: 'box-shadow 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move', padding: 12, borderBottom: `1px solid ${settings.theme === 'dark' ? '#333' : '#eee'}` }} onMouseDown={handleDragStart}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Access Launcher</h2>
          <button onClick={handleCollapse} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'inherit' }}>{collapsed ? '➕' : '➖'}</button>
        </div>
        <button onClick={e => { e.stopPropagation(); setShowSettings(s => !s); }} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'inherit' }}>⚙️</button>
      </div>
      {!collapsed && (
        <div style={{ padding: 16 }}>
          {showSettings ? (
            <SettingsPanel onClose={() => setShowSettings(false)} />
          ) : context ? (
            <>
              <div><b>App:</b> {context.app}</div>
              <div><b>Title:</b> {context.title}</div>
              <div style={{ marginTop: 12 }}>
                <b>Suggestions:</b>
                <ul>
                  {suggestions.length > 0 ? suggestions.map((action, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 6, border: '1px solid #eee', background: settings.theme === 'dark' ? '#333' : '#f9f9f9', color: 'inherit', cursor: 'pointer' }} onClick={() => openExternal(action.url(context!))}>
                        <span>{action.icon}</span>
                        <span>{action.label}</span>
                      </button>
                    </li>
                  )) : <li>No suggestions for this context.</li>}
                </ul>
              </div>
            </>
          ) : (
            <div>Detecting context...</div>
          )}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />); 