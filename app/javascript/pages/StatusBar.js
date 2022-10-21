import { useState, useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import {
  Button,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
} from 'components/Button';
import TriggerCrisisModal from 'pages/statusBar/TriggerCrisisModal';

const CoolStateStatusBar = () => {
  const [triggerIncidentModalOpen, setTriggerIncidentModalOpen] =
    useState(false);

  return (
    <div className="flex justify-end w-full h-16 p-3 bg-gray-200 border-b border-slate-300">
      <Button
        type={BUTTON_TYPE_DANGER}
        onClick={() => setTriggerIncidentModalOpen(true)}
      >
        Trigger an incident
      </Button>
      <TriggerCrisisModal
        open={triggerIncidentModalOpen}
        onClose={() => setTriggerIncidentModalOpen(false)}
      />
    </div>
  );
};

const HotStateStatusBar = ({ incident }) => {
  return (
    <div className="flex justify-between items-center w-full h-16 p-3 bg-red-600 border-b border-slate-300">
      <div className="text-xl text-white font-semibold">
        Incident in progress
      </div>
      <Button type={BUTTON_TYPE_SUCCESS}>Join the war room</Button>
    </div>
  );
};

const StatusBar = () => {
  const {
    openIncidentFetchDone,
    openIncidentFetchLoading,
    openIncidentFetchError,
    openIncident,
  } = useContext(OpenIncidentContext);

  if (openIncidentFetchDone && Boolean(openIncident))
    return <HotStateStatusBar incident={openIncident} />;
  return <CoolStateStatusBar />;
};

export default StatusBar;
