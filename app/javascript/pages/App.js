import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import SideMenu from 'pages/SideMenu';
import StatusBar from 'pages/StatusBar';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <div className="flex">
      <SideMenu />
      <div className="w-full">
        <StatusBar />
        <AppRoutes />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
