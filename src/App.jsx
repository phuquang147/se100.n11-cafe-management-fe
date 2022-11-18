import Routes from './routes';
import ScrollToTop from './components/UI/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes />
      <ToastContainer position="top-right" autoClose={3000} newestOnTop={true} theme="dark" />
      {/* <BaseOptionChartStyle /> */}
    </>
  );
}
