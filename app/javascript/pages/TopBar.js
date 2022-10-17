import Button from 'components/Button';
import TriggerCrisisModal from 'pages/TopBar/TriggerCrisisModal';

const DefaultStateTopBar = () => {
  return (
    <div className="flex justify-end w-full p-3 bg-gray-100">
      <Button>Trigger an incident</Button>
      <TriggerCrisisModal />
    </div>
  );
};

const TopBar = ({ incidentState }) => {
  return <DefaultStateTopBar />;
};

export default TopBar;
