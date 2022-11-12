import ProductForm from '~/components/Menu/ProductForm';
import Bills from '~/pages/Bills';
import EditItemForm from '~/pages/EditItemForm';
import Home from '~/pages/Foods';
import Menu from '~/pages/Menu';
import AddItemForm from '~/pages/AddItemForm';
import Page404 from '~/pages/Page404';
import BillForm from '~/components/Bills/BillForm';
import Order from '~/pages/Order';
import TableForm from '~/components/Table/TableForm';

const CommonRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  // menu
  { path: '/menu', element: <Menu /> },
  { path: '/menu/new', element: <AddItemForm title="Thêm món" form={<ProductForm />} /> },
  { path: '/menu/edit/:id', element: <EditItemForm title="Chỉnh sửa món" Form={ProductForm} /> },
  // bills
  {
    path: '/bills',
    element: <Bills />,
  },
  {
    path: '/bills/new',
    element: <AddItemForm title="Tạo hóa đơn" form={<BillForm />} />,
  },
  {
    path: '/bills/edit/:id',
    element: <EditItemForm title="Chỉnh sửa hóa đơn" Form={BillForm} />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/tables/new',
    element: <AddItemForm title="Tạo bàn" form={<TableForm />} />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default CommonRoutes;
