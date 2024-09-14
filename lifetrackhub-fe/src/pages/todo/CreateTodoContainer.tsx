import { Box, Flex } from '@chakra-ui/react';
import PageHeading from '../../components/common/PageHeading';
import { useState } from 'react';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  CREATION_FAILED_MESSAGE,
  CREATION_SUCCESS_MESSAGE,
  FAILED_TITLE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';
import { useAddTodoMutation } from '../../features/todo/todoApi';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loading from '../../components/common/Loading';
import TodoItemList from '../../components/todo/TodoItemList';
import TodoCreateForm from '../../components/todo/TodoCreateForm';
import CreateTodoButtons from '../../components/common/button/CreateTodoButtons';
import { useDispatch, useSelector } from 'react-redux';
import { resetTodo, setErrorMessage } from '../../features/todo/todoSlice';
import {
  TODO_TITLE_LENGTH_VALIDATION_MESSAGE,
  TODO_TITLE_REQUIRED_VALIDATION_MESSAGE,
} from '../../constants/texts/validation-message';
import { ADD_TODO_CREATE_FORM_PAGE_HEADING } from '../../constants/texts/page-headings';

const CreateTodoContainer = () => {
  const { successToast, errorToast } = useCustomToast();
  const dispatch = useDispatch();

  const todoSlice = useSelector((state: any) => state.todo);
  const [loading, isLoading] = useState(false);

  const [addTodo] = useAddTodoMutation();

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
    await addTodo(todoSlice.todoObject)
      .unwrap()
      .then(() => {
        dispatch(resetTodo());
        successToast(SUCCESS_TITLE, CREATION_SUCCESS_MESSAGE);
        // TODO: navigate to edit page
      })
      .catch(err => {
        dispatch(setErrorMessage(err?.data?.message));
        errorToast(FAILED_TITLE, CREATION_FAILED_MESSAGE);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Flex direction="column" align="center" justifyContent="center">
        <PageHeading heading={ADD_TODO_CREATE_FORM_PAGE_HEADING} />
        <Box mt={4} w={{ base: 'full', sm: 'full', md: '500px', lg: '500px' }}>
          <TodoCreateForm />

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

export default CreateTodoContainer;
