import { useSelector } from 'react-redux';
import { useLazyGetTodosByIdQuery } from '../../features/todo/todoApi';
import { getUpdatedUrl, useQuery } from '../../helper/url/search-params';
import { useEffect, useState } from 'react';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  FAILED_TITLE,
  SEARCH_FAILED_ERROR_MESSAGE,
} from '../../constants/texts/title-and-message';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import PaginationButton from '../../components/common/button/PaginationButton';
import TodoResult from '../../components/todo/TodoResult';
import PageHeading from '../../components/common/PageHeading';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

const TodoContainer = () => {
  const queryPage = useQuery().get('page') || '0';

  const { errorToast } = useCustomToast();
  const navigate = useNavigate();

  const [todoResults, setTodoResults] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [next, setNext] = useState(-1);
  const [previous, setPrevious] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const userId = useSelector((state: any) => state.auth.userId);

  const [triggerGetTodosById] = useLazyGetTodosByIdQuery();

  const setResponseToState = (todoResponse: any) => {
    const { content, hasNext, hasPrevious, pageNumber } = todoResponse;

    setTodoResults(content);
    setHasNext(hasNext);
    setHasPrevious(hasPrevious);
    setNext(pageNumber + 1);
    setPrevious(pageNumber - 1);
  };

  const handleTodoSearch = async (page = 0) => {
    setLoading(true);
    setErrorMessage('');
    await triggerGetTodosById({
      userId: userId || localStorage.getItem('userId'),
      page,
      size: 10,
    })
      .unwrap()
      .then(res => {
        setResponseToState(res);
      })
      .catch(err => {
        setResponseToState({ content: [], hasPrevious: false, hasNext: false });
        setErrorMessage(err.data.message || SEARCH_FAILED_ERROR_MESSAGE);
        errorToast(
          err.data.status || FAILED_TITLE,
          err.data.message || SEARCH_FAILED_ERROR_MESSAGE
        );
      })
      .finally(() => setLoading(false));
  };

  const updateAndPushUrl = (page = '0') => {
    navigate(getUpdatedUrl(`/todo?page=${page}`), {
      replace: true,
    });
  };

  const handleNextPageClick = () => {
    updateAndPushUrl(String(next));
  };

  const handlePreviousPageClick = () => {
    updateAndPushUrl(String(previous));
  };

  useEffect(() => {
    handleTodoSearch(Number(queryPage));
  }, [location.search]);

  if (loading) return <Loading />;
  if (!todoResults) return null;

  return (
    <Flex direction="column">
      <PageHeading heading="Your Todos" />

      <Flex direction="row" justifyContent="end" pt="10px">
        <PaginationButton
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          handlePreviousPage={handlePreviousPageClick}
          handleNextPage={handleNextPageClick}
        />
      </Flex>

      <TodoResult todos={todoResults} />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Flex>
  );
};

export default TodoContainer;
