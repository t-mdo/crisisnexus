import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import ErrorFeedback from 'components/form/ErrorFeedback';
import Button from 'components/Button';

function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

const OnboardingStepOrganization = ({ account, setOrganization }) => {
  const {
    error: postError,
    loading: postLoading,
    data: postResponse,
    trigger: triggerPostOrganization,
  } = useHttpQuery({
    url: '/organization',
    method: 'POST',
    trigger: true,
    onSuccess: ({ data: { organization } }) => {
      setOrganization(organization);
    },
  });

  const identifier = account.email.split('@')[1];
  const defaultName = capitalize(account.email.split('@')[1].split('.')[0]);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({ defaultValues: { name: defaultName } });

  const onSubmit = (organization) => {
    triggerPostOrganization({ body: { organization } });
  };

  return (
    <div>
      <p className="mb-6 text-gray-900 text-lg font-semibold">
        Organization creation
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorFeedback
          formErrors={Object.values(formErrors).map((error) => error.message)}
          queryErrors={postError && postResponse.errors}
        />
        <div className="mb-6">
          <Label>Organization domain</Label>
          <Input className="mb-4" type="text" value={identifier} disabled />
          <Label>Organization name</Label>
          <Input
            {...register('name', {
              required: 'Organization name is required',
            })}
            type="text"
            className="w-1/2 mb-6"
            placeholder="Aperture Science, Black Messa, etc."
            aria-required="true"
            aria-invalid={formErrors?.name ? 'true' : 'false'}
          />
          <Label subtitle="The virtual room where your team will regroup to organize the incidents' responses">
            War room URL
          </Label>
          <Input
            {...register('war_room_url')}
            type="text"
            className="w-3/4"
            placeholder="https://meet.google.com/dss-dsss-dss OR https://zoom.us/j/1234567890"
            aria-required="true"
            aria-invalid={formErrors?.name ? 'true' : 'false'}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button color="purple" loading={postLoading} role="submit">
            Next step
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingStepOrganization;
