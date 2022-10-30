import Bills from '~/pages/Bills';
import Dashboard from '~/pages/Dashboard';
import Home from '~/pages/Foods';
import Page404 from '~/pages/Page404';

const CommonRoutes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/foods',
    element: <Home />,
  },
  {
    path: '/bills',
    element: <Bills />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default CommonRoutes;
