import Routes from './routes';
import ScrollToTop from './components/UI/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDataStarted } from './redux/dataSlice';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataStarted());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes />
      <ToastContainer position="top-right" autoClose={3000} newestOnTop={true} theme="dark" />
      {/* <BaseOptionChartStyle /> */}
    </>
  );
}
