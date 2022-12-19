import { useOutletContext } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Button from 'components/Button';
import { BlockLoader } from 'components/Loader';
import Card from 'components/Card';
import PostmortemForm from 'pages/incidents/postmortemEdit/PostmortemForm';
import NextStepActionsForm from 'pages/incidents/postmortemEdit/NextStepActionsForm';

const PostmortemShow = () => {
  const { incident } = useOutletContext();

  const { data: { postmortem } = {}, loading: fetchLoading } = useHttpQuery({
    url: `/postmortems/${incident.postmortem.id}`,
  });

  const { data: { next_step_actions } = {}, loading: fetchActionsLoading } =
    useHttpQuery({
      url: `/postmortems/${incident.postmortem.id}/next_step_actions`,
    });

  return (
    <div
      id="form-body"
      className="py-6 px-4 md:px-32 overflow-y-auto whitespace-pre"
    >
      <Card className="p-8">
        <div className="mb-4 flex justify-between">
          <h2 className="font-semibold text-2xl">Postmortem</h2>
          <Button href={`edit`}>Edit</Button>
        </div>
        <div>
          {fetchLoading || fetchActionsLoading ? (
            <BlockLoader />
          ) : (
            <div className="flex flex-col gap-y-16">
              <PostmortemForm defaultValues={postmortem} disabled />
              <NextStepActionsForm defaultValues={next_step_actions} disabled />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostmortemShow;
