"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const settings_1 = require("./settings");
const SettingsPanel = ({ onClose }) => {
    const [settings, setSettings] = (0, react_1.useState)((0, settings_1.getSettings)());
    const [customRules, setCustomRules] = (0, react_1.useState)(settings.customRules);
    const handleSave = () => {
        const newSettings = Object.assign(Object.assign({}, settings), { customRules });
        setSettings(newSettings);
        (0, settings_1.saveSettings)(newSettings);
        onClose();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.15)', minWidth: 350 }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Settings" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 12 }, children: [(0, jsx_runtime_1.jsx)("label", { children: "Theme: " }), (0, jsx_runtime_1.jsxs)("select", { value: settings.theme, onChange: e => setSettings(s => (Object.assign(Object.assign({}, s), { theme: e.target.value }))), children: [(0, jsx_runtime_1.jsx)("option", { value: "light", children: "Light" }), (0, jsx_runtime_1.jsx)("option", { value: "dark", children: "Dark" })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 12 }, children: [(0, jsx_runtime_1.jsx)("label", { children: "Widget Position: " }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: settings.widgetPosition.top, onChange: e => setSettings(s => (Object.assign(Object.assign({}, s), { widgetPosition: Object.assign(Object.assign({}, s.widgetPosition), { top: Number(e.target.value) }) }))), style: { width: 60 } }), (0, jsx_runtime_1.jsx)("span", { children: " px from top" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: settings.widgetPosition.right, onChange: e => setSettings(s => (Object.assign(Object.assign({}, s), { widgetPosition: Object.assign(Object.assign({}, s.widgetPosition), { right: Number(e.target.value) }) }))), style: { width: 60, marginLeft: 8 } }), (0, jsx_runtime_1.jsx)("span", { children: " px from right" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 12 }, children: [(0, jsx_runtime_1.jsx)("label", { children: "Custom Rules (JSON):" }), (0, jsx_runtime_1.jsx)("textarea", { value: customRules, onChange: e => setCustomRules(e.target.value), rows: 6, style: { width: '100%' } })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSave, style: { marginRight: 8 }, children: "Save" }), (0, jsx_runtime_1.jsx)("button", { onClick: onClose, children: "Cancel" })] }));
};
exports.default = SettingsPanel;
