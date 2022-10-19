import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import SideMenu from 'pages/SideMenu';
import StatusBar from 'pages/StatusBar';
import IncidentsIndex from 'pages/IncidentsIndex';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/incidents" element={<IncidentsIndex />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <div className="flex overflow-hidden h-screen">
      <SideMenu />
      <div className="flex-column w-full bg-gray-100">
        <StatusBar />
        <AppRoutes />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
