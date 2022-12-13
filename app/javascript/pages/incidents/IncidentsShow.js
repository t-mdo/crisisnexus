import { useOutletContext } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { Button } from 'components/Button';
import {
  ScribedMinutesContainer,
  ScribedMinutes,
} from './minutes/ScribedMinutes';
import UserPilotIcon from 'icons/regular/user-pilot.svg';
import UserHeadsetIcon from 'icons/regular/user-headset.svg';
import UserPenIcon from 'icons/regular/user-pen.svg';

const RoleBlock = ({ icon, displayName, roleHolder }) => (
  <div className="flex flex-col items-center border rounded px-5 py-4 w-48 text-center overflow-hidden mb-4 bg-white">
    <div className="flex flex-col items-center h-20">
      {icon}
      <span className="mb-2 font-semibold text-gray-900">{displayName}</span>
    </div>
    {roleHolder ? (
      <span className="w-full text-gray-900 overflow-hidden text-ellipsis">
        {roleHolder.display_name}
      </span>
    ) : (
      <span className="w-full text-gray-900 italic overflow-hidden text-ellipsis">
        No one assigned
      </span>
    )}
  </div>
);

const IncidentsShow = () => {
  const { incident } = useOutletContext();
  const { postmortem } = incident;

  const { data: { minutes } = {}, loading: loadingFetchMinutes } = useHttpQuery(
    { url: `incidents/${incident.local_id}/minutes` },
  );

  return (
    <div className="flex overflow-y-auto h-full">
      <div className="flex flex-col h-full grow-[2] px-8 py-6 border-r">
        <>
          <div className="text font-semibold text-gray-500 mb-2">Summary</div>
          <div className="px-8 py-4 bg-white border rounded mb-6">
            {incident.summary ? (
              <div className="text-gray-900">{incident.summary}</div>
            ) : (
              <div className="text-gray-900 italic">No summary provided</div>
            )}
          </div>
          <div className="text font-semibold text-gray-500 mb-2">Minutes</div>
          <div className="px-8 py-4 bg-white border rounded overflow-y-auto">
            {minutes && minutes.length > 0 ? (
              <ScribedMinutesContainer>
                <ScribedMinutes
                  loading={loadingFetchMinutes}
                  minutes={minutes}
                />
              </ScribedMinutesContainer>
            ) : (
              <p className="text-gray-900 italic">No minutes scribed</p>
            )}
          </div>
        </>
      </div>
      <div className="grow-1 px-8 py-6">
        <div className="text font-semibold text-gray-500 mb-2">Postmortem</div>
        {postmortem && (
          <>
            <div className="mb-2 text-ellipsis">
              <span className="text-sm text-gray-500">Owner:</span>{' '}
              {postmortem.assigned_to.display_name}
            </div>
            <Button
              href={`postmortem${
                postmortem.status === 'published' ? '' : '/edit'
              }`}
              className="text-center mb-4"
            >
              {postmortem.status === 'published' ? 'View' : 'Edit'}
            </Button>
          </>
        )}
        <div className="text font-semibold text-gray-500 mb-2">Roles</div>
        <div className="flex flex-col justify-evenly text-gray-900 mb-6">
          <RoleBlock
            icon={<UserPilotIcon className="w-5" />}
            displayName="Incident manager"
            roleHolder={incident.incident_manager}
          />
          <RoleBlock
            icon={<UserHeadsetIcon className="w-5" />}
            displayName="Communication manager"
            roleHolder={incident.communication_manager}
          />
          <RoleBlock
            icon={<UserPenIcon className="w-6" />}
            displayName="Scribe"
            roleHolder={incident.communication_manager}
          />
        </div>
      </div>
    </div>
  );
};

export default IncidentsShow;
