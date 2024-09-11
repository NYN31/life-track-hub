import { Box, Flex, GridItem, Text } from '@chakra-ui/react';
import { ITodoListItem } from '../../types/todo';
import OnclickButton from '../common/button/OnclickButton';
import { format } from 'date-fns';

const Todo: React.FC<{ todo: ITodoListItem }> = ({ todo }) => {
  const { title, id, done, createdDate, lastModifiedDate, todoItems } = todo;

  let todoCompleted = 0;
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].completed == true) {
      todoCompleted += 1;
    }
  }

  const showText = (title: string, value: string | number | boolean) => {
    return (
      <Box display="flex" noOfLines={1}>
        <Box as="b">{title}</Box>
        {typeof value === 'boolean' ? value.toString() : value}
      </Box>
    );
  };

  return (
    <GridItem
      w={['full', 'full', 'full', '350px', '350px', '350px']}
      p={4}
      mt={4}
      bg="navbar.bg"
      borderRadius={4}
      boxShadow="0 1px 3px gray"
    >
      <Flex direction="column" justifyContent="space-evenly" gap={2}>
        <Flex direction="column" gap={2}>
          {showText('Title: ', title)}
          <Flex gap={12}>
            {showText('Id: ', id)}
            {showText('Done: ', done)}
          </Flex>
          {showText(
            'Create At: ',
            format(new Date(createdDate), 'yyyy-MM-dd HH:mm:ss')
          )}
          <Text>
            {showText(
              'Last Modified At: ',
              format(new Date(lastModifiedDate), 'yyyy-MM-dd HH:mm:ss')
            )}
          </Text>
          {showText('Todo Items: ', todoItems.length)}
          {showText('Todo Completed: ', todoCompleted)}
        </Flex>
        <OnclickButton
          text="View"
          width="auto"
          cursor="pointer"
          isDisable={done}
          isLoading={false}
          action={() => {}}
        />
      </Flex>
    </GridItem>
  );
};

export default Todo;
