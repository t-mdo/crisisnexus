import { Alert, ALERT_TYPE_ERROR } from 'components/Alert';

const ErrorFeedback = ({ formErrors, queryErrors }) => {
  const formHasErrors = formErrors && formErrors.length > 0;
  const queryHasErrors = queryErrors && queryErrors.length > 0;

  console.log(formErrors, queryErrors);
  if (!formHasErrors && !queryErrors) return null;
  return (
    <Alert className="mb-4" type={ALERT_TYPE_ERROR}>
      <ul>
        {formHasErrors &&
          formErrors.map((message, i) => <li key={i}>{message}</li>)}
        {queryHasErrors &&
          queryErrors.map((message, i) => <li key={i}>{message}</li>)}
      </ul>
    </Alert>
  );
};

export default ErrorFeedback;
