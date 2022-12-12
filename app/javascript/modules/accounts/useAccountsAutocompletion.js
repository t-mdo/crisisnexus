import { useEffect } from 'react';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';

const useAccountsAutocompletion = ({ valueWatcher }) => {
  const { data: { accounts } = {}, trigger: triggerFetch } = useHttpQuery({
    url: '/accounts',
    trigger: true,
  });

  useEffect(() => {
    const params = valueWatcher ? { q: valueWatcher, limit: 4 } : {};
    triggerFetch({ params });
  }, [valueWatcher]);

  const autocompleteOptions =
    accounts?.map((account) => ({
      display: account.email,
      value: account.id,
    })) || [];

  return autocompleteOptions;
};

export default useAccountsAutocompletion;
