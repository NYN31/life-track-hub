import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoAddForm from '../../components/todo/TodoAddForm';
import TodoList from '../../components/todo/TodoList';
import TodoUpdateForm from '../../components/todo/TodoUpdateForm';
import Pagination from '../../components/common/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import useQuery from '../../helper/hooks/useQuery';
import { getDateToString, getStrToDate } from '../../helper/utils/get-date';
import { getValidParams } from '../../helper/utils/get-valid-params';
import CommonSearchBox from '../../components/common/CommonSearchBox';
import OnClickFilterIcon from '../../components/common/button/OnClickFilterIcon';
import { OptionType } from '../../types/common';
import {
  useAddTodoMutation,
  useLazyGetTodosWithFilterCriteriaQuery,
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
import ModalPortal from '../../ModalPortal';
import { TODO_PATH } from '../../constants/title-and-paths';
import { ROLE } from '../../types/user';
import { useToast } from '../../context/toast-context';

const MAX_TODO_ITEMS_IN_A_PAGE = 10;

const statusOptionsForAdmin: OptionType[] = [
  { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
  { value: 'DONE', label: 'DONE' },
];

const statusOptionsForSuperAdmin: OptionType[] = [
  { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
  { value: 'DONE', label: 'DONE' },
  { value: 'ARCHIVED', label: 'ARCHIVED' },
];

const TodoContainer: React.FC = () => {
  const addToast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const localTodos = useSelector((state: RootState) => state.todo);
  const { email } = getAllLocalStoreValue();
  const safeEmail = typeof email === 'string' ? email : '';
  const isSuperAdmin = localStorage.getItem('role') === ROLE.SUPER_ADMIN;

  const queryPageNo = useQuery().get('page') || '0';
  const queryTitle = useQuery().get('title') || '';
  const queryStatus = useQuery().get('status') || '';
  const queryStartDate = getStrToDate(useQuery().get('start') || null);
  const queryEndDate = getStrToDate(useQuery().get('end') || null);

  const [results, setResults] = useState<ITodoResponseDto[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(-1);

  const [title, setTitle] = useState(queryTitle);
  const [status, setStatus] = useState<OptionType | null>(
    queryStatus ? { value: queryStatus, label: queryStatus } : null
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    queryStartDate,
    queryEndDate,
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [editingTodo, setEditingTodo] = useState<ITodoResponseDto | null>(null);
  //const [errorMessage, setErrorMessage] = useState<string>('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const updateModalRef = React.useRef<HTMLFormElement>(null);
  useOnClickOutside(updateModalRef, () => {
    setIsUpdateModalOpen(false);
    setEditingTodo(null);
    dispatch(resetTodoState());
  });

  const [
    triggerGetTodosWithFilterCriteria,
    { isLoading: isTodosLoading, isError: isTodosError, error: todosError },
  ] = useLazyGetTodosWithFilterCriteriaQuery();
  const [addTodo, { isLoading: isTodoAddLoading }] = useAddTodoMutation();
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
        handleSearch(Number(queryPageNo), queryTitle, queryStatus, [
          queryStartDate,
          queryEndDate,
        ]);
        addToast('Todo add successful.', 'success');
      })
      .catch((err: any) => addToast(err.data.message, 'error'));
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
    })
      .unwrap()
      .then(() => {
        setEditingTodo(null);
        handleSearch(Number(queryPageNo), queryTitle, queryStatus, [
          queryStartDate,
          queryEndDate,
        ]);
        addToast('Todo update has been successful.', 'success');
      })
      .catch((err: any) => addToast(err.data.message, 'error'));
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

  const updateAndPushUrl = (
    page: number,
    title: string,
    status: string,
    dateRange: [Date | null, Date | null]
  ) => {
    const [startDate, endDate] = dateRange;
    const params = new URLSearchParams({
      page: String(page),
      title,
      status,
      start: getDateToString(startDate),
      end: getDateToString(endDate),
    });
    navigate(`${TODO_PATH}${getValidParams(params.toString())}`);
  };

  const handleNextPage = () => {
    const nextPageNo = Math.max(0, Number(queryPageNo) + 1);
    updateAndPushUrl(nextPageNo, queryTitle, queryStatus, [
      queryStartDate,
      queryEndDate,
    ]);
  };

  const handlePreviousPage = () => {
    const prevPageNo = Number(queryPageNo) - 1;
    updateAndPushUrl(prevPageNo, queryTitle, queryStatus, [
      queryStartDate,
      queryEndDate,
    ]);
  };

  const handleTodosSearch = () => {
    updateAndPushUrl(0, title, status?.value || '', dateRange);
  };

  const handleSearch = async (
    pageId: number,
    title: string,
    status: string,
    dateRange: [Date | null, Date | null]
  ) => {
    await triggerGetTodosWithFilterCriteria({
      page: pageId,
      size: MAX_TODO_ITEMS_IN_A_PAGE,
      title: title || null,
      status: status || null,
      start: getDateToString(dateRange[0]) || null,
      end: getDateToString(dateRange[1]) || null,
    })
      .unwrap()
      .then(response => {
        const { hasNext, hasPrevious, totalPages, pageNumber, content } =
          response;
        setHasNext(hasNext);
        setHasPrevious(hasPrevious);
        setTotalPages(totalPages);
        setPageNumber(pageNumber);
        setResults(content);
      })
      .catch((err: any) => {
        addToast(err.data.message, 'error');
        setResults([]);
      });
  };

  const handleReset = () => {
    const pageNo = 0;
    const title = '';
    const status = '';
    const startDate = null;
    const endDate = null;
    updateAndPushUrl(pageNo, title, status, [startDate, endDate]);

    if (queryTitle || queryStatus || queryStartDate || queryEndDate) {
      setTitle(title);
      setStatus({ value: '', label: '' });
      setDateRange([startDate, endDate]);
    }
    setResults([]);
  };

  useEffect(() => {
    setTitle(queryTitle);
    setStatus(queryStatus ? { value: queryStatus, label: queryStatus } : null);
    setDateRange([queryStartDate, queryEndDate]);

    handleSearch(Number(queryPageNo), queryTitle, queryStatus, [
      queryStartDate,
      queryEndDate,
    ]);
  }, [location.search]);

  if (isTodosLoading) return <Spinner />;

  return (
    <div className="common-box-container">
      <h1>Todo Management</h1>
      <TodoAddForm
        onAddTitleLocal={handleAddTitleLocal}
        onAddLocal={handleAddLocal}
        onSubmit={handleSubmit}
        localTodos={localTodos.todos as ITodoItems[]}
        onDeleteLocal={handleDeleteLocal}
        isLoadingTodoAdd={isTodoAddLoading}
      />

      <OnClickFilterIcon
        showFilter={showFilters}
        showFilterHandler={() => setShowFilters(v => !v)}
      />

      {showFilters && (
        <CommonSearchBox
          textFields={[
            {
              name: 'Title',
              value: title,
              setValue: setTitle,
              isTrim: true,
              isMandatory: false,
            },
          ]}
          selectDropdowns={[
            {
              name: 'Status',
              option: status,
              options: isSuperAdmin
                ? statusOptionsForSuperAdmin
                : statusOptionsForAdmin,
              setOption: setStatus,
              isMandatory: false,
            },
          ]}
          dateFields={[
            {
              name: 'Date Range',
              date: dateRange,
              setDateRange: setDateRange,
              isMandatory: false,
            },
          ]}
          handleSearch={handleTodosSearch}
          handleReset={handleReset}
        />
      )}

      {isTodosError ? (
        <ErrorMessage message={extractErrorMessage(todosError) || ''} />
      ) : (
        <>
          <TodoList todos={results || []} onEdit={onEditHandler} />
          {results.length > 0 && (
            <Pagination
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              currentPageNo={pageNumber}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              totalPages={totalPages}
              onPageChange={page =>
                updateAndPushUrl(page, queryTitle, queryStatus, [
                  queryStartDate,
                  queryEndDate,
                ])
              }
            />
          )}
        </>
      )}

      {/* Modal for update */}
      {editingTodo && isUpdateModalOpen && (
        <ModalPortal>
          <div className="modal" role="dialog" aria-modal="true">
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
        </ModalPortal>
      )}
    </div>
  );
};

export default TodoContainer;
