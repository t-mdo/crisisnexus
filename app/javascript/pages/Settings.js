import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Card from 'components/Card';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Alert, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from 'components/Alert';

const Settings = () => {
  const {
    success: getSuccess,
    loading: getLoading,
    error: getError,
  } = useHttpQuery({
    url: '/organization',
    onSuccess: ({ data: { war_room_url, name } }) => {
      resetForm({ name, warRoom: war_room_url });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset: resetForm,
  } = useForm();

  const {
    loading: patchLoading,
    data: patchResponse,
    error: patchError,
    success: patchSuccess,
    trigger: triggerOrganizationPatch,
  } = useHttpQuery({
    url: `/organization`,
    method: 'PATCH',
    trigger: true,
  });

  const onSubmit = ({ warRoom }) => {
    triggerOrganizationPatch({ body: { war_room_url: warRoom } });
  };

  const formHasErrors = Object.keys(formErrors).length > 0;

  return (
    <div className="py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-2xl">Organization settings</h2>
      <Card className="px-8 py-6">
        {getLoading && <Loader />}
        {getError && <p>An error occurred</p>}
        {getSuccess && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {patchSuccess && (
              <Alert className="mb-4" type={ALERT_TYPE_SUCCESS}>
                Changed applied
              </Alert>
            )}
            {(formHasErrors || patchError) && (
              <Alert className="mb-4" type={ALERT_TYPE_ERROR}>
                <ul>
                  {formHasErrors &&
                    Object.entries(formErrors).map(([key, { message }]) => (
                      <li key={key}>{message}</li>
                    ))}
                  {patchError &&
                    patchResponse.errors.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                </ul>
              </Alert>
            )}
            <Label>Organization name</Label>
            <Input
              {...register('name', {
                required: 'Your organization needs to have a name',
              })}
              type="text"
              className="w-3/4 mb-6"
              placeholder="Organization name"
              aria-required="true"
              aria-invalid={formErrors?.name ? 'true' : 'false'}
            />
            <Label>WarRoom URL</Label>
            <p className="mb-1 text-gray-400 text-xs">
              The virtual room where your team will regroup to organize incident
              response
            </p>
            <Input
              {...register('warRoom', {
                required:
                  'You need a virtual war room url for your organization',
              })}
              type="text"
              className="w-3/4 mb-6"
              placeholder="https://meet.google.com/dss-dsss-dss OR https://zoom.us/j/1234567890"
              aria-required="true"
              aria-invalid={formErrors?.name ? 'true' : 'false'}
            />
            <Button loading={patchLoading} role="submit">
              Submit
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Settings;
