# Access Launcher

**Access Launcher** is a robust, cross-platform, context-aware floating widget for your desktop. It detects the active application and window, then suggests relevant shortcuts (e.g., open Jira tickets from VS Code, Figma dashboard from Figma, and more). Highly customizable, privacy-respecting, and built for productivity.

---

## Features

- 🪟 **Floating, Always-on-Top Widget**  
  Draggable, resizable, and collapsible widget that stays on top of your workspace.

- 🧠 **Context-Aware Suggestions**  
  Detects your active app and window title, and suggests relevant shortcuts (e.g., open Jira ticket, Figma dashboard, Google search, etc.).

- ⚙️ **User Customization**  
  - Add/edit your own context rules and shortcuts via a JSON editor.
  - Change theme (light/dark).
  - Set widget position and collapsed state.

- 🔒 **Privacy-First**  
  - No telemetry, no data leaves your machine.
  - All settings and rules are stored locally.

- 🚀 **Cross-Platform**  
  - Windows, macOS, and Linux support.

- 🛠️ **Modern Tech Stack**  
  - Electron, React, TypeScript, Webpack.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
git clone https://github.com/yourusername/access-launcher.git
cd access-launcher
npm install
```

### Development Mode (Hot Reload)

```sh
npm run dev
```
- This will open the Electron window with hot-reloading for UI changes.
- **Do not use your web browser for testing.** Only use the Electron window.

### Production Build

```sh
npm run build
npm start
```
- This will build the app and launch it in production mode.

---

## Usage

- **Drag** the widget by its header to reposition it.
- **Collapse/Expand** with the ➖/➕ button.
- **Open Settings** (⚙️) to:
  - Change theme (light/dark)
  - Set widget position
  - Add/edit custom rules (JSON)
- **Context-aware suggestions** will appear based on your active app and window.

---

## Custom Rules

You can add your own rules in the Settings panel using JSON.  
**Example:**

```json
[
  {
    "match": "return context.app.toLowerCase().includes('chrome') && context.title.includes('Google');",
    "actions": [
      {
        "label": "Open Google Search",
        "url": "ctx => 'https://www.google.com/'",
        "icon": "🔎"
      }
    ]
  }
]
```

- `match`: JavaScript function body as a string, receives `context` (app, title, processId, path).
- `actions`: Array of shortcut actions (`label`, `url` as a function string, optional `icon`).

---

## Architecture

- **Electron Main Process:** Handles window creation, context detection, and IPC.
- **Preload Script:** Securely exposes APIs to the renderer via `contextBridge`.
- **Renderer (React):** UI, settings, rules engine, and widget logic.
- **Active Window Detection:** Uses [`active-win`](https://github.com/sindresorhus/active-win) for cross-platform active window info.

---

## Security & Privacy

- No telemetry or external data collection.
- All data is stored locally.
- Uses Electron's `contextIsolation` and `preload.js` for secure API exposure.

---

## Troubleshooting

- **No Electron window opens:**  
  - Make sure you run `npm run dev` or `npm start` and wait for the Electron window (not your browser).
  - If you see `Cannot find module './main/contextDetector'`, ensure you have run `npx tsc` to compile TypeScript.

- **Context detection not working:**  
  - Some OSes may require additional permissions for window detection.
  - Try running Electron as administrator.

- **Custom rules not working:**  
  - Check your JSON syntax and function strings.

---

## Contributing

Contributions are welcome!  
Please open issues or pull requests for features, bug fixes, or suggestions.

---

## Credits

- [Electron](https://electronjs.org/)
- [React](https://react.dev/)
- [active-win](https://github.com/sindresorhus/active-win)
- [TypeScript](https://www.typescriptlang.org/)

---

## Contact

Created by [eskgalio](mailto:jyotirmoy427@gmail.com)

--- 