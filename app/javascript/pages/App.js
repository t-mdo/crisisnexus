import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OpenIncidentProvider } from 'modules/contexts/openIncidentContext';
import Home from 'pages/Home';
import SideMenu from 'pages/SideMenu';
import StatusBar from 'pages/StatusBar';
import IncidentsIndex from 'pages/IncidentsIndex';
import IncidentsShow from 'pages/IncidentsShow';
import Settings from 'pages/Settings';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/incidents" element={<IncidentsIndex />} />
    <Route path="/incidents/:id" element={<IncidentsShow />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <div className="flex overflow-hidden h-screen">
      <SideMenu />
      <div className="w-full bg-gray-100">
        <OpenIncidentProvider>
          <StatusBar />
          <AppRoutes />
        </OpenIncidentProvider>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
