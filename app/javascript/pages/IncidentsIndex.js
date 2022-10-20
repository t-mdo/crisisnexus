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
import FireIcon from 'images/icons/solid/fire.svg';
import CircleCheckIcon from 'images/icons/solid/circle-check.svg';
import FileCheckIcon from 'images/icons/solid/file-check.svg';
import ChevronRightIcon from 'images/icons/regular/chevron-right.svg';

const getStatusBadgeType = (status) => {
  if (status === 'open') return STATUS_TYPE_ERROR;
  if (status === 'closed') return STATUS_TYPE_INFO;
  return STATUS_TYPE_SUCCESS;
};

const getStatusBadgeIcon = (status) => {
  if (status === 'open') return FireIcon;
  if (status === 'closed') return CircleCheckIcon;
  return FileCheckIcon;
};

const IncidentRow = ({ incident }) => {
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
      onClick={() => {}}
      className="flex justify-between p-4 hover:bg-gray-100"
    >
      <div>
        <div className="flex mb-2">
          <h4 className="flex items-center mr-4 text-sm text-gray-900 font-semibold">{`#CRISIS-${incident.local_id}: ${incident.name}`}</h4>
          <StatusBadge
            type={getStatusBadgeType(incident.status)}
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

const IncidentsIndex = () => {
  const { loading, error, data } = useHttpQuery({ url: '/incidents' });

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;
  return (
    <div className="max-h-[calc(100vh-64px)] py-6 px-4 flex-column overflow-y-auto">
      <h2 className="mb-6 font-semibold text-3xl">Incidents</h2>
      <ul className="mb-7 bg-white rounded shadow border border-slate-200">
        {intersperse(
          data.incidents.map((incident) => (
            <IncidentRow key={incident.local_id} incident={incident} />
          )),
          <hr />,
        )}
      </ul>
    </div>
  );
};

export default IncidentsIndex;
