import { useContext } from 'react';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import OpenIncidentContext from 'modules/contexts/openIncident';
import intersperse from 'modules/helpers/intersperse';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import Card from 'components/Card';
import Button, { BUTTON_TYPE_SUCCESS } from 'components/Button';
import IncidentRow from 'pages/shared/IncidentRow';

const PastIncidentsList = ({ queryLimit }) => {
  const {
    loading,
    error,
    success,
    data: { incidents: pastIncidents } = {},
  } = useHttpQuery({ url: `/incidents?status=closed&limit=${queryLimit}` });
  const noPastIncidents = success && pastIncidents.length === 0;

  return (
    <>
      <h3 className="mb-3 font-semibold text-xl">Past incidents</h3>
      <Card as="ul">
        {(() => {
          if (loading) return <Loader />;
          if (error) return <div>Something went wrong</div>;
          if (noPastIncidents)
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

const HotStateDashboard = ({ incident }) => {
  return (
    <>
      <h3 className="mb-3 font-semibold text-xl">Ongoing incident</h3>
      <Card className="px-8 py-6">
        <div className="mb-1 text-sm text-gray-400 font-semibold">{`#CRISIS-${incident.local_id}`}</div>
        <h4 className="mb-4 text-lg text-gray-900 font-semibold">
          {incident.name}
        </h4>
        <div className="mb-1 text-xs text-gray-400">Summary</div>
        <p className="px-4 py-2 mb-8 bg-gray-100 border rounded">
          {incident.summary}
        </p>
        <div className="flex justify-end">
          <Button type={BUTTON_TYPE_SUCCESS}>Close the incident</Button>
        </div>
      </Card>
      <PastIncidentsList queryLimit={2} />
    </>
  );
};

const CoolStateDashboard = () => {
  return (
    <>
      <Card className="flex items-center justify-center px-8 py-4">
        <p className="text-lg">No incident in progress</p>
      </Card>
      <PastIncidentsList queryLimit={5} />
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
        <HotStateDashboard incident={openIncident} />
      )}
      {openIncidentFetchDone && !Boolean(openIncident) && (
        <CoolStateDashboard />
      )}
      {openIncidentFetchError && (
        <Alert type="error">An error occured while loading the dashboard</Alert>
      )}
    </div>
  );
};

export default Home;
