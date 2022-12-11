import { useState, useEffect } from 'react';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { AutocompletedInput } from 'components/form/AutocompletedInput';

const NewEnrollmentForm = ({ enrollments, onAccountSelect }) => {
  const [emailInput, setEmailInput] = useState();
  const { data: { accounts } = {}, trigger: triggerFetch } = useHttpQuery({
    url: '/accounts',
    trigger: true,
  });

  useEffect(() => {
    const params = emailInput ? { q: emailInput, limit: 5 } : {};
    triggerFetch({ params });
  }, [emailInput]);

  const enrolledEmails = enrollments.map(
    (enrollment) => enrollment.account.email,
  );
  const autocompleteOptions =
    accounts
      ?.filter((account) => !enrolledEmails.includes(account.email))
      .map(({ id, email }) => ({
        display: email,
        value: id,
      })) || [];

  return (
    <form className="flex items-start p-1 grow-0">
      <AutocompletedInput
        options={autocompleteOptions}
        onInputChange={({ target: { value } }) => setEmailInput(value)}
        value={emailInput}
        onChange={onAccountSelect}
        placeholder="New member's email"
        className="w-full"
      />
    </form>
  );
};

export default NewEnrollmentForm;
