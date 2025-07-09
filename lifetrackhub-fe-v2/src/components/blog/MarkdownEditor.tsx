// import React from 'react';

// const MarkdownEditor:  = () => {
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const insertAtCursor = (prefix: string, suffix = '') => {
//     const textarea = textareaRef.current;
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selected = markdown.substring(start, end);
//     const newValue =
//       markdown.substring(0, start) +
//       prefix +
//       selected +
//       suffix +
//       markdown.substring(end);
//     setMarkdown(newValue);

//     // move cursor
//     setTimeout(() => {
//       textarea.focus();
//       textarea.selectionStart = start + prefix.length;
//       textarea.selectionEnd = end + prefix.length;
//     }, 0);
//   };

//   const renderMarkdown = (text: string) => {
//     // Basic formatting replacements
//     let html = text
//       .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
//       .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
//       .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
//       .replace(/^### (.*$)/gim, '<h3>$1</h3>')
//       .replace(/^## (.*$)/gim, '<h2>$1</h2>')
//       .replace(/^# (.*$)/gim, '<h1>$1</h1>')
//       .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
//       .replace(/\*(.*?)\*/gim, '<em>$1</em>')
//       .replace(/__(.*?)__/gim, '<u>$1</u>')
//       .replace(
//         /!\[(.*?)\]\((.*?)\)/gim,
//         "<img alt='$1' src='$2' class='max-w-full' />"
//       )
//       .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>")
//       .replace(/^\s*\n\*/gm, '<ul>\n*')
//       .replace(/^(\*.+)\s*/gm, '<li>$1</li>')
//       .replace(/<\/li>\s*<li>/gim, '</li>\n<li>')
//       .replace(/\n\*([^<])/gm, '\n<li>$1')
//       .replace(/<\/li>\n<li>/g, '</li>\n<li>')
//       .replace(/<\/li>\n*$/gm, '</li>\n</ul>')
//       .replace(/^\d+\.\s+(.*)/gm, '<ol><li>$1</li></ol>')
//       .replace(/\n/g, '<br>');

//     return { __html: html };
//   };

//   return <div>MarkdownEditor</div>;
// };

// export default MarkdownEditor;
