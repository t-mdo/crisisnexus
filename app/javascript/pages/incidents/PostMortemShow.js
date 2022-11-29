import dayjs from 'dayjs';
import { useOutletContext } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Button from 'components/Button';
import { BlockLoader } from 'components/Loader';

const LabelAndField = ({ label, field }) => {
  if (!field) return null;

  return (
    <>
      <div className="text font-semibold text-gray-500 mb-2">{label}</div>
      <div className="mb-4 px-4 py-2 bg-white border rounded overflow-y-auto">
        {field}
      </div>
    </>
  );
};

const PostMortemShow = () => {
  const { incident } = useOutletContext();

  const {
    data: {
      postmortem: {
        summary,
        impact_who,
        impact_what,
        incident_impact_started_at,
        incident_impact_ended_at,
        timeline_text,
        lucky_text,
        unlucky_text,
        five_whys_text,
        next_step_actions,
      } = {},
    } = {},
    loading: fetchLoading,
  } = useHttpQuery({
    url: `incidents/${incident.local_id}/postmortem`,
  });

  return (
    <div
      id="form-body"
      className="py-6 px-4 md:px-32 overflow-y-auto whitespace-pre"
    >
      <div className="mb-4 flex justify-between">
        <h2 className="font-semibold text-2xl">Postmortem</h2>
        <Button href={`edit`}>Edit</Button>
      </div>
      <div>
        {fetchLoading ? (
          <BlockLoader />
        ) : (
          <>
            <div className="mb-16">
              <LabelAndField label="One sentence summary" field={summary} />
              <LabelAndField
                label="Who was impacted, and how many of them were?"
                field={impact_who}
              />
              <LabelAndField label="What was the impact?" field={impact_what} />
              {incident_impact_started_at && incident_impact_ended_at && (
                <>
                  <div className="text font-semibold text-gray-500 mb-2">
                    When did the incident start and end *for impacted users*
                  </div>
                  <div className="mb-4 flex items-center">
                    <span className="mr-1 text-gray-400 font-medium">
                      Start:
                    </span>
                    <div className="mr-4 px-2 py-2 bg-white border rounded w-fit">
                      {dayjs(incident_impact_started_at).format(
                        'YYYY-MM-DD HH:mm',
                      )}
                    </div>
                    <span className="mr-1 text-gray-400 font-medium">End:</span>
                    <div className="px-2 py-2 bg-white border rounded w-fit">
                      {dayjs(incident_impact_ended_at).format(
                        'YYYY-MM-DD HH:mm',
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="mb-16">
              <LabelAndField label="Timeline" field={timeline_text} />
              <LabelAndField label="Where we got lucky" field={lucky_text} />
              <LabelAndField
                label="Where we got unlucky"
                field={unlucky_text}
              />
              <LabelAndField
                label="Five whys analysis"
                field={five_whys_text}
              />
            </div>
            {next_step_actions && next_step_actions.length > 0 && (
              <div className="mb-16">
                <div className="text font-semibold text-gray-500 mb-2">
                  Next step actions
                </div>
                {next_step_actions.map((action, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <div className="px-4 py-2 bg-white border rounded overflow-y-auto">
                      <span className="mr-2">{index + 1}.</span>
                      {action.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostMortemShow;
