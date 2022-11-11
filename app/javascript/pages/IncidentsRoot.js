import { useParams, Outlet } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import FullView from 'components/FullView';
import Loader from 'components/Loader';
import Card from 'components/Card';
import { StatusBadge } from 'components/StatusBadge';
import {
  getStatusBadgeType,
  getStatusBadgeIcon,
} from 'pages/shared/statusUtils';

const IncidentsIndex = () => {
  const { id } = useParams();
  const {
    loading,
    error,
    data: { incident } = {},
  } = useHttpQuery({ url: `/incidents/${id}` });

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;
  return (
    <FullView>
      <Card className="flex items-center px-8 py-4">
        <h2 className="mr-4 font-semibold text-2xl">{`#CRISIS-${incident.local_id}: ${incident.name}`}</h2>
        <StatusBadge
          color={getStatusBadgeType(incident.status)}
          icon={getStatusBadgeIcon(incident.status)}
        >
          {incident.status}
        </StatusBadge>
      </Card>
      <Outlet context={{ incident }} />
    </FullView>
  );
};

export default IncidentsIndex;
