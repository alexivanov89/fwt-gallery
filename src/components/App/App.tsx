import { Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AppRouter } from '../AppRouter';
import { QueryParamProvider } from 'use-query-params';

const App = () => {
  return (
    <Router basename="/">
      <QueryParamProvider ReactRouterRoute={Route}>
        <Suspense fallback={<div> ... Загрузка</div>}>
          <ErrorBoundary fallback={<div>Что-то пошло не так...</div>}>
            <AppRouter />
          </ErrorBoundary>
        </Suspense>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
