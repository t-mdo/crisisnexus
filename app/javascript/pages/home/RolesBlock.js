import { useContext } from 'react';
import classnames from 'classnames';
import accountContext from 'modules/contexts/accountContext';
import UserPilotIcon from 'images/icons/regular/user-pilot.svg';
import UserHeadsetIcon from 'images/icons/regular/user-headset.svg';
import UserPenIcon from 'images/icons/regular/user-pen.svg';

const RoleBlock = ({ icon, displayName, roleHolder, canRole }) => {
  const Element = canRole ? 'button' : 'div';

  return (
    <Element
      className={classnames(
        'flex flex-col items-center border-gray-400 border rounded px-5 py-4 w-48 text-center overflow-hidden',
        {
          'bg-gray-100': !canRole,
          'shadow hover:shadow-none active:shadow-inner transition duration-100':
            canRole,
        },
      )}
    >
      <div className="flex flex-col items-center h-20">
        {icon}
        <span className="mb-2 font-semibold text-gray-900">{displayName}</span>
      </div>
      {roleHolder ? (
        <span className="pb-2 w-full text-gray-900 overflow-hidden text-ellipsis">
          {roleHolder}
        </span>
      ) : (
        <>
          <span className="text-gray-900 italic">
            No {displayName.toLowerCase()} appointed
          </span>
          {canRole && (
            <span className="font-medium text-green-600">Take the role</span>
          )}
        </>
      )}
    </Element>
  );
};

const RolesBlock = ({ incident }) => {
  const { account } = useContext(accountContext);

  console.log(account);
  return (
    <div className="flex gap-8 flex-wrap justify-evenly mb-6">
      <RoleBlock
        icon={<UserPilotIcon className="w-5 mb-1" />}
        displayName="Incident manager"
        roleHolder={incident.incident_manager?.email}
        canRole={account.can_manage_incidents}
      />
      <RoleBlock
        icon={<UserHeadsetIcon className="w-5 mb-1" />}
        displayName="Communication manager"
        roleHolder={incident.communication_manager?.email}
        canRole={account.can_manage_communication}
      />
      <RoleBlock
        icon={<UserPenIcon className="w-6 mb-1" />}
        displayName="Scribe"
        roleHolder={incident.scribe?.email}
        canRole
      />
    </div>
  );
};

export default RolesBlock;
