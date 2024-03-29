import { useState, useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import AccountContext from 'modules/contexts/accountContext';
import FullView from 'components/FullView';
import Alert from 'components/Alert';
import { BlockLoader } from 'components/Loader';
import Card from 'components/Card';
import Text from 'components/Text';
import Button, { BUTTON_COLOR_SUCCESS } from 'components/Button';
import CloseIncidentModal from 'pages/home/CloseIncidentModal';
import RolesBlock from 'pages/home/RolesBlock';
import TodoList from 'pages/home/TodoList';
import PastIncidentsList from 'pages/home/PastIncidentsList';

const HotStateDashboard = ({ incident }) => {
  const { account } = useContext(AccountContext);
  const [closeIncidentModalOpen, setCloseIncidentModalOpen] = useState(false);

  const isScribe = incident?.scribe?.id === account.id;

  return (
    <>
      <h2 className="mb-3 font-semibold text-xl">Open incident</h2>
      <Card className="px-8 py-6">
        <div className="mb-4">
          <span className="text-lg text-gray-400 font-semibold">{`Crisis #${incident.local_id}: `}</span>
          <span className="text-xl text-gray-900 font-semibold">
            {incident.name}
          </span>
        </div>
        {incident.summary ? (
          <p className="px-2 py-2 mb-8">{incident.summary}</p>
        ) : (
          <p className="px-2 py-2 mb-8 italic">No summary provided</p>
        )}
        <RolesBlock incident={incident} />
        <div className="flex justify-between pt-16">
          {isScribe ? (
            <Button href={`/incidents/${incident.local_id}/minutes`}>
              Start scribing
            </Button>
          ) : (
            <div />
          )}
          <Button
            color={BUTTON_COLOR_SUCCESS}
            onClick={() => setCloseIncidentModalOpen(true)}
          >
            Close the incident
          </Button>
        </div>
      </Card>
      <CloseIncidentModal
        open={closeIncidentModalOpen}
        onClose={() => setCloseIncidentModalOpen(false)}
      />
    </>
  );
};

const CoolStateDashboard = () => {
  return (
    <div>
      <Text uiStyle="heading-2" className="mb-3">
        To do
      </Text>
      <TodoList />
      <Text uiStyle="heading-2" className="mt-8 mb-3">
        Last incident
      </Text>
      <PastIncidentsList queryLimit={1} />
    </div>
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
    <FullView className="py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-3xl">Dashboard</h2>
      {openIncidentFetchLoading && <BlockLoader />}
      {openIncidentFetchDone && Boolean(openIncident) && (
        <HotStateDashboard incident={openIncident} />
      )}
      {openIncidentFetchDone && !openIncident && <CoolStateDashboard />}
      {openIncidentFetchError && (
        <Alert color="error">
          An error occured while loading the dashboard
        </Alert>
      )}
    </FullView>
  );
};

export default Home;
