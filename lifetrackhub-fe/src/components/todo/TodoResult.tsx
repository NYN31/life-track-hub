import React from 'react';
import { ITodoItemsResponse } from '../../types/todo';
import { Grid } from '@chakra-ui/react';
import Todo from './Todo';

const TodoResult: React.FC<{ todos: ITodoItemsResponse[] }> = ({ todos }) => {
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
      {todos.map((todo: ITodoItemsResponse) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Grid>
  );
};

export default TodoResult;
