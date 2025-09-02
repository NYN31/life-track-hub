import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import '@uiw/react-markdown-preview/markdown.css';
import { ToastProvider } from './context/toast-context';

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
