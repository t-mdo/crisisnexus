import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { Alert, ALERT_TYPE_ERROR } from 'components/Alert';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import Button from 'components/Button';

const OnboardingStepPhoneNumber = ({ setAccount }) => {
  const {
    error: patchError,
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

  const { register, handleSubmit } = useForm();

  const onSubmit = (account) => {
    triggerPostOrganization({
      body: { account: { ...account, onboarding_completed: true } },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {patchError && (
          <Alert className="mb-4" type={ALERT_TYPE_ERROR}>
            <ul>
              {patchResponse.errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </Alert>
        )}
        <div className="mb-6 w-3/4">
          <Label>Phone number</Label>
          <Input
            {...register('phone_number')}
            type="tel"
            className="w-full mb-2"
            placeholder="+33612345678"
          />
          <span className="text-sm text-gray-400">
            It will be <b>exclusively</b> used to notify you about incidents
            happening in your organization.
          </span>
        </div>
        <div className="w-full flex justify-end">
          <Button loading={patchLoading} role="submit">
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingStepPhoneNumber;
