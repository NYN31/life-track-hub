import { Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import OnclickButton from '../common/button/OnclickButton';
import CustomInput from '../Form/CustomInput';
import { ITodoItems } from '../../types/todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoItemText, setTitleOfTodo } from '../../features/todo/todoSlice';

const TodoCreateForm = () => {
  const dispatch = useDispatch();
  const {
    todoObject: { title },
  } = useSelector((state: any) => state.todo);

  const [todoText, setTodoText] = useState('');

  const handleTodoTitle = (title: string) => {
    dispatch(setTitleOfTodo(title));
  };

  const handleAddTodoItem = (item: ITodoItems) => {
    dispatch(addTodoItemText(item));
    setTodoText('');
  };

  return (
    <Flex direction="column" gap={4}>
      <Input
        value={title}
        onChange={e => handleTodoTitle(e.target.value)}
        placeholder="Title"
        _placeholder={{
          fontSize: '2xl',
        }}
        fontSize="2xl"
        p="0px"
        border="0px"
        borderRadius="0px"
        borderColor="#FFF"
        fontWeight={500}
      />
      <Flex direction="row">
        <CustomInput
          value={todoText}
          setValue={setTodoText}
          isRequired={false}
          label=""
          type="text"
          placeholder="Enter a Todo"
          errorMessage=""
        />

        <OnclickButton
          color=""
          text="Add"
          width="auto"
          cursor={todoText ? 'pointer' : 'not-allowed'}
          isDisable={!todoText}
          isLoading={false}
          action={() => handleAddTodoItem({ text: todoText, completed: false })}
        />
      </Flex>
    </Flex>
  );
};

export default TodoCreateForm;
