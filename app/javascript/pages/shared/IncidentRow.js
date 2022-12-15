import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { StatusBadge } from 'components/StatusBadge';
import {
  getStatusBadgeType,
  getStatusBadgeIcon,
} from 'pages/shared/statusUtils';
import CalendarDayIcon from 'icons/regular/calendar-day.svg';
import ClockIcon from 'icons/regular/clock.svg';
import ChevronRightIcon from 'icons/regular/chevron-right.svg';

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
      className="flex justify-between items-center p-4 hover:bg-gray-100"
    >
      <div className="w-full">
        <div className="flex justify-between md:justify-start mb-2">
          <h4 className="flex items-center mr-4 text-sm text-gray-900 font-semibold">{`#CRISIS-${incident.local_id}: ${incident.name}`}</h4>
          <StatusBadge
            color={getStatusBadgeType(incident.status)}
            icon={getStatusBadgeIcon(incident.status)}
          >
            {incident.status}
          </StatusBadge>
        </div>
        <div className="flex ml-2 text-gray-600 text-xs">
          <div className="flex flex-wrap mr-5 items-center">
            <CalendarDayIcon className="w-3 mr-2" />
            <div className="flex flex-col md:flex-row">
              <span className="mr-1">{started_at_formatted}</span>
              <span className="mr-1 hidden md:inline">-</span>
              <span>{ended_at_formatted}</span>
            </div>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-3 mr-1" />
            {duration_formatted}
          </div>
        </div>
      </div>
      <ChevronRightIcon className="hidden md:block ml-4 w-3 h-3 fill-gray-400" />
    </li>
  );
};

export default IncidentRow;
