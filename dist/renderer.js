"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const shortcutRules_1 = require("./shortcutRules");
const SettingsPanel_1 = __importDefault(require("./SettingsPanel"));
const settings_1 = require("./settings");
const openExternal = (url) => {
    window.open(url, '_blank');
};
const getSuggestions = (context, customRules) => {
    if (!context)
        return [];
    for (const rule of (0, shortcutRules_1.getAllRules)(customRules)) {
        if (rule.match(context)) {
            return rule.actions;
        }
    }
    return [];
};
const App = () => {
    const [context, setContext] = (0, react_1.useState)(null);
    const [showSettings, setShowSettings] = (0, react_1.useState)(false);
    const [settings, setSettings] = (0, react_1.useState)((0, settings_1.getSettings)());
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const [dragOffset, setDragOffset] = (0, react_1.useState)(null);
    const [collapsed, setCollapsed] = (0, react_1.useState)(() => {
        const c = localStorage.getItem('accessLauncherCollapsed');
        return c === 'true';
    });
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const ctx = yield window.accessLauncher.getActiveContext();
            setContext(ctx);
        }), 1500);
        return () => clearInterval(interval);
    }, []);
    (0, react_1.useEffect)(() => {
        setSettings((0, settings_1.getSettings)());
    }, [showSettings]);
    // Drag logic
    (0, react_1.useEffect)(() => {
        if (!dragging)
            return;
        const onMouseMove = (e) => {
            if (!dragOffset)
                return;
            const top = e.clientY - dragOffset.y;
            const right = window.innerWidth - (e.clientX + dragOffset.x);
            setSettings(s => {
                const newSettings = Object.assign(Object.assign({}, s), { widgetPosition: { top, right } });
                (0, settings_1.saveSettings)(newSettings);
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
    const handleDragStart = (e) => {
        setDragging(true);
        const rect = e.target.getBoundingClientRect();
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleCollapse = () => {
        setCollapsed(c => {
            localStorage.setItem('accessLauncherCollapsed', (!c).toString());
            return !c;
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: Object.assign(Object.assign({ position: 'fixed', top: settings.widgetPosition.top, right: settings.widgetPosition.right, zIndex: 9999, borderRadius: 12, padding: 0, minWidth: 300 }, themeStyles), { userSelect: dragging ? 'none' : 'auto', transition: 'box-shadow 0.2s' }), children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move', padding: 12, borderBottom: `1px solid ${settings.theme === 'dark' ? '#333' : '#eee'}` }, onMouseDown: handleDragStart, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { margin: 0, fontSize: 20 }, children: "Access Launcher" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleCollapse, style: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'inherit' }, children: collapsed ? '➕' : '➖' })] }), (0, jsx_runtime_1.jsx)("button", { onClick: e => { e.stopPropagation(); setShowSettings(s => !s); }, style: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'inherit' }, children: "\u2699\uFE0F" })] }), !collapsed && ((0, jsx_runtime_1.jsx)("div", { style: { padding: 16 }, children: showSettings ? ((0, jsx_runtime_1.jsx)(SettingsPanel_1.default, { onClose: () => setShowSettings(false) })) : context ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("b", { children: "App:" }), " ", context.app] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Title:" }), " ", context.title] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12 }, children: [(0, jsx_runtime_1.jsx)("b", { children: "Suggestions:" }), (0, jsx_runtime_1.jsx)("ul", { children: suggestions.length > 0 ? suggestions.map((action, i) => ((0, jsx_runtime_1.jsx)("li", { style: { marginBottom: 8 }, children: (0, jsx_runtime_1.jsxs)("button", { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 6, border: '1px solid #eee', background: settings.theme === 'dark' ? '#333' : '#f9f9f9', color: 'inherit', cursor: 'pointer' }, onClick: () => openExternal(action.url(context)), children: [(0, jsx_runtime_1.jsx)("span", { children: action.icon }), (0, jsx_runtime_1.jsx)("span", { children: action.label })] }) }, i))) : (0, jsx_runtime_1.jsx)("li", { children: "No suggestions for this context." }) })] })] })) : ((0, jsx_runtime_1.jsx)("div", { children: "Detecting context..." })) }))] }));
};
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(App, {}));
