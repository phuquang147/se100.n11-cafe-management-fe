// component
import Iconify from '~/components/UI/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('ant-design:home-filled'),
  },
  {
    title: 'menu',
    path: '/menu',
    icon: getIcon('mdi:food-fork-drink'),
  },
  {
    title: 'Đặt món',
    path: '/order',
    icon: getIcon('bxs:food-menu'),
  },
  {
    title: 'Hóa đơn',
    path: '/bills',
    icon: getIcon('icon-park-solid:bill'),
  },
  {
    title: 'Nhân viên',
    path: '/staffs',
    icon: getIcon('mdi:user-circle'),
  },
];

export default navConfig;
