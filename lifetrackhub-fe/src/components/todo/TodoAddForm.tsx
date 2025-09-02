import React, { useState } from 'react';
import { ITodoItems } from '../../types/todo';
import OnClickAddButton from '../common/button/OnClickAddButton';
import OnSubmitButton from '../common/button/OnSubmitButton';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';

interface TodoAddFormProps {
  onAddTitleLocal: (title: string) => void;
  onAddLocal: (text: string) => void;
  onSubmit: () => void;
  localTodos: ITodoItems[];
  onDeleteLocal: (id: string) => void;
  isLoadingTodoAdd?: boolean;
}

const TodoAddForm: React.FC<TodoAddFormProps> = ({
  onAddTitleLocal,
  onAddLocal,
  onSubmit,
  localTodos,
  onDeleteLocal,
  isLoadingTodoAdd,
}) => {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');

  const handleAddTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTitle(e.target.value);
    const newTitle: string = e.target.value.trim();
    onAddTitleLocal(newTitle);
  };

  const handleAdd = () => {
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
    <div className="common-box">
      <h2 className="text-center">Add Todo Items</h2>
      <div className="">
        <div className="flex-1 flex flex-col overflow-x-auto gap-y-2">
          <input
            type="text"
            name="todo title"
            value={title}
            onChange={e => handleAddTitle(e)}
            className="flex-1 px-1 md:px-2 py-2 border border-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xl md:text-2xl focus:outline-none"
            placeholder="Enter todo title"
          />
          <div className="flex flex-row gap-2">
            <input
              type="text"
              name="todo item"
              value={todo}
              onChange={e => setTodo(e.target.value)}
              className="form-input-field flex-1 p-2 md:p-3 m-1"
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
        </div>
      </div>
      <div className="list-none space-y-2">
        {localTodos.map(todo => (
          <div
            key={todo.todoItemId}
            className="mx-1.5 my-2 flex items-center justify-between bg-gray-200 dark:bg-gray-700 rounded px-3 py-2"
          >
            <span className="text-gray-800 dark:text-gray-100">
              {todo.text}
            </span>

            <OnClickTrashIcon
              handleRemover={() => onDeleteLocal(todo.todoItemId)}
              absolute={false}
              title="Remove Todo Item"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div></div>
        <div onClick={handleSubmit}>
          <OnSubmitButton
            text="Create Todo"
            isSaving={isLoadingTodoAdd || false}
            isDirty={true}
            hasError={localTodos.length === 0 || !title.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoAddForm;
