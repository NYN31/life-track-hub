import React from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { ITodoResponseDto } from '../../types/todo';
import OnClickButton from '../common/button/OnClickButton';
import { FaRegEdit } from 'react-icons/fa';

type TodoListProps = {
  todos: ITodoResponseDto[];
  onEdit: (todo: ITodoResponseDto) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit }) => {
  if (!todos || todos.length === 0) {
    return <ErrorMessage message="No todos found." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-8">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="common-box flex flex-row justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 mr-4">
              <div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    todo.todoStatus === 'DONE'
                      ? 'bg-green-400'
                      : 'bg-yellow-400'
                  } border-2 border-white shadow`}
                ></div>
              </div>
              <h3 className="line-clamp-2">{todo.title}</h3>
            </div>
            <div className="text-center">
              <div className="flex flex-wrap md:flex-row gap-2">
                <span
                  className={`px-3 py-1 flex items-center rounded-full text-xs font-medium ${
                    todo.todoStatus === 'DONE'
                      ? 'bg-green-300 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {todo.todoStatus}
                </span>
                <span className="info-box">
                  Created:{' '}
                  {todo.createdDate
                    ? new Date(todo.createdDate).toLocaleString()
                    : '-'}
                </span>
                <span className="info-box">
                  Last Modified:{' '}
                  {todo.lastModifiedDate
                    ? new Date(todo.lastModifiedDate).toLocaleString()
                    : '-'}
                </span>
              </div>
            </div>
          </div>
          <div>
            <OnClickButton
              action={() => onEdit(todo)}
              text="Edit"
              icon={<FaRegEdit size={18} />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
