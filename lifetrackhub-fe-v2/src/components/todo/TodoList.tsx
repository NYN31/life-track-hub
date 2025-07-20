import React from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { ITodoResponseDto } from '../../types/todo';

type TodoListProps = {
  todos: ITodoResponseDto[];
  onEdit: (todo: ITodoResponseDto) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit }) => {
  if (!todos || todos.length === 0) {
    return <ErrorMessage message="No todos found." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="bg-gray-50 dark:bg-gray-800 shadow-sm rounded-lg p-2 md:p3 lg:p-4 border border-purple-100 dark:border-gray-700 hover:shadow-md transition duration-200 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${
                todo.todoStatus === 'DONE' ? 'bg-green-400' : 'bg-yellow-400'
              } border-2 border-white shadow`}
            ></div>
            <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors truncate">
              {todo.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                todo.todoStatus === 'DONE'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {todo.todoStatus}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              Created:{' '}
              {todo.createdDate
                ? new Date(todo.createdDate).toLocaleString()
                : '-'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              Last Modified:{' '}
              {todo.lastModifiedDate
                ? new Date(todo.lastModifiedDate).toLocaleString()
                : '-'}
            </span>
          </div>
          <div className="flex justify-end mt-auto">
            <button
              onClick={() => onEdit(todo)}
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:purple-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
