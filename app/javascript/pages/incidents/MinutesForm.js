import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Card from 'components/Card';
import { Input } from 'components/form/Input';
import { Button } from 'components/Button';
import {
  ScribedMinutesContainer,
  ScribedMinutes,
} from './minutes/ScribedMinutes';

const MinutesForm = () => {
  const { id: incidentId } = useParams();

  const { register, handleSubmit, resetField, setFocus } = useForm();

  const [minutes, setMinutes] = useState();

  const { trigger: triggerFetch, loading: loadingFetch } = useHttpQuery({
    url: `incidents/${incidentId}/minutes`,
    trigger: true,
    onSuccess: ({ data: { minutes } = {} }) => {
      setMinutes(minutes);
    },
  });

  useEffect(() => {
    setFocus('who');
    triggerFetch();
  }, []);

  const { trigger: triggerPost } = useHttpQuery({
    url: `/incidents/${incidentId}/minutes`,
    method: 'POST',
    trigger: true,
    onSuccess: () => {
      triggerFetch();
      resetField('what');
    },
  });

  const onSubmit = ({ who, what }) => {
    setFocus('what');
    triggerPost({ body: { minute: { who, what } } });
  };

  return (
    <div className="flex flex-col h-full overflow-y-hidden py-6 px-4 md:px-32">
      <h3 className="mb-4 font-semibold text-2xl">Minutes</h3>
      <Card className="flex flex-col justify-between px-8 py-6 h-full overflow-hidden">
        <ScribedMinutesContainer>
          <ScribedMinutes loading={loadingFetch} minutes={minutes} />
        </ScribedMinutesContainer>
        <div>
          <form className="flex mt-6 mb-1" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="who"
              className="w-1/6 rounded-r-none"
              placeholder="Who"
              onFocus={({ target }) => target.select()}
              {...register('who', {
                required: 'Who is required',
                keepDirty: true,
              })}
            />
            <Input
              name="what"
              className="w-4/6 rounded-none"
              placeholder="Said or Did What"
              onKeyDown={(e) => {
                if (e.key !== 'Tab') return;
                e.preventDefault();
                setFocus('who');
              }}
              {...register('what', { required: 'What is required' })}
            />
            <Button className="w-1/6 rounded-l-none min-w-fit">Submit</Button>
          </form>
          <p className="text-xs text-gray-400">
            Pro tip: use tab to go back and forth between fields and enter to
            submit
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MinutesForm;
