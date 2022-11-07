import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import FullView from 'components/FullView';
import Card from 'components/Card';
import { Input } from 'components/form/Input';
import { Button } from 'components/Button';
import Loader from 'components/Loader';
import { List, ListRow } from 'components/list/List';

const ScribedMinutes = ({ loading, minutes }) => {
  const listRef = useRef();

  useEffect(() => {
    if (!listRef.current) return;

    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [minutes]);

  if (loading && !minutes) return <Loader />;
  if (minutes)
    return (
      <List ref={listRef} className="border rounded">
        {minutes.map((minute, i) => (
          <ListRow key={i} className="flex items-center px-3 py-2 w-full">
            <div className="w-1/6">{minute.who}</div>
            <div className="w-4/6">{minute.what}</div>
            <div className="w-1/6 text-sm text-right text-gray-400">
              {dayjs(minute.created_at).format('HH:mm:ss')}
            </div>
          </ListRow>
        ))}
      </List>
    );
};

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
    <FullView className="flex flex-col py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-3xl">
        #CRISIS-{incidentId} Minutes
      </h2>
      <Card className="flex flex-col justify-between px-8 py-6 h-full overflow-hidden">
        <div className="flex flex-col overflow-y-auto">
          <div className="flex w-full px-3">
            <span className="w-1/6 font-medium">Who</span>
            <span className="w-4/6 font-medium">What</span>
            <span className="w-1/6 font-medium text-right">When</span>
          </div>
          <ScribedMinutes loading={loadingFetch} minutes={minutes} />
        </div>
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
    </FullView>
  );
};

export default MinutesForm;
