import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

const Root = () => {
  return (
    <BrowserRouter>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default Root;
