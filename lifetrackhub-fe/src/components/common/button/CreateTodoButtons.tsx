import { Flex } from '@chakra-ui/react';
import React from 'react';
import OnclickButton from './OnclickButton';
import { ITodoItemsRequest } from '../../../types/todo';
import { useDispatch, useSelector } from 'react-redux';
import { resetTodo } from '../../../features/todo/todoSlice';
import { useParams } from 'react-router-dom';

const CreateTodoButtons: React.FC<{
  loading: boolean;
  onClickTodoCreate: () => void;
}> = ({ loading, onClickTodoCreate }) => {
  const { todoId } = useParams();
  const dispatch = useDispatch();
  const todoSlice = useSelector((state: any) => state.todo);
  const { title, todoItems } = todoSlice.todoObject as ITodoItemsRequest;

  return (
    <Flex gap={4} mt={4}>
      <OnclickButton
        color="danger"
        text="Reset"
        width="50%"
        cursor={todoItems.length > 0 ? 'pointer' : 'not-allowed'}
        isDisable={todoItems.length === 0 && !title}
        isLoading={false}
        action={() => dispatch(resetTodo())}
      />
      <OnclickButton
        color="btn.bg"
        text={todoId ? 'Update' : 'Create'}
        width="50%"
        cursor={todoItems.length > 0 ? 'pointer' : 'not-allowed'}
        isDisable={todoItems.length === 0 || !title}
        isLoading={loading}
        action={onClickTodoCreate}
      />
    </Flex>
  );
};

export default CreateTodoButtons;
