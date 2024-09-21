import { Box, Divider, Flex, GridItem, Spacer, Text } from '@chakra-ui/react';
import { ITodoItemsResponse } from '../../types/todo';
import OnclickButton from '../common/button/OnclickButton';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { TODO_UPDATE_PATH } from '../../constants/sidebar/items-title-and-path';

const Todo: React.FC<{ todo: ITodoItemsResponse }> = ({ todo }) => {
  const { title, id, done, createdDate, lastModifiedDate, todoItems } = todo;

  const navigate = useNavigate();

  let todoCompleted = 0;
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].completed == true) {
      todoCompleted += 1;
    }
  }

  const showText = (
    title: string,
    value: string | number | boolean,
    size: string = 'sm',
    space: boolean = true
  ) => {
    return (
      <Box display="flex" fontSize={size}>
        <Box as="b">{title}</Box>
        {space ? <Spacer /> : <span>&nbsp;</span>}
        {typeof value === 'boolean' ? value.toString() : value}
      </Box>
    );
  };

  return (
    <GridItem
      p={6}
      bg="todo.bg"
      borderRadius={16}
      boxShadow="0 1px 10px rgba(0, 0, 0, .3)"
      _hover={{
        boxShadow: '0 1px 10px rgba(0, 0, 0, .6)',
      }}
    >
      <Flex direction="column" justifyContent="space-between" gap={2}>
        <Flex direction="column" gap={2}>
          <Flex fontSize="xl">
            <Box as="b">{'Title:'}</Box>
            <span>&nbsp;</span>
            <Text noOfLines={1}>{title}</Text>
          </Flex>

          <Divider colorScheme="orange" orientation="horizontal" />

          {showText('Done: ', done)}

          {showText(
            'Create At: ',
            format(new Date(createdDate), 'yyyy-MM-dd HH:mm:ss')
          )}

          {showText(
            'Last Modified At: ',
            format(new Date(lastModifiedDate), 'yyyy-MM-dd HH:mm:ss')
          )}

          {showText('Todo Items: ', todoItems.length)}
          {showText('Todo Completed: ', todoCompleted)}
        </Flex>
        <Spacer />
        <OnclickButton
          color="btn.bg"
          text="View"
          width="auto"
          cursor="pointer"
          isDisable={done}
          isLoading={false}
          action={() => navigate(`${TODO_UPDATE_PATH}/${id}`)}
        />
      </Flex>
    </GridItem>
  );
};

export default Todo;
