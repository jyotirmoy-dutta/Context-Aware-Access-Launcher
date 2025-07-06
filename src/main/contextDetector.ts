import activeWin from 'active-win';

export async function getActiveContext() {
  const result = await activeWin();
  if (!result) return null;
  return {
    app: result.owner.name,
    title: result.title,
    processId: result.owner.processId,
    path: result.owner.path,
  };
} 