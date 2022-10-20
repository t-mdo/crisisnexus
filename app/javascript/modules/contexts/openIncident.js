import { useState, useEffect, createContext } from 'react';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';

export const OpenIncidentContext = createContext();

const POLLING_INTERVAL = 10000;

export const OpenIncidentProvider = ({ children }) => {
  const [openIncident, setOpenIncident] = useState();
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const {
    loading,
    error,
    trigger: fetchOpenIncidents,
    data: { open_incident } = {},
  } = useHttpQuery({
    url: '/incidents/open',
    trigger: true,
    onSuccess: () => {
      setOpenIncident(open_incident);
      if (!initialFetchDone) {
        setInitialFetchDone(true);
      }
    },
  });

  useEffect(() => {
    fetchOpenIncidents();
    const interval = setInterval(() => {
      if (!loading) fetchOpenIncidents();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const openIncidentFetchDone = initialFetchDone;
  const openIncidentFetchLoading = loading && !initialFetchDone;

  return (
    <OpenIncidentContext.Provider
      value={{
        openIncidentFetchDone,
        openIncidentFetchError: error,
        openIncidentFetchLoading,
        openIncident,
      }}
    >
      {children}
    </OpenIncidentContext.Provider>
  );
};

export default OpenIncidentContext;
