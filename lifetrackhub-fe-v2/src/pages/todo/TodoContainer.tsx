import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoAddForm from '../../components/todo/TodoAddForm';
import TodoList from '../../components/todo/TodoList';
import TodoUpdateForm from '../../components/todo/TodoUpdateForm';
import Pagination from '../../components/common/Pagination';
import {
  useGetTodosByEmailQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} from '../../features/todo/todoApi';
import { getAllLocalStoreValue } from '../../helper/local-storage/get-local-store-values';
import { ITodoItems, ITodoResponseDto, TodoStatus } from '../../types/todo';
import {
  addLocalTodo,
  removeLocalTodo,
  addTitleToLocalTodo,
  resetTodoState,
} from '../../features/todo/todoSlice';
import { RootState } from '../../app/store';
import Spinner from '../../components/common/Spinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import { useOnClickOutside } from '../../helper/hooks/useOnClickOutside';

const PAGE_SIZE = 6;

const TodoContainer: React.FC = () => {
  const dispatch = useDispatch();
  const localTodos = useSelector((state: RootState) => state.todo);
  const { email } = getAllLocalStoreValue();
  const safeEmail = typeof email === 'string' ? email : '';
  const [page, setPage] = useState(0);
  const [editingTodo, setEditingTodo] = useState<ITodoResponseDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const updateModalRef = React.useRef<HTMLFormElement>(null);
  useOnClickOutside(updateModalRef, () => {
    setIsUpdateModalOpen(false);
    setEditingTodo(null);
    dispatch(resetTodoState());
  });

  // API hooks
  const { data, isLoading, isError, error, refetch } = useGetTodosByEmailQuery(
    {
      email: safeEmail,
      page,
      size: PAGE_SIZE,
    },
    { skip: !safeEmail }
  );
  const [addTodo, { isLoading: isLoadingTodoAdd }] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleAddTitleLocal = (title: string) => {
    dispatch(addTitleToLocalTodo(title));
  };
  const handleAddLocal = (text: string) => {
    dispatch(addLocalTodo({ text }));
  };
  const handleDeleteLocal = (id: string) => {
    dispatch(removeLocalTodo(id));
  };

  // Submit local todos to API
  const handleSubmit = async () => {
    if (!safeEmail || localTodos.todos.length === 0) return;
    await addTodo({
      email: safeEmail,
      title: localTodos.title,
      todoStatus: 'IN_PROGRESS',
      todoItems: localTodos.todos.map(item => ({
        todoItemId: item.todoItemId,
        text: item.text,
        completed: false,
      })),
    })
      .unwrap()
      .then(() => {
        dispatch(resetTodoState());
        refetch();
      })
      .catch(err => {
        setErrorMessage(extractErrorMessage(err) || 'Failed to add todo');
      });
  };

  // Update todo (unchanged)
  const handleUpdateTodo = async (data: {
    title: string;
    todoStatus: TodoStatus;
    todoItems: ITodoItems[];
  }) => {
    if (!editingTodo) return;

    await updateTodo({
      ...editingTodo,
      todoStatus: data.todoStatus as TodoStatus,
      title: data.title,
      todoItems: data.todoItems,
    });
    setEditingTodo(null);
    refetch();
  };

  const onEditHandler = (todo: ITodoResponseDto) => {
    setIsUpdateModalOpen(true);
    const newTodoItems = todo.todoItems.map(item => ({
      ...item,
      todoItemId: item.todoItemId || (Date.now() + Math.random()).toString(),
    }));
    const newTodo = {
      ...todo,
      todoItems: newTodoItems,
    };
    setEditingTodo(newTodo);
  };

  if (isLoading) return <Spinner />;

  if (!data) return null;

  // Pagination helpers
  const hasNext = data?.hasNext ?? false;
  const hasPrevious = data?.hasPrevious ?? false;
  const pageNumber = data?.pageNumber ?? page;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="common-box-container">
      <h1>Todo Management</h1>
      <TodoAddForm
        onAddTitleLocal={handleAddTitleLocal}
        onAddLocal={handleAddLocal}
        onSubmit={handleSubmit}
        localTodos={localTodos.todos as ITodoItems[]}
        onDeleteLocal={handleDeleteLocal}
        isLoadingTodoAdd={isLoadingTodoAdd}
      />

      {isError || errorMessage ? (
        <ErrorMessage message={extractErrorMessage(error) || errorMessage} />
      ) : (
        <div>
          <TodoList todos={data.content || []} onEdit={onEditHandler} />
          {data?.content?.length > 0 && (
            <Pagination
              handlePreviousPage={() => setPage(p => Math.max(0, p - 1))}
              handleNextPage={() => setPage(p => p + 1)}
              currentPageNo={pageNumber}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              totalPages={totalPages}
              onPageChange={page => setPage(page)}
            />
          )}
        </div>
      )}
      {/* Modal for update */}
      {editingTodo && isUpdateModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex mt-4 md:mt-24 mx-1 justify-center z-50">
          <div className="relative size-full md:size-9/12 lg:size-6/12">
            <TodoUpdateForm
              ref={updateModalRef}
              editTodo={editingTodo}
              onSubmit={handleUpdateTodo}
              onCancel={() => {
                setEditingTodo(null);
                setIsUpdateModalOpen(false);
                dispatch(resetTodoState());
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoContainer;
