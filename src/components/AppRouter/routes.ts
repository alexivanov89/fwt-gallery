import { lazy } from 'react';
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));

export enum routePaths {
  mainPage = '/main',
}

export const publicRoutes = [
  { path: routePaths.mainPage, exact: false, component: MainPage, label: 'Главная' },
];
