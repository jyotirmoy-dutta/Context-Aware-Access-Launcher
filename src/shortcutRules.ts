export type ShortcutAction = {
  label: string;
  url: (context: { app: string; title: string; processId: number; path: string }) => string;
  icon?: string;
};

export type ShortcutRule = {
  match: (context: { app: string; title: string; processId: number; path: string }) => boolean;
  actions: ShortcutAction[];
};

export const rules: ShortcutRule[] = [
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

export function parseCustomRules(json: string): ShortcutRule[] {
  if (!json) return [];
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return [];
    return arr.map((rule) => ({
      match: new Function('context', rule.match) as ShortcutRule['match'],
      actions: rule.actions.map((a: any) => ({
        label: a.label,
        url: new Function('context', `return (${a.url})(context);`) as ShortcutAction['url'],
        icon: a.icon,
      })),
    }));
  } catch {
    return [];
  }
}

export function getAllRules(customRules: string): ShortcutRule[] {
  return [...parseCustomRules(customRules), ...rules];
} 