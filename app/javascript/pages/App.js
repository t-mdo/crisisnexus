import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import SideMenu from 'pages/SideMenu';
import TopBar from 'pages/TopBar';

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
        <TopBar />
        <AppRoutes />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
