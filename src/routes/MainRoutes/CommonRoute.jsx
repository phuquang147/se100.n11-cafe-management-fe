import Bills from '~/pages/Bills';
import EditProduct from '~/pages/EditProduct';
import Home from '~/pages/Foods';
import Menu from '~/pages/Menu';
import NewProduct from '~/pages/NewProduct';
import Page404 from '~/pages/Page404';

const CommonRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  // menu
  { path: '/menu', element: <Menu /> },
  { path: '/menu/new', element: <NewProduct /> },
  { path: '/menu/edit/:id', element: <EditProduct /> },
  //
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
