import { useContext } from 'react';
import classnames from 'classnames';
import accountContext from 'modules/contexts/accountContext';
import openIncidentContext from 'modules/contexts/openIncidentContext';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { ROLES } from 'modules/constants';
import UserPilotIcon from 'images/icons/regular/user-pilot.svg';
import UserHeadsetIcon from 'images/icons/regular/user-headset.svg';
import UserPenIcon from 'images/icons/regular/user-pen.svg';

const RoleBlock = ({
  icon,
  name,
  displayName,
  roleHolder,
  canAssumeRole,
  assumingRole,
}) => {
  const { setOpenIncident } = useContext(openIncidentContext);
  const clickable = canAssumeRole && !assumingRole;
  const Element = clickable ? 'button' : 'div';
  const { trigger: putTrigger } = useHttpQuery({
    url: `/open_incident/roles/${name}`,
    method: 'PUT',
    trigger: true,
    onSuccess: ({ data: { incident } }) => setOpenIncident(incident),
  });

  const onBlockClick = () => {
    putTrigger();
  };

  return (
    <Element
      id={`role-block-${name}`}
      onClick={clickable ? onBlockClick : null}
      className={classnames(
        'flex flex-col items-center border-gray-400 border rounded px-5 py-4 w-48 text-center overflow-hidden',
        {
          'bg-gray-100': !canAssumeRole,
          'shadow-md hover:shadow-none active:shadow-inner-md transition duration-100':
            clickable,
        },
      )}
    >
      <div className="flex flex-col items-center h-20">
        {icon}
        <span className="mb-2 font-semibold text-gray-900">{displayName}</span>
      </div>
      {roleHolder ? (
        <>
          <span className="w-full text-gray-900 overflow-hidden text-ellipsis">
            {roleHolder}
          </span>
          {clickable && <span className="font-medium">Assume the role</span>}
        </>
      ) : (
        <>
          <span className="text-gray-900 italic">
            No {displayName.toLowerCase()} assigned
          </span>
          {clickable && <span className="font-medium">Assume the role</span>}
        </>
      )}
    </Element>
  );
};

const RolesBlock = ({ incident }) => {
  const { account } = useContext(accountContext);

  return (
    <div className="flex gap-8 flex-wrap justify-evenly mb-6">
      <RoleBlock
        icon={<UserPilotIcon className="w-5 mb-1" />}
        name={ROLES.NAMES.INCIDENT_MANAGER}
        displayName={ROLES.DISPLAY_NAMES.INCIDENT_MANAGER}
        roleHolder={incident.incident_manager?.email}
        canAssumeRole={account.can_manage_incident}
        assumingRole={incident.incident_manager?.email === account.email}
      />
      <RoleBlock
        icon={<UserHeadsetIcon className="w-5 mb-1" />}
        name={ROLES.NAMES.COMMUNICATION_MANAGER}
        displayName={ROLES.DISPLAY_NAMES.COMMUNICATION_MANAGER}
        roleHolder={incident.communication_manager?.email}
        canAssumeRole={account.can_manage_communication}
        assumingRole={incident.communication_manager?.email === account.email}
      />
      <RoleBlock
        icon={<UserPenIcon className="w-6 mb-1" />}
        name={ROLES.NAMES.SCRIBE}
        displayName={ROLES.DISPLAY_NAMES.SCRIBE}
        roleHolder={incident.scribe?.email}
        canAssumeRole
        assumingRole={incident.scribe?.email == account.email}
      />
    </div>
  );
};

export default RolesBlock;
