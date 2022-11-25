import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AccountContext from 'modules/contexts/accountContext';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Card from 'components/Card';
import { Button, BUTTON_COLOR_DANGER } from 'components/Button';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import ErrorFeedback from 'components/form/ErrorFeedback';
import { Alert, ALERT_COLOR_SUCCESS } from 'components/Alert';

const EditAccountForm = ({ account, setAccount }) => {
  const {
    error: patchError,
    success: patchSuccess,
    loading: patchLoading,
    data: patchResponse,
    trigger: triggerPostOrganization,
  } = useHttpQuery({
    url: '/current_account',
    method: 'PATCH',
    trigger: true,
    onSuccess: ({ data: { account } }) => {
      setAccount(account);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: account,
  });

  const onSubmit = (account) => {
    triggerPostOrganization({
      body: { account: { ...account, onboarding_completed: true } },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {patchSuccess && (
        <Alert className="mb-4" color={ALERT_COLOR_SUCCESS}>
          Changes applied
        </Alert>
      )}
      <ErrorFeedback
        formErrors={Object.values(formErrors).map((error) => error.message)}
        queryErrors={patchError && patchResponse.errors}
      />
      <div className="mb-6 w-3/4">
        <Label subtitle="This is the name we will use to refer to you in the app.">
          Display name
        </Label>
        <Input
          {...register('display_name', {
            required: 'Display name is required',
          })}
          type="text"
          className="w-full mb-4"
        />
        <Label
          subtitle={
            <>
              It will be <b>exclusively</b> used to notify you about incidents
              happening in your organization.
            </>
          }
        >
          Phone number
        </Label>
        <Input
          {...register('phone_number')}
          type="tel"
          className="w-full mb-2"
          placeholder="+33612345678"
        />
      </div>
      <Button loading={patchLoading} role="submit">
        Submit
      </Button>
    </form>
  );
};

const Account = () => {
  const { account, setAccount } = useContext(AccountContext);

  if (!account) return null;
  return (
    <div className="py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-3xl">Account</h2>
      <div className="flex justify-between items-center mb-8">
        <p className="text-lg">
          Logged in as: <span className="font-semibold">{account.email}</span>
        </p>
        <a href="/logout" rel="nofollow">
          <Button color={BUTTON_COLOR_DANGER}>Sign out</Button>
        </a>
      </div>
      <Card className="py-4 px-8">
        <EditAccountForm account={account} setAccount={setAccount} />
      </Card>
    </div>
  );
};

export default Account;
