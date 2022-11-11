import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { StatusBadge } from 'components/StatusBadge';
import {
  getStatusBadgeType,
  getStatusBadgeIcon,
} from 'pages/shared/statusUtils';
import CalendarDayIcon from 'images/icons/regular/calendar-day.svg';
import ClockIcon from 'images/icons/regular/clock.svg';
import ChevronRightIcon from 'images/icons/regular/chevron-right.svg';

const IncidentRow = ({ incident }) => {
  const navigate = useNavigate();
  const started_at_formatted = dayjs(incident.started_at).format('lll');
  const ended_at_formatted = incident.ended_at
    ? dayjs(incident.ended_at).format('lll')
    : 'Ongoing';
  const duration_formatted = dayjs
    .duration({ seconds: incident.duration })
    .humanize();

  return (
    <li
      role="button"
      onClick={() => navigate(`/incidents/${incident.local_id}`)}
      className="flex justify-between p-4 hover:bg-gray-100"
    >
      <div>
        <div className="flex mb-2">
          <h4 className="flex items-center mr-4 text-sm text-gray-900 font-semibold">{`#CRISIS-${incident.local_id}: ${incident.name}`}</h4>
          <StatusBadge
            color={getStatusBadgeType(incident.status)}
            icon={getStatusBadgeIcon(incident.status)}
          >
            {incident.status}
          </StatusBadge>
        </div>
        <div className="flex ml-2 text-gray-600 text-xs">
          <div className="flex mr-5 items-center">
            <CalendarDayIcon className="w-3 mr-2" />
            {`${started_at_formatted} - ${ended_at_formatted}`}
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-3 mr-2" />
            {duration_formatted}
          </div>
        </div>
      </div>
      <ChevronRightIcon className="w-3 fill-gray-400" />
    </li>
  );
};

export default IncidentRow;
