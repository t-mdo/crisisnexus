import { Alert, ALERT_STYLE_ERROR } from 'components/Alert';

const ErrorFeedback = ({ formErrors, queryErrors }) => {
  const formHasErrors = formErrors && formErrors.length > 0;
  const queryHasErrors = queryErrors && queryErrors.length > 0;

  if (!formHasErrors && !queryErrors) return null;
  return (
    <Alert className="mb-4" style={ALERT_STYLE_ERROR}>
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
