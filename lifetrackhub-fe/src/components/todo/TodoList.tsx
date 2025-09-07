import React from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { ITodoResponseDto } from '../../types/todo';
import TodoListItem from './TodoListItem';

type TodoListProps = {
  todos: ITodoResponseDto[];
  onEdit: (todo: ITodoResponseDto) => void;
  archivedTodoById: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onEdit,
  archivedTodoById,
}) => {
  if (!todos || todos.length === 0) {
    return <ErrorMessage message="There is no todo found." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-8">
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          archivedTodoById={archivedTodoById}
        />
      ))}
    </div>
  );
};

export default TodoList;
