import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import OrganizationContext from 'modules/contexts/organizationContext';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Card from 'components/Card';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import ErrorFeedback from 'components/form/ErrorFeedback';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Alert, ALERT_STYLE_SUCCESS } from 'components/Alert';

const Settings = ({ organization, setOrganization }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      name: organization.name,
      warRoom: organization.war_room_url,
    },
  });

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
    onSuccess: ({ data: { organization } }) => {
      setOrganization(organization);
    },
  });

  const onSubmit = ({ warRoom }) => {
    triggerOrganizationPatch({ body: { war_room_url: warRoom } });
  };

  return (
    <div className="py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-2xl">Organization settings</h2>
      <Card className="px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {patchSuccess && (
            <Alert className="mb-4" style={ALERT_STYLE_SUCCESS}>
              Changes applied
            </Alert>
          )}
          <ErrorFeedback
            formErrors={Object.values(formErrors).map((error) => error.message)}
            queryErrors={patchError && patchResponse.errors}
          />
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
          <Label>War Room URL</Label>
          <p className="mb-1 text-gray-400 text-xs">
            The virtual room where your team will regroup to organize incident
            response
          </p>
          <Input
            {...register('warRoom', {
              required: 'You need a virtual war room url for your organization',
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
      </Card>
    </div>
  );
};

export default () => {
  const { organization, loading, setOrganization } =
    useContext(OrganizationContext);

  if (loading) return <Loader />;
  return (
    <Settings organization={organization} setOrganization={setOrganization} />
  );
};
