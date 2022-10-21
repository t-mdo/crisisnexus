import { useParams } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
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
    <div>
      <Card>
        <h2 className="mt-6 mb-3 ml-8 font-semibold text-2xl">{`#CRISIS-${incident.local_id}: ${incident.name}`}</h2>
        <StatusBadge
          className="ml-8 mb-3"
          type={getStatusBadgeType(incident.status)}
          icon={getStatusBadgeIcon(incident.status)}
        >
          {incident.status}
        </StatusBadge>
      </Card>
      <div className="py-6 px-4 md:px-32 overflow-y-auto">
        {incident.summary && (
          <>
            <div className="text font-semibold text-gray-500 mb-2">Summary</div>
            <div className="px-8 py-4 bg-white border rounded text-gray-900 mb-6">
              {incident.summary}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IncidentsIndex;
