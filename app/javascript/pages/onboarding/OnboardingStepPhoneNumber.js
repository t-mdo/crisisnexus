import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import ErrorFeedback from 'components/form/ErrorFeedback';
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
      <ErrorFeedback queryErrors={patchError && patchResponse.errors} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 w-3/4">
          <Label>Phone number</Label>
          <Input
            {...register('phone_number')}
            type="tel"
            className="w-1/4 mb-2"
            placeholder="+33612345678"
          />
          <span className="text-sm text-gray-400">
            It will be <b>exclusively</b> used to notify you about incidents
            happening in your organization.
          </span>
        </div>
        <Label subtitle="This is the name we will use to refer to you in the app.">
          Display name
        </Label>
        <Input
          {...register('display_name')}
          type="text"
          className="w-1/4 mb-2"
          placeholder="John Doe"
        />
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
