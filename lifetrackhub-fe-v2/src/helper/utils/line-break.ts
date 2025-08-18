export const lineBreakInsert = (text: string): string => {
  if (!text) return text;

  // Split the text by new lines and join with <br />
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('<br />');
};
