import React from 'react';
import { ITodoListItem } from '../../types/todo';
import { Grid } from '@chakra-ui/react';
import Todo from './Todo';

const TodoResult: React.FC<{ todos: ITodoListItem[] }> = ({ todos }) => {
  return (
    <Grid
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(4, 1fr)',
      ]}
      gap={2}
    >
      {todos.map((todo: ITodoListItem) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Grid>
  );
};

export default TodoResult;
