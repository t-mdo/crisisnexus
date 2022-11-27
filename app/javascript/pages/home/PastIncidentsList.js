import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import intersperse from 'modules/helpers/intersperse';
import Card from 'components/Card';
import { BlockLoader } from 'components/Loader';
import IncidentRow from 'pages/shared/IncidentRow';

const PastIncidentsList = ({ queryLimit }) => {
  const {
    loading,
    error,
    success,
    data: { incidents: pastIncidents } = {},
  } = useHttpQuery({ url: `/incidents?status=closed&limit=${queryLimit}` });
  const noPastIncidents = success && pastIncidents.length === 0;

  return (
    <>
      <h3 className="mb-3 font-semibold text-xl">Past incidents</h3>
      <Card as="ul">
        {(() => {
          if (loading) return <BlockLoader />;
          if (error) return <div>Something went wrong</div>;
          if (noPastIncidents)
            return (
              <div className="px-6 py-3 text-lg text-center">
                Nothing to show for now
              </div>
            );
          return intersperse(
            pastIncidents.map((incident) => (
              <IncidentRow key={incident.local_id} incident={incident} />
            )),
            <hr />,
          );
        })()}
      </Card>
    </>
  );
};

export default PastIncidentsList;
