import React, { forwardRef, useState } from 'react';
import { ITodoItems, ITodoResponseDto, TodoStatus } from '../../types/todo';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';
import OnClickAddButton from '../common/button/OnClickAddButton';
import OnSubmitButton from '../common/button/OnSubmitButton';

type TodoUpdateFormProps = {
  editTodo: ITodoResponseDto;
  onSubmit: (data: {
    title: string;
    todoStatus: TodoStatus;
    todoItems: ITodoItems[];
  }) => void;
  onCancel: () => void;
};

const TodoUpdateForm = forwardRef<HTMLFormElement, TodoUpdateFormProps>(
  ({ editTodo, onSubmit, onCancel }, ref) => {
    const [title, setTitle] = useState(editTodo.title);
    const [todoItems, setTodoItems] = useState<ITodoItems[]>(
      editTodo.todoItems
    );
    const [input, setInput] = useState('');

    const handleAdd = () => {
      if (input.trim()) {
        setTodoItems([
          ...todoItems,
          {
            todoItemId: (Date.now() + Math.random()).toString(),
            text: input.trim(),
            completed: false,
          },
        ]);
        setInput('');
      }
    };

    const handleDelete = (id: string) => {
      setTodoItems(todoItems.filter(item => item.todoItemId !== id));
    };

    const handleItemChange = (id: string, text: string) => {
      setTodoItems(
        todoItems.map(item =>
          item.todoItemId === id ? { ...item, text } : item
        )
      );
    };

    const handleCheckboxChange = (id: string) => {
      setTodoItems(
        todoItems.map(item =>
          item.todoItemId === id
            ? { ...item, completed: !item.completed }
            : item
        )
      );
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      let newTodoStatus = 'IN_PROGRESS' as TodoStatus;
      // If all items are completed, set status to DONE
      if (todoItems.every(item => item.completed)) {
        newTodoStatus = 'DONE' as TodoStatus;
      }
      if (!title.trim() || todoItems.length === 0) return;

      onSubmit({ title, todoStatus: newTodoStatus, todoItems });
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="common-box-container gap-6 overflow-y-auto max-h-[65vh] scrollbar-hide"
      >
        <h2 className="text-center">Update Todo</h2>
        <div className="flex flex-col gap-2">
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 px-1 md:px-2 py-2 border border-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-4xl focus:outline-none"
            placeholder="Enter todo title"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <input
            type="text"
            name="todo item"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="form-input-field"
            placeholder="Enter todo item"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />

          <OnClickAddButton handleClick={handleAdd} />
        </div>
        <div className="space-y-2 mt-2">
          {todoItems.map(item => (
            <div
              key={item.todoItemId}
              className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 rounded px-3 py-2 gap-2"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheckboxChange(item.todoItemId)}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <input
                type="text"
                value={item.text}
                onChange={e =>
                  handleItemChange(item.todoItemId, e.target.value)
                }
                className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
              />

              <OnClickTrashIcon
                handleRemover={() => handleDelete(item.todoItemId)}
                absolute={false}
                title="Remove Todo Item"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4 justify-center">
          <OnSubmitButton
            text="Update"
            isSaving={false}
            isDirty={true}
            hasError={todoItems.length === 0 || !title.trim()}
          />
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
);

export default TodoUpdateForm;
