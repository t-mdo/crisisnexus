import { Alert, ALERT_COLOR_ERROR } from 'components/Alert';

const ErrorFeedback = ({ formErrors, queryErrors }) => {
  const formHasErrors = formErrors && formErrors.length > 0;
  const queryHasErrors = queryErrors && queryErrors.length > 0;

  if (!formHasErrors && !queryErrors) return null;
  return (
    <Alert className="mb-4" color={ALERT_COLOR_ERROR}>
      <ul className="text-left">
        {formHasErrors &&
          formErrors.map((message, i) => <li key={i}>{message}</li>)}
        {queryHasErrors &&
          queryErrors.map((message, i) => <li key={i}>{message}</li>)}
      </ul>
    </Alert>
  );
};

export default ErrorFeedback;
