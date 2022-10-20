import { useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncident';
import Alert from 'components/Alert';
import Loader from 'components/Loader';

const OpenIncidentDashboard = () => {};

const ClosedIncidentDashboard = () => (
  <h3 className="mb-3 font-semibold text-xl">Past incidents</h3>
);

const Home = () => {
  const {
    openIncidentFetchDone,
    openIncidentFetchLoading,
    openIncidentFetchError,
    openIncident,
  } = useContext(OpenIncidentContext);

  return (
    <div className="py-6 px-4">
      <h2 className="mb-6 font-semibold text-3xl">Dashboard</h2>
      {openIncidentFetchLoading && <Loader />}
      {openIncidentFetchDone && Boolean(openIncident) && (
        <OpenIncidentDashboard incident={openIncident} />
      )}
      {openIncidentFetchDone && !Boolean(openIncident) && (
        <ClosedIncidentDashboard />
      )}
      {openIncidentFetchError && (
        <Alert type="error">An error occured while loading the dashboard</Alert>
      )}
    </div>
  );
};

export default Home;
