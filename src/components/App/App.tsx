import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AppRouter } from '../AppRouter';

const App = () => {
  return (
    <Router basename="/fwt-gallery">
      <Suspense fallback={<div> ... Загрузка</div>}>
        <ErrorBoundary fallback={<div>Что-то пошло не так...</div>}>
          <AppRouter />
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};

export default App;
