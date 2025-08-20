export function extractCleanTextFromMarkdown(markdown: string): string {
  // Step 1: Remove Markdown elements
  let plainText = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\((.*?)\)/g, '$1') // links
    .replace(/(`{1,3})(.*?)\1/g, '$2') // inline and block code
    .replace(/[*_~#>`-]/g, '') // markdown symbols (*, _, ~, etc.)
    .replace(/^\s*\d+\.\s*/gm, '') // numbered lists
    .replace(/^\s*[-*+]\s*/gm, '') // bullet points
    .replace(/^\s*>/gm, '') // blockquotes
    .replace(/^\s*#+\s*/gm, '') // headings
    .replace(/\n+/g, ' ') // newlines to space
    .replace(/\s+/g, ' ') // multiple spaces to one
    .trim();

  // Step 2: Keep only letters, digits, spaces, and .,?! characters
  plainText = plainText.replace(/[^a-zA-Z0-9\s.,?!]/g, '');

  return plainText;
}
