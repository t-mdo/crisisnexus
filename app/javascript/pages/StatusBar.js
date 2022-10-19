import { useState } from 'react';
import Button from 'components/Button';
import TriggerCrisisModal from 'pages/TopBar/TriggerCrisisModal';

const DefaultStateTopBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex justify-end w-full p-3 bg-gray-100">
      <Button onClick={() => setModalOpen(true)}>Trigger an incident</Button>
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
