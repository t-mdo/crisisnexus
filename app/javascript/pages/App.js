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
import NoRouteMatch from 'pages/NoRouteMatch';
import Home from 'pages/Home';
import SideMenu from 'pages/SideMenu';
import StatusBar from 'pages/StatusBar';
import IncidentsIndex from 'pages/IncidentsIndex';
import IncidentsRoot from 'pages/IncidentsRoot';
import IncidentsShow from 'pages/incidents/IncidentsShow';
import IncidentsMinutesForm from 'pages/incidents/MinutesForm';
import IncidentsPostMortemShow from 'pages/incidents/PostMortemShow';
import IncidentsPostMortemEdit from 'pages/incidents/PostMortemEdit';
import RolesIndex from 'pages/RolesIndex';
import RolesShow from 'pages/RolesShow';
import Organization from 'pages/Organization';
import InviteAccountsView from 'pages/InviteAccountsView';
import Account from 'pages/Account';
import WelcomeModal from 'pages/WelcomeModal';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/incidents" element={<IncidentsIndex />} />
    <Route path="/incidents/:id" element={<IncidentsRoot />}>
      <Route index element={<IncidentsShow />} />
      <Route path="minutes" element={<IncidentsMinutesForm />} />
      <Route path="postmortem" element={<IncidentsPostMortemShow />} />
      <Route path="postmortem/edit" element={<IncidentsPostMortemEdit />} />
    </Route>
    <Route path="/roles" element={<RolesIndex />} />
    <Route path="/roles/:name" element={<RolesShow />} />
    <Route path="/organization" element={<Organization />} />
    <Route path="/invite-accounts" element={<InviteAccountsView />} />
    <Route path="/account" element={<Account />} />
    <Route path="/*" element={<NoRouteMatch />} />
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
          <WelcomeModal
            open={!organization.welcome_message_displayed}
            onClose={() =>
              setOrganization((organization) => ({
                ...organization,
                welcome_message_displayed: true,
              }))
            }
          />
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
