import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes, routePaths } from './routes';

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route path={route.path} exact={route.exact} component={route.component} key={route.path} />
      ))}
      <Redirect to={routePaths.mainPage} />
    </Switch>
  );
};

export default AppRouter;
