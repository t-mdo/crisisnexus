import { useState } from 'react';
import { Button, BUTTON_TYPE_DANGER } from 'components/Button';
import TriggerCrisisModal from 'pages/TopBar/TriggerCrisisModal';

const DefaultStateTopBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex justify-end w-full h-16 p-3 bg-gray-200 border-b border-slate-300">
      <Button type={BUTTON_TYPE_DANGER} onClick={() => setModalOpen(true)}>
        Trigger an incident
      </Button>
      <TriggerCrisisModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

const StatusBar = ({ incidentState }) => {
  return <DefaultStateTopBar />;
};

export default StatusBar;
