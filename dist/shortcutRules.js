"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
exports.parseCustomRules = parseCustomRules;
exports.getAllRules = getAllRules;
exports.rules = [
    // Example: VS Code + Jira ticket in title
    {
        match: (ctx) => ctx.app.toLowerCase().includes('code') && /[A-Z]+-\d+/.test(ctx.title),
        actions: [
            {
                label: 'Open Jira Ticket',
                url: (ctx) => {
                    const match = ctx.title.match(/([A-Z]+-\d+)/);
                    return match ? `https://yourcompany.atlassian.net/browse/${match[1]}` : '#';
                },
                icon: '📝',
            },
        ],
    },
    // Example: Figma
    {
        match: (ctx) => ctx.app.toLowerCase().includes('figma'),
        actions: [
            {
                label: 'Open Figma Dashboard',
                url: () => 'https://www.figma.com/files/recent',
                icon: '🎨',
            },
        ],
    },
    // Add more rules as needed
];
function parseCustomRules(json) {
    if (!json)
        return [];
    try {
        const arr = JSON.parse(json);
        if (!Array.isArray(arr))
            return [];
        return arr.map((rule) => ({
            match: new Function('context', rule.match),
            actions: rule.actions.map((a) => ({
                label: a.label,
                url: new Function('context', `return (${a.url})(context);`),
                icon: a.icon,
            })),
        }));
    }
    catch (_a) {
        return [];
    }
}
function getAllRules(customRules) {
    return [...parseCustomRules(customRules), ...exports.rules];
}
