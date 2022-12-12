import { useOutletContext } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { LinkButton } from 'components/LinkButton';
import Card from 'components/Card';
import { Loader, BlockLoader } from 'components/Loader';
import PostmortemForm from 'pages/incidents/PostmortemEdit/PostmortemForm';
import NextStepActionsForm from 'pages/incidents/PostmortemEdit/NextStepActionsForm';

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

  const { data: { postmortem } = {}, loading: fetchPostmortemLoading } =
    useHttpQuery({
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

  return (
    <div id="form-body" className="py-6 px-4 md:px-32 overflow-y-auto">
      <LinkButton
        className="mb-4"
        direction="back"
        to={`/incidents/${incident.local_id}`}
      >
        Back to incident
      </LinkButton>
      <h2 className="mb-4 font-semibold text-2xl">Postmortem edition</h2>
      <Card className="p-4">
        {fetchPostmortemLoading ? (
          <BlockLoader />
        ) : (
          <div>
            <div className="flex justify-end mb-4">
              <UpdateStatus
                wording="Postmortem"
                loading={putPostmortemLoading}
                success={putPostmortemSuccess}
              />
            </div>
            <PostmortemForm
              triggerPut={triggerPutPostmortem}
              defaultValues={postmortem}
            />
            <div className="flex justify-end mt-4">
              <UpdateStatus
                wording="Postmortem"
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
