import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Alert from 'components/Alert';
import Loader from 'components/Loader';

const OpenCrisisDashboard = () => {};

const ClosedCrisisDashboard = () => <p></p>;

const Home = () => {
  const {
    loading,
    success,
    error,
    data: { open_incident } = {},
  } = useHttpQuery({
    url: '/incidents/open',
  });

  return (
    <div className="py-6 px-4">
      <h2 className="mb-6 font-semibold text-3xl">Dashboard</h2>
      {loading && <Loader />}
      {success && Boolean(open_incident) && <OpenCrisisDashboard />}
      {success && !Boolean(open_incident) && <ClosedCrisisDashboard />}
      {error && (
        <Alert type="error">An error occured while loading the dashboard</Alert>
      )}
    </div>
  );
};

export default Home;
