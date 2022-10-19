import { useState, useEffect } from 'react';
import httpQuery from 'modules/httpQuery/httpQuery';

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const useHttpQuery = ({
  url,
  trigger,
  onSuccess,
  onFailure,
  method = 'GET',
  body,
  params,
}) => {
  const [state, setState] = useState({
    loading: !trigger,
    success: false,
    error: false,
  });
  const executeRequest = async ({
    body: triggerBody,
    params: triggerParams,
  } = {}) => {
    setState((state) => ({ ...state, loading: true }));
    httpQuery({
      url,
      method,
      body: triggerBody || body,
      params: triggerParams || params,
    })
      .then((response) => {
        setState({ ...response, success: true, loading: false, error: false });
        if (onSuccess) onSuccess(response);
      })
      .catch((error) => {
        if (environment === 'development')
          console.log('HttpQuery: Fetch Error', error);
        setState({
          ...error,
          loading: false,
          success: false,
          error: true,
        });
        if (onFailure) onFailure(message);
      });
  };

  useEffect(() => {
    if (!trigger) executeRequest();
  }, [url]);

  if (!trigger) return state;
  return { ...state, trigger: executeRequest };
};

export default useHttpQuery;
