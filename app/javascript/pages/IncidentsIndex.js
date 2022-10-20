import dayjs from 'dayjs';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import intersperse from 'modules/helpers/intersperse';
import Loader from 'components/Loader';
import {
  StatusBadge,
  STATUS_TYPE_INFO,
  STATUS_TYPE_ERROR,
  STATUS_TYPE_SUCCESS,
} from 'components/StatusBadge';
import CalendarDayIcon from 'images/icons/regular/calendar-day.svg';
import ClockIcon from 'images/icons/regular/clock.svg';
import FireIcon from 'images/icons/regular/fire.svg';
import CircleCheckIcon from 'images/icons/regular/circle-check.svg';
import FileCheckIcon from 'images/icons/regular/file-check.svg';

const IncidentRow = ({ incident }) => {
  const statusBadgeType =
    incident.status === 'open'
      ? STATUS_TYPE_ERROR
      : incident.status === 'closed'
      ? STATUS_TYPE_INFO
      : STATUS_TYPE_SUCCESS;
  const statusBadgeIcon =
    incident.status === 'open'
      ? FireIcon
      : incident.status === 'closed'
      ? CircleCheckIcon
      : FileCheckIcon;
  const started_at_formatted = dayjs(incident.started_at).format('lll');
  const ended_at_formatted = incident.ended_at
    ? dayjs(incident.ended_at).format('lll')
    : 'Ongoing';
  const duration_formatted = dayjs
    .duration({ seconds: incident.duration })
    .humanize();

  return (
    <li
      key={incident.id}
      role="button"
      onClick={() => {}}
      className="p-4 hover:bg-gray-100"
    >
      <div className="flex items-align mb-2">
        <h4 className="flex items-center mr-4 text-sm text-gray-900 font-semibold">{`#CRISIS-${incident.local_id}: ${incident.name}`}</h4>
        <StatusBadge type={statusBadgeType} icon={statusBadgeIcon}>
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
    </li>
  );
};

const IncidentsIndex = () => {
  const { loading, error, data } = useHttpQuery({ url: '/incidents' });

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;
  return (
    <div className="max-h-[calc(100vh-64px)] py-6 px-4 flex-column overflow-y-auto">
      <h2 className="mb-6 font-semibold text-3xl">Incidents</h2>
      <ul className="mb-7 bg-white rounded shadow border border-slate-200">
        {intersperse(
          data.incidents.map((incident) => <IncidentRow incident={incident} />),
          <hr />,
        )}
      </ul>
    </div>
  );
};

export default IncidentsIndex;
