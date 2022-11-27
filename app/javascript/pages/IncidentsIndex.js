import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import intersperse from 'modules/helpers/intersperse';
import { BlockLoader } from 'components/Loader';
import Card from 'components/Card';
import IncidentRow from 'pages/shared/IncidentRow';

const IncidentsIndex = () => {
  const {
    loading,
    error,
    success,
    data: { incidents } = {},
  } = useHttpQuery({ url: '/incidents' });
  const noPastIncident = success && incidents.length === 0;

  if (loading) return <BlockLoader />;
  if (error) return <p>Something went wrong</p>;
  return (
    <div className="max-h-[calc(100vh-64px)] py-6 px-4 md:px-32 overflow-y-auto">
      <h2 className="mb-6 font-semibold text-3xl">Incidents</h2>
      <Card as="ul">
        {noPastIncident ? (
          <div className="px-6 py-3 text-lg text-center">
            Nothing to show for now
          </div>
        ) : (
          intersperse(
            incidents.map((incident) => (
              <IncidentRow key={incident.local_id} incident={incident} />
            )),
            <hr />,
          )
        )}
      </Card>
    </div>
  );
};

export default IncidentsIndex;
