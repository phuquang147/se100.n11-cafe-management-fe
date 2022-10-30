import Home from '~/pages/Home';
import Page404 from '~/pages/Page404';

const CommonRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default CommonRoutes;
