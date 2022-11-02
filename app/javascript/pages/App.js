import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  OrganizationProvider,
  OrganizationContext,
} from 'modules/contexts/organizationContext';
import {
  AccountProvider,
  AccountContext,
} from 'modules/contexts/accountContext';
import { OpenIncidentProvider } from 'modules/contexts/openIncidentContext';
import Onboarding from 'pages/Onboarding';
import Home from 'pages/Home';
import SideMenu from 'pages/SideMenu';
import StatusBar from 'pages/StatusBar';
import IncidentsIndex from 'pages/IncidentsIndex';
import IncidentsShow from 'pages/IncidentsShow';
import RolesIndex from 'pages/RolesIndex';
import RolesShow from 'pages/RolesShow';
import Settings from 'pages/Settings';
import Account from 'pages/Account';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/incidents" element={<IncidentsIndex />} />
    <Route path="/incidents/:id" element={<IncidentsShow />} />
    <Route path="/roles" element={<RolesIndex />} />
    <Route path="/roles/:name" element={<RolesShow />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/account" element={<Account />} />
  </Routes>
);

const AppView = () => {
  const {
    loading: accountFetchLoading,
    success: accountFetchSuccess,
    account,
    setAccount,
  } = useContext(AccountContext);
  const {
    loading: organizationFetchLoading,
    organization,
    setOrganization,
  } = useContext(OrganizationContext);

  const fetchingInProgress = accountFetchLoading || organizationFetchLoading;
  const onboardingNotCompleted =
    accountFetchSuccess && !account.onboarding_completed;

  if (fetchingInProgress) return null;
  if (onboardingNotCompleted)
    return (
      <div className="overflow-hidden h-screen">
        <Onboarding
          account={account}
          setAccount={setAccount}
          organization={organization}
          setOrganization={setOrganization}
        />
      </div>
    );
  return (
    <OpenIncidentProvider>
      <div className="flex overflow-hidden h-screen">
        <SideMenu />
        <div className="w-full bg-gray-100">
          <StatusBar />
          <AppRoutes />
        </div>
      </div>
    </OpenIncidentProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <OrganizationProvider>
      <AccountProvider>
        <AppView />
      </AccountProvider>
    </OrganizationProvider>
  </BrowserRouter>
);

export default App;
