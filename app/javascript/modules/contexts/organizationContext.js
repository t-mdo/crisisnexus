import { useState, createContext } from 'react';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';

export const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState();
  const { loading, error, success } = useHttpQuery({
    url: '/organization',
    onSuccess: ({ data: { organization } }) => {
      setOrganization(organization);
    },
  });

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        setOrganization,
        loading,
        error,
        success,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationContext;
