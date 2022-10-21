import { useState, useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import Card from 'components/Card';
import Button, { BUTTON_TYPE_SUCCESS } from 'components/Button';
import PastIncidentsList from 'pages/home/PastIncidentsList';
import CloseIncidentModal from 'pages/home/CloseIncidentModal';

const HotStateDashboard = ({ incident }) => {
  const [closeIncidentModalOpen, setCloseIncidentModalOpen] = useState(false);

  return (
    <>
      <h3 className="mb-3 font-semibold text-xl">Ongoing incident</h3>
      <Card className="px-8 py-6">
        <div className="mb-4">
          <span className="mr-2 text-sm text-gray-400 font-semibold">{`#CRISIS-${incident.local_id}:`}</span>
          <span className="text-lg text-gray-900 font-semibold">
            {incident.name}
          </span>
        </div>
        <div className="mb-1 text-xs text-gray-400">Summary</div>
        <p className="px-4 py-2 mb-8 bg-gray-100 border rounded">
          {incident.summary}
        </p>
        <div className="flex justify-end">
          <Button
            type={BUTTON_TYPE_SUCCESS}
            onClick={() => setCloseIncidentModalOpen(true)}
          >
            Close the incident
          </Button>
        </div>
      </Card>
      <PastIncidentsList queryLimit={2} />
      <CloseIncidentModal
        open={closeIncidentModalOpen}
        onClose={() => setCloseIncidentModalOpen(false)}
      />
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
