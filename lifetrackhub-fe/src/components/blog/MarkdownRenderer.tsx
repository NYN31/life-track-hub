// src/components/MarkdownRenderer.tsx
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  content: string;
}

// Slugify function → makes IDs like "hello-world"
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, '-');

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Custom renderer for marked
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const slug = slugify(text);
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  };

  // Parse markdown with custom renderer
  const rawHtml: string = marked.parse(content, {
    breaks: true,
    async: false,
    renderer,
  }) as string;

  // Sanitize HTML
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div
      className="blog-content prose max-w-full dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};

export default MarkdownRenderer;
