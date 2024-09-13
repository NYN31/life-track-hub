import { Box, Flex, Input } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import OnclickButton from '../common/button/OnclickButton';
import CustomInput from '../Form/CustomInput';
import { ITodoItems } from '../../types/todo';

const TodoCreateForm: React.FC<{
  todoItems: ITodoItems[];
  setTodoItems: Dispatch<SetStateAction<ITodoItems[]>>;
  setTitleHandler: (string: string) => void;
}> = ({ todoItems, setTodoItems, setTitleHandler }) => {
  const [todoText, setTodoText] = useState('');
  const [title, setTitle] = useState('');

  const handleAddTodoItem = (item: ITodoItems) => {
    const currentTodoItems = todoItems;
    const newTodoItems: ITodoItems[] = [...currentTodoItems, item];
    setTodoItems(newTodoItems);
    setTodoText('');
  };

  return (
    <Flex direction="column" gap={4}>
      <Input
        value={title}
        onChange={e => {
          setTitle(e.target.value);
          setTitleHandler(e.target.value);
        }}
        placeholder="Title"
        _placeholder={{
          fontSize: '2xl',
        }}
        border="0px"
        borderColor="#FFF"
        fontWeight={900}
        fontSize="lg"
        _hover={{ border: '0px', borderColor: '#FFF' }}
      />
      <Flex>
        <CustomInput
          value={todoText}
          setValue={setTodoText}
          isRequired={false}
          label=""
          type="text"
          placeholder="Enter a Todo"
          errorMessage=""
        />

        <Box pr={4}>
          <OnclickButton
            color=""
            text="Add"
            width="auto"
            cursor={todoText ? 'pointer' : 'not-allowed'}
            isDisable={!todoText}
            isLoading={false}
            action={() =>
              handleAddTodoItem({ text: todoText, completed: false })
            }
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoCreateForm;
