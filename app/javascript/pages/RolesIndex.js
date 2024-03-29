import { Link } from 'react-router-dom';
import { ROLES } from 'modules/constants';
import Card from 'components/Card';
import FullView from 'components/FullView';
import UserPilotIcon from 'icons/regular/user-pilot.svg';
import UserHeadsetIcon from 'icons/regular/user-headset.svg';
import UserPenIcon from 'icons/regular/user-pen.svg';

const RoleColumn = ({ roleName, roleDisplayName, roleIcon, children }) => (
  <Card className="flex flex-col relative w-72 h-fit">
    <div className="flex justify-center items-center h-20 px-8 border-b">
      {roleIcon}
      <p className="w-44 text-gray-900 text-lg font-semibold text-center">
        {roleDisplayName}
      </p>
    </div>
    <div className="flex py-4 h-40 border-b px-4 justify-center">
      <p className="text-sm text-gray-600">{children}</p>
    </div>
    <Link
      className="flex justify-center items-center h-16 font-semibold hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
      to={`/roles/${roleName}`}
    >
      Details
    </Link>
  </Card>
);

const Roles = () => {
  return (
    <FullView className="py-6 px-4 md:px-32">
      <h2 className="mb-12 font-semibold text-3xl">Roles</h2>
      <div className="flex flex-wrap justify-evenly gap-8">
        <RoleColumn
          roleName={ROLES.NAMES.INCIDENT_MANAGER}
          roleDisplayName={ROLES.DISPLAY_NAMES.INCIDENT_MANAGER}
          roleIcon={<UserPilotIcon className="w-6" />}
        >
          The incident manager acts as the single source of truth of what is
          currently happening and what is going to happen during an incident.
        </RoleColumn>
        <RoleColumn
          roleName={ROLES.NAMES.COMMUNICATION_MANAGER}
          roleDisplayName={ROLES.DISPLAY_NAMES.COMMUNICATION_MANAGER}
          roleIcon={<UserHeadsetIcon className="w-6" />}
        >
          The communication manager is responsible for interacting with
          customers during the incident. Typically a member of the Customer
          Support team.
        </RoleColumn>
        <RoleColumn
          roleName={ROLES.NAMES.SCRIBE}
          roleDisplayName={ROLES.DISPLAY_NAMES.SCRIBE}
          roleIcon={<UserPenIcon className="w-8" />}
        >
          The scribe documents the timeline of an incident as it progresses and
          makes sure all important decisions and data are captured for later
          review.
        </RoleColumn>
      </div>
    </FullView>
  );
};

export default Roles;
