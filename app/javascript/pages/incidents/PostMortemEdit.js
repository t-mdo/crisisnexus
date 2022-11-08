import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { Input, TextArea } from 'components/form/Input';
import { Label } from 'components/form/Label';
import { Button } from 'components/Button';
import range from 'lodash/range';
import Card from 'components/Card';

const PostMortemEdit = () => {
  const { incident } = useOutletContext();

  const { register, handleSubmit, setFocus, watch } = useForm();

  const { success, trigger: triggerPost } = useHttpQuery({
    url: `/api/incidents/${incident.local_id}/postmortem`,
    method: 'PUT',
    trigger: true,
  });

  const [nextStepActionsFieldIndex, setNextStepActionsFieldIndex] = useState(1);

  const newestNSAField = watch(
    `next_step_actions.${nextStepActionsFieldIndex}.name`,
  );
  useEffect(() => {
    if (newestNSAField) {
      setNextStepActionsFieldIndex(nextStepActionsFieldIndex + 1);
    }
  }, [newestNSAField]);

  const previousNSAField =
    nextStepActionsFieldIndex > 0 &&
    watch(`next_step_actions.${nextStepActionsFieldIndex - 1}.name`);
  useEffect(() => {
    if (previousNSAField === false || previousNSAField) return;

    setNextStepActionsFieldIndex(nextStepActionsFieldIndex - 1);
  }, [previousNSAField]);

  const onSubmit = (postmortem) => {
    triggerPost({ body: { postmortem } });
  };

  return (
    <div className="py-6 px-4 md:px-32 overflow-y-auto">
      <h2 className="mb-4 font-semibold text-2xl">Post-mortem edition</h2>
      <Card className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-16">
            <Label>One sentence summary</Label>
            <Input
              placeholder="One sentence anybody at the company can understand"
              className="w-full mb-4"
              {...register('summary')}
            />
            <Label>Who was impacted, and how many of them were?</Label>
            <Input
              placeholder="5 employees, 500 partners, 50k users, etc."
              className="w-2/3 mb-4"
              {...register('impact_who')}
            />
            <Label>What was the impact?</Label>
            <Input
              placeholder="Blank page, couldn't open their documents, create an event, etc."
              className="w-5/6 mb-4"
              {...register('impact_what')}
            />
            <Label>
              When did the incident start and end *for impacted users*?
            </Label>
            <div className="flex">
              <Input
                type="datetime-local"
                className="mr-2"
                {...register('incident_impact_started_at')}
              />
              <Input
                type="datetime-local"
                {...register('incident_impact_ended_at')}
              />
            </div>
          </div>
          <div className="mb-16">
            <Label subtitle="From the moment the incident appeared to its resolution">
              Timeline in details
            </Label>
            <TextArea
              className="w-full mb-4"
              rows="8"
              placeholder="12/24 09:00: Jean-Claude tripped on a wire and the server went down.&#10;12/24 09:30: Jean-Claude fixed the wire and the server came back up."
              {...register('timeline_text')}
            />
            <Label subtitle="What prevented a worse outcome">
              Where we got lucky
            </Label>
            <TextArea
              className="w-full mb-4"
              rows="2"
              placeholder="The n+1 query could have down the whole database but it only affected the creation of documents."
              {...register('lucky_text')}
            />
            <Label subtitle="What made the outcome worst than it could have been">
              Where we got unlucky
            </Label>
            <TextArea
              className="w-full mb-4"
              rows="2"
              placeholder="The master branch was broken and we had to fix it before deploying the fix."
              {...register('unlucky_text')}
            />
            <div className="flex justify-between">
              <Label className="mb-0">Five whys</Label>
              <a
                className="text-blue-700"
                href="https://en.wikipedia.org/wiki/Five_whys"
                target="_blank"
              >
                ?
              </a>
            </div>
            <TextArea
              className="w-full"
              rows="10"
              placeholder="1. Why did users got an error when creating a document?&#10;1.1. Because an exception was raised in the backend on document creation. Why?&#10;1.2. Because we shipped a new feature that didn’t work well with document creation. Why?&#10;1.3. Because we didn’t know this feature existed, and our tests suites didn’t warn us that we broke it. Why?&#10;1.4 Because we have no tests on the document creation feature.&#10;Outcome -> We need to add tests for that feature in our tests suite.&#10;&#10;2. Why did the error stayed on production for one full day.&#10;2.1 Because we didn’t know about the problem until a customer called our CEO. Why?&#10;2.2 Because we don’t have any monitoring on that feature. Why?&#10;…"
              {...register('five_whys_text')}
            />
          </div>
          <div className="mb-16">
            <Label>Next step actions</Label>
            {range(nextStepActionsFieldIndex + 1).map((index) => (
              <div key={index} className="flex items-center mb-4">
                <span className="mr-2">{index + 1}.</span>
                <Input
                  className="w-1/2"
                  placeholder="Action name"
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault();
                    setFocus(`next_step_actions.${index + 1}.name`);
                  }}
                  {...register(`next_step_actions.${index}.name`)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button role="submit">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PostMortemEdit;
