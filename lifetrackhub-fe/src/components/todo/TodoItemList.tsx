import { Checkbox, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ITodoItems } from '../../types/todo';

const TodoItemList: React.FC<{
  todoItems: ITodoItems[];
  onChangeCheckboxTogglerHandler: (index: number) => void;
}> = ({ todoItems, onChangeCheckboxTogglerHandler }) => {
  return todoItems.map((item, index) => {
    return (
      <Flex key={index} gap={4}>
        <Checkbox
          isChecked={item.completed}
          onChange={() => onChangeCheckboxTogglerHandler(index)}
        />
        <Text>{item.text}</Text>
      </Flex>
    );
  });
};

export default TodoItemList;
