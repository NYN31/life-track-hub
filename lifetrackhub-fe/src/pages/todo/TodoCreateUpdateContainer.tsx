import { Box, Flex } from '@chakra-ui/react';
import PageHeading from '../../components/common/PageHeading';
import { useEffect, useState } from 'react';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  CREATION_FAILED_MESSAGE,
  CREATION_SUCCESS_MESSAGE,
  FAILED_TITLE,
  SUCCESS_TITLE,
  UPDATION_FAILED_MESSAGE,
  UPDATION_SUCCESS_MESSAGE,
} from '../../constants/texts/title-and-message';
import {
  useAddTodoMutation,
  useLazyGetTodoByIdQuery,
  useUpdateTodoMutation,
} from '../../features/todo/todoApi';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loading from '../../components/common/Loading';
import TodoItemList from '../../components/todo/TodoItemList';
import CreateTodoButtons from '../../components/common/button/CreateTodoButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetTodo,
  setErrorMessage,
  updateTodoObject,
} from '../../features/todo/todoSlice';
import {
  TODO_TITLE_LENGTH_VALIDATION_MESSAGE,
  TODO_TITLE_REQUIRED_VALIDATION_MESSAGE,
} from '../../constants/texts/validation-message';
import {
  ADD_TODO_CREATE_FORM_PAGE_HEADING,
  UPDATE_TODO_CREATE_FORM_PAGE_HEADING,
} from '../../constants/texts/page-headings';
import { useNavigate, useParams } from 'react-router-dom';
import { TODO_UPDATE_PATH } from '../../constants/sidebar/items-title-and-path';
import TodoForm from '../../components/todo/TodoForm';

const TodoCreateUpdateContainer = () => {
  const { todoId } = useParams();

  const { successToast, errorToast } = useCustomToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todoSlice = useSelector((state: any) => state.todo);
  const [loading, isLoading] = useState(false);

  const [triggerGetTodoById] = useLazyGetTodoByIdQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const getTodoByTodoIdHandler = async () => {
    dispatch(setErrorMessage(''));
    isLoading(true);
    await triggerGetTodoById({ id: todoId })
      .unwrap()
      .then(res => {
        dispatch(updateTodoObject(res));
      })
      .catch(err => {
        dispatch(setErrorMessage(err.data.message));
      })
      .finally(() => isLoading(false));
  };

  const submitTodoCreateHandler = async () => {
    const { title } = todoSlice.todoObject;
    if (!title) {
      dispatch(setErrorMessage(TODO_TITLE_REQUIRED_VALIDATION_MESSAGE));
      errorToast(FAILED_TITLE, CREATION_FAILED_MESSAGE);
      return;
    }
    if (title.length < 3) {
      dispatch(setErrorMessage(TODO_TITLE_LENGTH_VALIDATION_MESSAGE));
      errorToast(FAILED_TITLE, CREATION_FAILED_MESSAGE);
      return;
    }

    isLoading(true);
    dispatch(setErrorMessage(''));
    if (todoId) {
      await updateTodo({ ...todoSlice.todoObject, id: todoId })
        .unwrap()
        .then(() => {
          successToast(SUCCESS_TITLE, UPDATION_SUCCESS_MESSAGE);
        })
        .catch(err => {
          dispatch(setErrorMessage(err?.data?.message));
          errorToast(FAILED_TITLE, UPDATION_FAILED_MESSAGE);
        })
        .finally(() => {
          isLoading(false);
        });
    } else {
      await addTodo(todoSlice.todoObject)
        .unwrap()
        .then(res => {
          dispatch(resetTodo());
          successToast(SUCCESS_TITLE, CREATION_SUCCESS_MESSAGE);
          navigate(`${TODO_UPDATE_PATH}/${res.id}`, { replace: true });
        })
        .catch(err => {
          dispatch(setErrorMessage(err?.data?.message));
          errorToast(FAILED_TITLE, CREATION_FAILED_MESSAGE);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  };

  useEffect(() => {
    if (todoId) {
      getTodoByTodoIdHandler();
    }
  }, [todoId]);

  if (loading) return <Loading />;

  return (
    <Box>
      <Flex direction="column" align="center" justifyContent="center">
        <PageHeading
          heading={
            todoId
              ? UPDATE_TODO_CREATE_FORM_PAGE_HEADING
              : ADD_TODO_CREATE_FORM_PAGE_HEADING
          }
        />
        <Box mt={4} w={{ base: 'full', sm: 'full', md: '500px', lg: '500px' }}>
          <TodoForm />

          <TodoItemList />

          <CreateTodoButtons
            loading={loading}
            onClickTodoCreate={submitTodoCreateHandler}
          />

          {todoSlice.errorMessage && (
            <ErrorMessage message={todoSlice.errorMessage} width="full" />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default TodoCreateUpdateContainer;
