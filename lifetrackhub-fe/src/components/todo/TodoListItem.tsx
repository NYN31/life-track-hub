import { FaRegEdit } from 'react-icons/fa';
import OnClickButton from '../common/button/OnClickButton';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';
import ConfirmDialog from '../common/ConfirmDialog';
import { useState } from 'react';
import { ITodoResponseDto } from '../../types/todo';

const statusClasses: Record<string, string> = {
  DONE: 'bg-green-300 text-green-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  ARCHIVED: 'bg-gray-600 text-gray-100', // new style for ARCHIVED
};

interface TodoListItemProps {
  todo: ITodoResponseDto;
  onEdit: (todo: ITodoResponseDto) => void;
  archivedTodoById: (id: number) => void;
}
const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onEdit,
  archivedTodoById,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="common-box flex flex-row justify-between items-center">
      <div>
        <div className="flex items-center gap-3 mb-4 mr-4">
          <div>
            <div
              className={`w-3 h-3 rounded-full ${
                statusClasses[todo.todoStatus] || 'bg-gray-100 text-gray-500'
              } border-2 border-gray-300 dark:border-white shadow`}
            ></div>
          </div>
          <h3 className="line-clamp-2">{todo.title}</h3>
        </div>
        <div className="text-center">
          <div className="flex flex-wrap md:flex-row gap-2">
            <span
              className={`px-3 py-1 flex items-center rounded-full text-xs font-medium border border-gray-300 ${
                statusClasses[todo.todoStatus] || 'bg-gray-100 text-gray-500'
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
      <div className="flex flex-col gap-2">
        {todo.todoStatus === 'IN_PROGRESS' && (
          <OnClickTrashIcon
            handleRemover={() => setIsOpen(true)}
            absolute={false}
            title="Todo Archived"
          />
        )}
        {todo.todoStatus !== 'ARCHIVED' && (
          <OnClickButton
            action={() => onEdit(todo)}
            icon={<FaRegEdit size={18} color="teal" />}
            hasStyle={false}
          />
        )}
      </div>

      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        proceedAction={() => archivedTodoById(todo.id)}
        actionName="Todo Archived"
      />
    </div>
  );
};

export default TodoListItem;
