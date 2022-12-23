import { useState, useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import OrganizationContext from 'modules/contexts/organizationContext';
import { Button, BUTTON_COLOR_SUCCESS } from 'components/Button';
import TriggerIncidentModal from 'pages/statusBar/TriggerIncidentModal';

const CoolStateStatusBar = () => {
  const [triggerIncidentModalOpen, setTriggerIncidentModalOpen] =
    useState(false);

  return (
    <div className="flex justify-end w-full h-16 p-3 bg-gray-300 shadow-sm">
      <Button onClick={() => setTriggerIncidentModalOpen(true)}>
        Trigger an incident
      </Button>
      <TriggerIncidentModal
        open={triggerIncidentModalOpen}
        onClose={() => setTriggerIncidentModalOpen(false)}
      />
    </div>
  );
};

const HotStateStatusBar = ({ incident }) => {
  const { organization } = useContext(OrganizationContext);

  return (
    <div className="flex justify-between items-center w-full h-16 p-3 bg-red-600 border-b border-grey-300">
      <div className="flex gap-x-2 items-baseline text-xl text-white font-semibold">
        <div>
          Crisis #{incident.local_id} in progress
          <span className="hidden md:inline">:</span>
        </div>
        <div className="hidden md:block">{incident.name}</div>
      </div>
      {(() => {
        if (!organization) return null;
        if (organization.war_room_url) {
          return (
            <a target="_blank" href={organization.war_room_url}>
              <Button color={BUTTON_COLOR_SUCCESS}>
                <span className="hidden md:inline">Join the war room</span>
                <span className="md:hidden">War room</span>
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
