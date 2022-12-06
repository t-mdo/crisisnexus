import { useState, useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import OrganizationContext from 'modules/contexts/organizationContext';
import {
  Button,
  BUTTON_COLOR_DANGER,
  BUTTON_COLOR_SUCCESS,
  BUTTON_COLOR_PRIMARY,
} from 'components/Button';
import TriggerIncidentModal from 'pages/statusBar/TriggerIncidentModal';

const CoolStateStatusBar = () => {
  const [triggerIncidentModalOpen, setTriggerIncidentModalOpen] =
    useState(false);

  return (
    <div className="flex justify-end w-full h-16 p-3 bg-stone-200 border-b border-slate-300">
      <Button
        color={BUTTON_COLOR_DANGER}
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
              <Button color={BUTTON_COLOR_SUCCESS}>
                <span className="hidden md:inline">Join the </span>
                <span>war room</span>
              </Button>
            </a>
          );
        }
        return (
          <Button href="/organization" color="white">
            Set up your war room
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
