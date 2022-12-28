import BillForm from '~/components/Bills/BillForm';
import ProductForm from '~/components/Menu/ProductForm';
import TableForm from '~/components/Table/TableForm';
import AddItemForm from '~/pages/AddItemForm';
import Bills from '~/pages/Bills';
import Dashboard from '~/pages/Dashboard';
import EditItemForm from '~/pages/EditItemForm';
import Menu from '~/pages/Menu';
import Order from '~/pages/Order';
import Page404 from '~/pages/Page404';
import Report from '~/pages/Report';
import Staff from '~/pages/Staff';
import StaffForm from '~/components/Staff/StaffForm';
import Profile from '~/pages/Profile';

const CommonRoutes = [
  {
    path: '/',
    element: <Dashboard />,
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
  // order
  {
    path: '/order',
    element: <Order />,
  },
  //
  {
    path: '/tables/new',
    element: <AddItemForm title="Tạo bàn" form={<TableForm />} />,
  },
  {
    path: '/staffs',
    element: <Staff />,
  },
  {
    path: '/staffs/new',
    element: <AddItemForm title="Thêm nhân viên" form={<StaffForm />} />,
  },
  {
    path: '/staffs/edit/:staffId',
    element: <EditItemForm title="Chỉnh sửa thông tin nhân viên" Form={StaffForm} />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  //
  {
    path: '/report',
    element: <Report />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default CommonRoutes;
