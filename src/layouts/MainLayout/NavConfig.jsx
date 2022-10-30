// component
import Iconify from '~/components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill'),
    // children: [
    //   {
    //     title: 'user',
    //     path: '/user',
    //   },
    // ],
  },
  {
    title: 'Foods & Drinks',
    path: '/foods',
    icon: getIcon('fluent:drink-to-go-24-filled'),
  },
  {
    title: 'Bills',
    path: '/bills',
    icon: getIcon('icon-park-solid:bill'),
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
