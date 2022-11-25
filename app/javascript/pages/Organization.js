import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import OrganizationContext from 'modules/contexts/organizationContext';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import FullView from 'components/FullView';
import Card from 'components/Card';
import { Input } from 'components/form/Input';
import Label from 'components/form/Label';
import ErrorFeedback from 'components/form/ErrorFeedback';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Alert, ALERT_COLOR_SUCCESS } from 'components/Alert';
import { List, ListRow } from 'components/list/List';

const Organization = ({ organization, setOrganization }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: organization,
  });

  const { data: { accounts } = {}, loading: accountsFetchLoading } =
    useHttpQuery({ url: '/accounts' });

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

  const onSubmit = (organization) => {
    triggerOrganizationPatch({ body: organization });
  };

  return (
    <FullView className="py-6 px-4 md:px-32">
      <h3 className="mb-6 font-semibold text-2xl">Organization settings</h3>
      <Card className="mb-16 px-8 py-6">
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
            The virtual room where your team will regroup to organize the
            incidents' responses
          </p>
          <Input
            {...register('war_room_url', {
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
      <div className="mb-6 flex justify-between">
        <h3 className="font-semibold text-2xl">Registered accounts</h3>
        <Button className="nowrap text-ellipsis" href="/invite-accounts">
          Invite new accounts in your organization
        </Button>
      </div>
      <Card>
        {accountsFetchLoading ? (
          <Loader />
        ) : (
          <List>
            {accounts.map((account) => (
              <ListRow
                key={account.id}
                className="flex items-center p-4 w-full"
              >
                {account.email}
              </ListRow>
            ))}
          </List>
        )}
      </Card>
    </FullView>
  );
};

export default () => {
  const { organization, loading, setOrganization } =
    useContext(OrganizationContext);

  if (loading) return <Loader />;
  return (
    <Organization
      organization={organization}
      setOrganization={setOrganization}
    />
  );
};
