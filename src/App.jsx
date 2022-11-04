import Routes from './routes';
import ScrollToTop from './components/UI/ScrollToTop';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes />
      {/* <BaseOptionChartStyle /> */}
    </>
  );
}
