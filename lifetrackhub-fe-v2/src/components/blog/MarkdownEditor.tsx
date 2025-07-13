import React, { useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { BsMarkdownFill } from 'react-icons/bs';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  customItemsForMarkdown: Array<{
    title: string;
    icon: React.ReactNode;
    prefix: string;
    suffix?: string;
  }>;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  error,
  customItemsForMarkdown,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPreviewEnable, setPreviewEnable] = useState(false);

  const togglePreview = () => {
    setPreviewEnable(prev => !prev);
  };

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const scrollTop = textarea.scrollTop;
    const scrollLeft = textarea.scrollLeft;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const newText =
      value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(newText);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = start + before.length + selected.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
      textarea.scrollTop = scrollTop;
      textarea.scrollLeft = scrollLeft;
    });
  };

  return (
    <div>
      <div className="flex items-start justify-between bg-purple-50 dark:bg-gray-900 border border-purple-200 dark:border-purple-700 rounded-t-lg">
        <div className="flex flex-wrap gap-2 m-1">
          {customItemsForMarkdown.map(item => (
            <button
              key={item.title}
              type="button"
              title={item.title}
              onClick={() => insertAtCursor(item.prefix, item.suffix)}
              className="p-2 rounded dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-gray-700 transition border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div
          className="flex flex-row gap-2 m-1 cursor-pointer"
          onClick={togglePreview}
        >
          <span className="p-2 dark:text-gray-200 rounded hover:bg-purple-200 dark:hover:bg-gray-700 transition border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400">
            {isPreviewEnable ? (
              <BsMarkdownFill size="20" />
            ) : (
              <FaEye size="20" />
            )}
          </span>
        </div>
      </div>
      {isPreviewEnable ? (
        <div className="w-full min-h-[350px] p-4 border border-purple-200 dark:border-gray-700 rounded-b-lg font-mono bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none resize-y shadow">
          <MarkdownPreview
            source={value}
            className="dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full min-h-[400px] max-h-[600px] p-4 border border-purple-200 dark:border-gray-700 rounded-b-lg font-mono bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none shadow dark:bg-gray-900 dark:text-gray-100"
          placeholder="Write your markdown here..."
        />
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default MarkdownEditor;
