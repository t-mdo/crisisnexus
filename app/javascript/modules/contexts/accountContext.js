import { useState, createContext } from 'react';
import { identifyUser } from 'modules/tracking';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const { loading, error, success } = useHttpQuery({
    url: '/current_account',
    onSuccess: ({ data: { account } }) => {
      setAccount(account);
      identifyUser(account);
    },
  });

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        loading,
        error,
        success,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
