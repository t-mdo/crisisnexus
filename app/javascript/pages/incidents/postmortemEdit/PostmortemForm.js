import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import useAutosave from 'modules/form/useAutosave';
import { Label } from 'components/form/Label';
import { Input, TextArea, DateInput } from 'components/form/Input';

const PostmortemForm = ({ triggerPut, defaultValues, enablePublishing }) => {
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      ...defaultValues,
      incident_impact_started_at: dayjs(
        defaultValues.incident_impact_started_at,
      ).format('YYYY-MM-DD HH:mm'),
      incident_impact_ended_at: dayjs(
        defaultValues.incident_impact_ended_at,
      ).format('YYYY-MM-DD HH:mm'),
    },
  });

  const onSubmit = (postmortem) => {
    triggerPut({
      body: {
        postmortem: {
          ...postmortem,
          incident_impact_started_at: dayjs(
            postmortem.incident_impact_started_at,
          ).format(),
          incident_impact_ended_at: dayjs(
            postmortem.incident_impact_ended_at,
          ).format(),
        },
      },
    });
  };

  useAutosave({
    onSubmit: handleSubmit(onSubmit),
    control,
  });

  const summary = watch('summary');
  useEffect(() => {
    if (summary) {
      enablePublishing();
    }
  }, [summary]);

  return (
    <form>
      <div className="flex justify-between"></div>
      <div className="mb-8">
        <Label htmlFor="summary">One sentence summary</Label>
        <Input
          placeholder="One sentence anybody at the company can understand"
          className="w-full mb-4"
          id="summary"
          {...register('summary')}
        />
        <Label htmlFor="impact_who">
          Who was impacted, and how many of them were?
        </Label>
        <Input
          placeholder="5 employees, 500 partners, 50k users, etc."
          className="w-2/3 mb-4"
          id="impact_who"
          {...register('impact_who')}
        />
        <Label htmlFor="summary">What was the impact?</Label>
        <Input
          placeholder="Blank page, couldn't open their documents, create an event, etc."
          className="w-5/6 mb-4"
          id="impact_what"
          {...register('impact_what')}
        />
        <Label>When did the incident start and end *for impacted users*?</Label>
        <div className="flex">
          <DateInput
            type="datetime-local"
            className="mr-2"
            id="incident_impact_started_at"
            placeholder="Start time"
            {...register('incident_impact_started_at')}
          />
          <DateInput
            type="datetime-local"
            id="incident_impact_ended_at"
            placeholder="End time"
            {...register('incident_impact_ended_at')}
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="timeline_text"
          subtitle="From the moment the incident appeared to its resolution"
        >
          Timeline in details
        </Label>
        <TextArea
          className="w-full mb-4"
          rows="8"
          placeholder="12/24 09:00: Jean-Claude tripped on a wire and the server went down.&#10;12/24 09:30: Jean-Claude fixed the wire and the server came back up."
          id="timeline_text"
          {...register('timeline_text')}
        />
        <Label htmlFor="lucky_text" subtitle="What prevented a worse outcome">
          Where we got lucky
        </Label>
        <TextArea
          className="w-full mb-4"
          rows="2"
          placeholder="The n+1 query could have down the whole database but it only affected the creation of documents."
          id="lucky_text"
          {...register('lucky_text')}
        />
        <Label
          htmlFor="unlucky_text"
          subtitle="What made the outcome worst than it could have been"
        >
          Where we got unlucky
        </Label>
        <TextArea
          className="w-full mb-4"
          rows="2"
          placeholder="The master branch was broken and we had to fix it before deploying the fix."
          id="unlucky_text"
          {...register('unlucky_text')}
        />
        <div className="flex justify-between">
          <Label htmlFor="five_whys_text">Five whys analysis</Label>
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
          id="five_whys_text"
          {...register('five_whys_text')}
        />
      </div>
    </form>
  );
};

export default PostmortemForm;
