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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {todo.title}
            </h3>
            <ul className="space-y-2 pl-2 list-disc">
              {todo.todoItems.slice(0, 3).map(todoItem => (
                <li
                  key={todoItem.todoItemId}
                  className={`flex items-center justify-between rounded`}
                >
                  <span className="text-gray-800 dark:text-gray-100 truncate">
                    {todoItem.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => onEdit(todo)}
            className="bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-700 hover:to-purple-600 dark:hover:from-purple-800 dark:hover:to-purple-700 transition flex items-center gap-2 self-end"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
