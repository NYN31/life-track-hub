import { Flex } from '@chakra-ui/react';
import React from 'react';
import OnclickButton from './OnclickButton';
import { ITodoItems } from '../../../types/todo';

const CreateTodoButtons: React.FC<{
  todoItems: ITodoItems[];
  onClickReset: () => void;
  loading: boolean;
  onClickTodoCreate: () => void;
}> = ({ todoItems, onClickReset, loading, onClickTodoCreate }) => {
  return (
    <Flex gap={4} mt={4}>
      <OnclickButton
        color="danger"
        text="Reset"
        width="50%"
        cursor={todoItems.length > 0 ? 'pointer' : 'not-allowed'}
        isDisable={false}
        isLoading={false}
        action={onClickReset}
      />
      <OnclickButton
        color=""
        text="Create"
        width="50%"
        cursor={todoItems.length > 0 ? 'pointer' : 'not-allowed'}
        isDisable={todoItems.length === 0}
        isLoading={loading}
        action={onClickTodoCreate}
      />
    </Flex>
  );
};

export default CreateTodoButtons;
