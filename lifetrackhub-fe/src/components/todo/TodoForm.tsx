import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import OnclickButton from '../common/button/OnclickButton';
import CustomInput from '../form/CustomInput';
import { ITodoItems } from '../../types/todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoItemText, setTitleOfTodo } from '../../features/todo/todoSlice';
import { useParams } from 'react-router-dom';

const TodoForm = () => {
  const { todoId } = useParams();
  const dispatch = useDispatch();
  const {
    todoObject: { title },
    errorMessage,
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
      <Text as="b">Title</Text>
      <Textarea
        value={title}
        onChange={e => handleTodoTitle(e.target.value)}
        minHeight={16}
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
        resize="none"
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
          onEnterKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && todoText.trim() !== '') {
              handleAddTodoItem({ text: todoText, completed: false });
            }
          }}
        />
        <Box mt={2}>
          <OnclickButton
            color="btn.bg"
            text="Add"
            width="auto"
            cursor={todoText ? 'pointer' : 'not-allowed'}
            isDisable={!todoText || (!!todoId && !!errorMessage)}
            isLoading={false}
            action={() =>
              handleAddTodoItem({ text: todoText, completed: false })
            }
            borderRadius="0px"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoForm;
