import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import OrganizationContext from 'modules/contexts/organizationContext';
import {
  Button,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_PRIMARY,
} from 'components/Button';
import TriggerIncidentModal from 'pages/statusBar/TriggerIncidentModal';

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
      <TriggerIncidentModal
        open={triggerIncidentModalOpen}
        onClose={() => setTriggerIncidentModalOpen(false)}
      />
    </div>
  );
};

const HotStateStatusBar = () => {
  const navigate = useNavigate();
  const { organization } = useContext(OrganizationContext);

  return (
    <div className="flex justify-between items-center w-full h-16 p-3 bg-red-600 border-b border-slate-300">
      <div className="text-xl text-white font-semibold">
        Incident in progress
      </div>
      {(() => {
        if (!organization) return null;
        if (organization.war_room_url) {
          return (
            <a target="_blank" href={organization.war_room_url}>
              <Button type={BUTTON_TYPE_SUCCESS}>Join the War Room</Button>
            </a>
          );
        }
        return (
          <Button
            type={BUTTON_TYPE_PRIMARY}
            onClick={() => navigate('/settings')}
          >
            Set up your crisis room
          </Button>
        );
      })()}
    </div>
  );
};

const StatusBar = () => {
  const { openIncidentFetchDone, openIncident } =
    useContext(OpenIncidentContext);

  if (!openIncidentFetchDone) return null;
  if (openIncident) return <HotStateStatusBar incident={openIncident} />;
  return <CoolStateStatusBar />;
};

export default StatusBar;
