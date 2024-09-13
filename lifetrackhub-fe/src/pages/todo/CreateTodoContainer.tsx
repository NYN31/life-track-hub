import { Box, Flex } from '@chakra-ui/react';
import PageHeading from '../../components/common/PageHeading';
import { useState } from 'react';
import { ITodoItems, ITodoItemsRequest } from '../../types/todo';
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

const CreateTodoContainer = () => {
  const userId = Number(localStorage.getItem('userId'));
  const initialTodo = {
    userId: userId,
    title: '',
    done: false,
    todoItems: [],
  };

  const { successToast, errorToast } = useCustomToast();

  const [createTodoObject, setCreateTodoObject] =
    useState<ITodoItemsRequest>(initialTodo);
  const [todoItems, setTodoItems] = useState<ITodoItems[]>([]);
  const [loading, isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [addTodo] = useAddTodoMutation();

  const resetHandler = () => {
    setTodoItems([]);
    setErrorMessage('');
    setCreateTodoObject(initialTodo);
  };

  const setTitleHandler = (title: string) => {
    const newTodoCreateObj = {
      ...createTodoObject,
      title: title,
      userId: userId,
    };
    setCreateTodoObject(newTodoCreateObj);
  };

  const checkboxTogglerHandler = (idx: number) => {
    const newTodoItems = [...todoItems].map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    });

    setTodoItems(newTodoItems);
  };

  const submitTodoCreateHandler = async () => {
    const { title } = createTodoObject;
    if (!title) {
      setErrorMessage('Title Field is Required.');
      errorToast(FAILED_TITLE, CREATION_FAILED_MESSAGE);
      return;
    }
    if (title.length < 3) {
      setErrorMessage('Title Field length should be in between 8 to 40.');
      errorToast(FAILED_TITLE, CREATION_FAILED_MESSAGE);
      return;
    }

    isLoading(true);
    const createTodoRequestObj = { ...createTodoObject, todoItems: todoItems };
    await addTodo(createTodoRequestObj)
      .unwrap()
      .then(() => {
        setCreateTodoObject(initialTodo);
        successToast(SUCCESS_TITLE, CREATION_SUCCESS_MESSAGE);
        // TODO: navigate to edit page
      })
      .catch(err => {
        setErrorMessage(err?.data?.message);
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
        <PageHeading heading="Add Todo Form" />
        <Box mt={4} w={{ base: '100%', md: '500px', lg: '500px' }}>
          <TodoCreateForm
            todoItems={todoItems}
            setTodoItems={setTodoItems}
            setTitleHandler={setTitleHandler}
          />

          <TodoItemList
            todoItems={todoItems}
            onChangeCheckboxTogglerHandler={checkboxTogglerHandler}
          />

          <CreateTodoButtons
            todoItems={todoItems}
            onClickReset={resetHandler}
            loading={loading}
            onClickTodoCreate={submitTodoCreateHandler}
          />

          {errorMessage && <ErrorMessage message={errorMessage} width="full" />}
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateTodoContainer;
