import React, { forwardRef, useState } from 'react';
import { ITodoItems, ITodoResponseDto, TodoStatus } from '../../types/todo';
import { RiDeleteBin6Line } from 'react-icons/ri';

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

    const handleAdd = (e: React.FormEvent) => {
      e.preventDefault();
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
        className="bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-800 rounded-lg p-4 md:p-6 lg:p-8 flex flex-col gap-6 border border-gray-300 dark:border-gray-700 overflow-y-auto max-h-[65vh] scrollbar-hide"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
          Update Todo
        </h2>
        <div className="flex flex-col gap-2">
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 py-2 border border-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-2xl focus:outline-none"
            placeholder="Enter todo title"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter todo item"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 dark:hover:from-green-800 dark:hover:to-green-700 transition flex items-center justify-center gap-2"
          >
            Add
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {todoItems.map(item => (
            <li
              key={item.todoItemId}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 gap-2"
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
                className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleDelete(item.todoItemId)}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
                title="Delete"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 mt-4 justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-700 hover:to-purple-600 dark:hover:from-purple-800 dark:hover:to-purple-700 transition flex items-center gap-2 self-end"
            disabled={todoItems.length === 0}
          >
            Update
          </button>
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
