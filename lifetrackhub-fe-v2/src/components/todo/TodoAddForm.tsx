import React, { useState } from 'react';
import { ITodoItems } from '../../types/todo';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface TodoAddFormProps {
  onAddTitleLocal: (title: string) => void;
  onAddLocal: (text: string) => void;
  onSubmit: () => void;
  localTodos: ITodoItems[];
  onDeleteLocal: (id: string) => void;
}

const TodoAddForm: React.FC<TodoAddFormProps> = ({
  onAddTitleLocal,
  onAddLocal,
  onSubmit,
  localTodos,
  onDeleteLocal,
}) => {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');

  const handleAddTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTitle(e.target.value);
    const newTitle: string = e.target.value.trim();
    onAddTitleLocal(newTitle);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      onAddLocal(todo.trim());
      setTodo('');
    }
  };

  const handleSubmit = () => {
    onSubmit();
    setTitle('');
    setTodo('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 md:p-6 lg:p-8 mt-8 flex flex-col gap-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
        Add Todo Items
      </h2>
      <form onSubmit={handleAdd} className="flex gap-2">
        <div className="flex-1 flex flex-col gap-y-2">
          <input
            type="text"
            value={title}
            onChange={e => handleAddTitle(e)}
            className="flex-1 py-2 border border-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-2xl focus:outline-none"
            placeholder="Enter todo title"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={todo}
              onChange={e => setTodo(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter todo item"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 dark:hover:from-green-800 dark:hover:to-green-700 transition flex items-center justify-center gap-2"
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <ul className="space-y-2">
        {localTodos.map(todo => (
          <li
            key={todo.todoItemId}
            className="flex items-center justify-between bg-gray-200 dark:bg-gray-900 rounded px-3 py-2"
          >
            <span className="text-gray-800 dark:text-gray-100">
              {todo.text}
            </span>
            <button
              onClick={() => onDeleteLocal(todo.todoItemId)}
              className="ml-2 text-red-500 hover:text-red-700 font-bold"
              title="Delete"
            >
              <RiDeleteBin6Line size={20} />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        disabled={localTodos.length === 0 || !title.trim()}
        className={`px-8 py-3 rounded-xl w-full font-bold text-lg shadow-lg tracking-wide flex items-center justify-center gap-2 transition
          ${
            localTodos.length === 0 || !title.trim()
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white hover:from-purple-700 hover:to-purple-600 dark:hover:from-purple-800 dark:hover:to-purple-700'
          }`}
      >
        Create Todo
      </button>
    </div>
  );
};

export default TodoAddForm;
