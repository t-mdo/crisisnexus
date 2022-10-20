import { useContext } from 'react';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import OpenIncidentContext from 'modules/contexts/openIncident';
import intersperse from 'modules/helpers/intersperse';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import Card from 'components/Card';
import IncidentRow from 'pages/shared/IncidentRow';

const OpenIncidentDashboard = () => {};

const ClosedIncidentDashboard = () => {
  const {
    loading,
    error,
    success,
    data: { incidents: pastIncidents } = {},
  } = useHttpQuery({ url: '/incidents?status=closed&limit=5' });

  const noPastEvents = success && pastIncidents.length === 0;
  return (
    <>
      <h3 className="mb-3 font-semibold text-xl">Incident in progress</h3>
      <Card className="flex items-center justify-center px-6 py-3">
        <p className="text-lg">No incident in progress</p>
      </Card>
      <h3 className="mb-3 font-semibold text-xl">Past incidents</h3>
      <Card as="ul">
        {(() => {
          if (loading) return <Loader />;
          if (error) return <div>Something went wrong</div>;
          if (noPastEvents)
            return (
              <div className="px-6 py-3 text-lg text-center">
                No past incidents
              </div>
            );
          return intersperse(
            pastIncidents.map((incident) => (
              <IncidentRow key={incident.local_id} incident={incident} />
            )),
            <hr />,
          );
        })()}
      </Card>
    </>
  );
};

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
