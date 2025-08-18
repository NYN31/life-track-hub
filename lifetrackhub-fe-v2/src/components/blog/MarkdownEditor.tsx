import React, { useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { BsMarkdownFill } from 'react-icons/bs';
import MarkdownRenderer from './MarkdownRenderer';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
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
      <div className="flex items-start justify-between form-input-field">
        <div className="flex flex-wrap gap-2 m-1">
          {customItemsForMarkdown.map(item => (
            <button
              key={item.title}
              type="button"
              title={item.title}
              onClick={() => insertAtCursor(item.prefix, item.suffix)}
              className="btn-icon"
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div
          className="flex flex-row gap-2 m-1 cursor-pointer"
          onClick={togglePreview}
        >
          <span className="btn-icon">
            {isPreviewEnable ? (
              <BsMarkdownFill size="20" />
            ) : (
              <FaEye size="20" />
            )}
          </span>
        </div>
      </div>
      {isPreviewEnable ? (
        <div className="w-full min-h-[350px] form-input-field overflow-auto">
          <MarkdownRenderer content={value} />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="form-input-field w-full min-h-[400px] max-h-[600px] scrollbar-hide"
          placeholder="Write your markdown here..."
        />
      )}
    </div>
  );
};

export default MarkdownEditor;
