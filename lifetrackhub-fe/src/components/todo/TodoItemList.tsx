import { Flex } from '@chakra-ui/react';
import { ITodoItemsRequest } from '../../types/todo';
import { useDispatch, useSelector } from 'react-redux';
import { checkboxToggler } from '../../features/todo/todoSlice';
import { Checkbox } from '../ui/checkbox';

const TodoItemList = () => {
  const dispatch = useDispatch();
  const todoSlice = useSelector((state: any) => state.todo);
  const { todoItems } = todoSlice.todoObject as ITodoItemsRequest;

  return todoItems.map((item, index) => {
    return (
      <Flex key={index} gap={4}>
        <Checkbox
          defaultChecked={item.completed}
          onChange={() => dispatch(checkboxToggler(index))}
        >
          {item.text}
        </Checkbox>
      </Flex>
    );
  });
};

export default TodoItemList;
