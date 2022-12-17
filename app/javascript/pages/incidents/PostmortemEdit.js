import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { LinkButton } from 'components/LinkButton';
import Card from 'components/Card';
import { Loader, BlockLoader } from 'components/Loader';
import { StatusBadge } from 'components/StatusBadge';
import { Button } from 'components/Button';
import Text from 'components/Text';
import PostmortemForm from 'pages/incidents/postmortemEdit/PostmortemForm';
import NextStepActionsForm from 'pages/incidents/postmortemEdit/NextStepActionsForm';
import FileLinesIcon from 'icons/regular/file-lines.svg';
import FileCheckIcon from 'icons/regular/file-check.svg';

const UpdateStatus = ({ loading, success, wording }) => {
  if (loading) {
    return <Loader />;
  }

  if (success) {
    return <div className="text-gray-400">{wording} saved</div>;
  }

  return <div className="invisible">Placeholder</div>;
};

const PostmortemEdit = () => {
  const { incident } = useOutletContext();

  const {
    data: { postmortem } = {},
    loading: fetchPostmortemLoading,
    refresh: refreshPostmortem,
  } = useHttpQuery({
    url: `/postmortems/${incident.postmortem.id}`,
  });

  const {
    loading: putPostmortemLoading,
    success: putPostmortemSuccess,
    trigger: triggerPutPostmortem,
  } = useHttpQuery({
    url: `/postmortems/${incident.postmortem.id}`,
    method: 'PUT',
    trigger: true,
  });

  const { trigger: triggerPutPostmortemStatus } = useHttpQuery({
    url: `/postmortems/${incident.postmortem.id}/status`,
    method: 'PUT',
    trigger: true,
    onSuccess: () => {
      refreshPostmortem();
    },
  });

  const {
    data: { next_step_actions } = {},
    loading: fetchNextStepActionsLoading,
  } = useHttpQuery({
    url: `/postmortems/${incident.postmortem.id}/next_step_actions`,
  });

  const {
    loading: queryActionsLoading,
    success: queryActionsSuccess,
    trigger: triggerQueryActions,
  } = useHttpQuery({ trigger: true });

  const [canPublish, setCanPublish] = useState(false);

  return (
    <div id="form-body" className="py-6 px-4 md:px-32 overflow-y-auto">
      <LinkButton
        className="mb-4"
        direction="back"
        to={`/incidents/${incident.local_id}`}
      >
        Back to incident
      </LinkButton>
      <Card className="p-4">
        {fetchPostmortemLoading ? (
          <BlockLoader />
        ) : (
          <div>
            <div className="mb-4 flex justify-between">
              <div className="flex items-center gap-x-4 gap-y-2">
                <Text uiStyle="heading-1">Postmortem</Text>
                <StatusBadge
                  color={postmortem.status === 'draft' ? 'info' : 'success'}
                  icon={
                    postmortem.status === 'draft'
                      ? FileLinesIcon
                      : FileCheckIcon
                  }
                >
                  {postmortem.status}
                </StatusBadge>
              </div>
              {postmortem.status === 'draft' && (
                <Button
                  onClick={() => {
                    triggerPutPostmortemStatus({
                      body: { status: 'published' },
                    });
                  }}
                  disabled={!canPublish}
                >
                  Publish
                </Button>
              )}
            </div>
            <div className="flex justify-end mb-4">
              <UpdateStatus
                wording="Changes"
                loading={putPostmortemLoading}
                success={putPostmortemSuccess}
              />
            </div>
            <PostmortemForm
              triggerPut={triggerPutPostmortem}
              defaultValues={postmortem}
              enablePublishing={() => setCanPublish(true)}
            />
            <div className="flex justify-end mt-4">
              <UpdateStatus
                wording="Changes"
                loading={putPostmortemLoading}
                success={putPostmortemSuccess}
              />
            </div>
          </div>
        )}
        <div className="mt-8">
          {fetchNextStepActionsLoading ? (
            <BlockLoader />
          ) : (
            <>
              <NextStepActionsForm
                defaultValues={next_step_actions}
                deleteQuery={({ id }) =>
                  triggerQueryActions({
                    url: `/postmortems/${incident.postmortem.id}/next_step_actions/${id}`,
                    method: 'DELETE',
                  })
                }
                postQuery={({ next_step_actions, onSuccess }) =>
                  triggerQueryActions({
                    url: `/postmortems/${incident.postmortem.id}/next_step_actions`,
                    method: 'POST',
                    body: { next_step_actions },
                    onSuccess,
                  })
                }
              />
              <div className="flex justify-end mt-4">
                <UpdateStatus
                  wording="Actions"
                  loading={queryActionsLoading}
                  success={queryActionsSuccess}
                />
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostmortemEdit;
