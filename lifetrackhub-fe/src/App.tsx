import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './constants/routes/app-routes';

function App() {
  return (
    <Routes>
      {appRoutes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
}

export default App;
