import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import intersperse from 'modules/helpers/intersperse';
import { ROLES } from 'modules/constants';
import Text from 'components/Text';
import IconButton from 'components/IconButton';
import Loader from 'components/Loader';
import Card from 'components/Card';
import FullView from 'components/FullView';
import UserPilotIcon from 'icons/regular/user-pilot.svg';
import UserHeadsetIcon from 'icons/regular/user-headset.svg';
import UserPenIcon from 'icons/regular/user-pen.svg';
import UserMinusIcon from 'icons/regular/user-minus.svg';
import UserPlusIcon from 'icons/regular/user-plus.svg';
import NewEnrollmentForm from 'pages/roles/NewEnrollmentForm';

const RoleIcon = ({ roleName }) => {
  if (roleName === ROLES.NAMES.INCIDENT_MANAGER)
    return <UserPilotIcon className="w-6" />;
  if (roleName === ROLES.NAMES.COMMUNICATION_MANAGER)
    return <UserHeadsetIcon className="w-6" />;
  if (roleName === ROLES.NAMES.SCRIBE) return <UserPenIcon className="w-8" />;
};

const EnrollmentRow = ({ enrollment: { id, account }, onDelete }) => {
  const { trigger: triggerDelete } = useHttpQuery({
    url: `/role_enrollments/${id}`,
    method: 'DELETE',
    trigger: true,
    onSuccess: () => onDelete(),
  });
  return (
    <li onClick={() => {}} className="flex justify-between p-4">
      <div className="flex items-center justify-between w-full">
        <h4 className="flex items-center mr-4 text-sm text-gray-900 font-semibold">
          {account.display_name}
        </h4>
        <IconButton name="remove_enrollment">
          <UserMinusIcon className="w-5 fill-red-500" onClick={triggerDelete} />
        </IconButton>
      </div>
    </li>
  );
};

const EnrollmentsEmptyState = ({
  roleName,
  addingNewEnrollment,
  onAccountSelect,
  enrollments,
}) => {
  if (roleName === ROLES.NAMES.SCRIBE)
    return (
      <div className="p-4 text-gray-400 bg-gray-200">
        No enrollments for scribe role
      </div>
    );
  if (addingNewEnrollment)
    return (
      <NewEnrollmentForm
        onAccountSelect={onAccountSelect}
        enrollments={enrollments}
      />
    );
  return <div className="p-4 text-gray-600">No members enrolled yet</div>;
};

const EnrollmentsList = ({
  enrollments,
  addingNewEnrollment,
  onRowDelete,
  onAccountSelect,
}) => {
  const rows = [
    ...enrollments.map((enrollment) => (
      <EnrollmentRow
        key={enrollment.id}
        enrollment={enrollment}
        onDelete={onRowDelete}
      />
    )),
    addingNewEnrollment && (
      <NewEnrollmentForm
        onAccountSelect={onAccountSelect}
        enrollments={enrollments}
      />
    ),
  ].filter(Boolean);

  return intersperse(rows, <hr />);
};

const RoleDescription = ({ name }) => {
  switch (name) {
    case 'incident_manager':
      return (
        <>
          <Text className="mb-2">
            Incident managers lead the incident response. They act as the single
            source of truth of what is currently happening and what is going to
            happen.
          </Text>
          <Text className="mb-1">Their responsabilities are to:</Text>
          <ul className="flex flex-col gap-1 list-disc pl-4">
            <li>
              make sure the people knowledgeable about the incident are in the
              war room
            </li>
            <li>
              synchronize everybody by regularily summarizing what we know about
              the situation and asking for updates from people performing
              actions
            </li>
            <li>ultimately decide what is done and in which order</li>
          </ul>
        </>
      );
    case 'communication_manager':
      return (
        <Text className="mb-2">
          Communication managers are the link between the war room and the
          users. They provide the support team with info on the status of the
          incident. They also funnel users feedback to the war room to help
          drive the resolution.
        </Text>
      );
    case 'scribe':
      return (
        <>
          <Text className="mb-2">
            Scribes are participants that log everything that is said or done
            during the incident. The material they log is essential for the
            writing of the postmortem that happens once the incident is closed.
            <br />
            As soon as a participant assume the scribe role, they must stop
            interacting with the war room and entirely focus on re-transcribing.
          </Text>
          <Text>
            No enrollment is needed for the scribe role. Anybody can be assume
            the role when an incident is ongoing.
          </Text>
        </>
      );
  }
};

const Roles = () => {
  const { name } = useParams();
  const [addingNewEnrollment, setAddingNewEnrollment] = useState(false);

  const {
    data: { role_enrollments } = {},
    loading: fetchLoading,
    success: fetchSuccess,
    error: fetchError,
    trigger: triggerFetch,
  } = useHttpQuery({ url: `/roles/${name}/enrollments`, trigger: true });

  const { trigger: triggerPost } = useHttpQuery({
    url: `/roles/${name}/enrollments`,
    method: 'POST',
    trigger: true,
    onSuccess: () => triggerFetch(),
  });

  useEffect(() => {
    triggerFetch();
  }, []);

  const hasMembersEnrolled = role_enrollments?.length > 0;

  const onAccountSelect = ({ value }) => {
    triggerPost({ body: { enrollment: { account_id: value } } });
  };

  return (
    <FullView className="py-6 px-4 md:px-32">
      <div className="flex items-center mb-12">
        <h2 className="font-semibold text-3xl mr-3">
          Roles - {ROLES.DISPLAY_NAMES[name.toUpperCase()]}
        </h2>
        <RoleIcon roleName={name} />
      </div>
      <Card className="px-8 py-4">
        <div className="mb-8">
          <Text uiStyle="title" className="mb-4">
            Mission
          </Text>
          <RoleDescription name={name} />
        </div>
        <div className="flex items-center mb-4">
          <Text uiStyle="title" className="mr-4">
            Enrolled members
          </Text>
          {name !== ROLES.NAMES.SCRIBE && (
            <IconButton
              name="add_enrollment"
              onClick={() => setAddingNewEnrollment(!addingNewEnrollment)}
            >
              <UserPlusIcon className="w-5 fill-blue-500" />
            </IconButton>
          )}
        </div>
        {fetchLoading && <Loader />}
        {fetchError && <div>Something went wrong</div>}
        {fetchSuccess && (
          <ul className="border rounded">
            {!hasMembersEnrolled && (
              <EnrollmentsEmptyState
                roleName={name}
                addingNewEnrollment={addingNewEnrollment}
                onAccountSelect={onAccountSelect}
                enrollments={role_enrollments}
              />
            )}
            {hasMembersEnrolled && (
              <EnrollmentsList
                addingNewEnrollment={addingNewEnrollment}
                enrollments={role_enrollments}
                onRowDelete={() => triggerFetch()}
                onAccountSelect={onAccountSelect}
              />
            )}
          </ul>
        )}
      </Card>
    </FullView>
  );
};

export default Roles;
