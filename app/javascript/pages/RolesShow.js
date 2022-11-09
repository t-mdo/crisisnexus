import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import intersperse from 'modules/helpers/intersperse';
import { ROLES } from 'modules/constants';
import IconButton from 'components/IconButton';
import Loader from 'components/Loader';
import Card from 'components/Card';
import FullView from 'components/FullView';
import UserPilotIcon from 'images/icons/regular/user-pilot.svg';
import UserHeadsetIcon from 'images/icons/regular/user-headset.svg';
import UserPenIcon from 'images/icons/regular/user-pen.svg';
import ChevronRightIcon from 'images/icons/regular/chevron-right.svg';
import UserMinusIcon from 'images/icons/regular/user-minus.svg';
import UserPlusIcon from 'images/icons/regular/user-plus.svg';
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
          {account.email}
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
        <Link className="flex items-center mb-16 text-violet-600 flex justify-end">
          Learn more about the{' '}
          {ROLES.DISPLAY_NAMES[name.toUpperCase()].toLowerCase()} role
          <ChevronRightIcon className="w-3 ml-2 fill-violet-600" />
        </Link>
        <div className="flex items-center mb-4">
          <h3 className="font-semibold text-xl mr-4">Enrolled members</h3>
          <IconButton
            name="add_enrollment"
            onClick={() => setAddingNewEnrollment(!addingNewEnrollment)}
          >
            <UserPlusIcon className="w-5 fill-blue-500" />
          </IconButton>
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
