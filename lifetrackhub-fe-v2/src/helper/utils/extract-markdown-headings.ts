export const extractMarkdownHeadings = (markdown: string) => {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;

  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Collapse multiple hyphens
      .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end

    //id = encodeURIComponent(id);

    headings.push({ level, text, id });
  }

  return headings;
};
