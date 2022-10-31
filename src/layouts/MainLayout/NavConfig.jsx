// component
import Iconify from '~/components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('ant-design:home-outlined'),
    // children: [
    //   {
    //     title: 'user',
    //     path: '/user',
    //   },
    // ],
  },
  {
    title: 'menu',
    path: '/menu',
    icon: getIcon('ep:coffee'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
