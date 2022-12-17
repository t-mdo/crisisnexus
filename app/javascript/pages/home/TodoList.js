import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { BlockLoader } from 'components/Loader';
import Text from 'components/Text';
import Alert from 'components/Alert';
import Card from 'components/Card';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from 'components/Accordion';
import { Checkbox } from 'components/Checkbox';
import intersperse from 'modules/helpers/intersperse';
import ArrowRightIcon from 'icons/regular/arrow-right.svg';

const TODO_TYPE_POSTMORTEM = 'postmortem';
const TODO_TYPE_NEXT_STEP_ACTION = 'next_step_action';

const TodoItem = ({
  todo: { id, type, action_name, completed_at, incident_local_id },
  fetchRefresh,
}) => {
  const [done, setDone] = useState(Boolean(completed_at));
  const { trigger: triggerCompletePut } = useHttpQuery({
    url: `/todos/${id}`,
    method: 'PUT',
    onSuccess: () => fetchRefresh(),
    trigger: true,
  });

  const onCheckboxTick = () => {
    setDone((state) => {
      return !state;
    });
    triggerCompletePut();
  };

  const editHrefSuffix = type === TODO_TYPE_POSTMORTEM ? '/edit' : '';

  return (
    <Link
      className="group w-full flex justify-between items-center py-2 px-3 hover:bg-stone-300 rounded transition"
      to={`/incidents/${incident_local_id}/postmortem${editHrefSuffix}`}
    >
      {type === TODO_TYPE_POSTMORTEM && (
        <div className="flex items-center gap-3">
          <Checkbox disabled />
          <Text>Publish the postmortem</Text>
        </div>
      )}
      {type === TODO_TYPE_NEXT_STEP_ACTION && (
        <>
          <div className="flex items-center gap-3">
            <Checkbox checked={done} onChange={onCheckboxTick} />
            <Text
              className={classnames({ 'line-through': done })}
              color={done ? 'text-gray-500' : null}
            >
              Action: {action_name}
            </Text>
          </div>
        </>
      )}
      <div className="hidden group-hover:block">
        <ArrowRightIcon className="w-5 h-5 fill-stone-600" />
      </div>
    </Link>
  );
};

const TodoList = () => {
  const {
    data: { todos } = {},
    loading: fetchLoading,
    error: fetchError,
    refresh: fetchRefresh,
  } = useHttpQuery({ url: '/todos' });

  const [initialFetchLoading, setInitialFetchLoading] = useState(fetchLoading);

  useEffect(() => {
    if (initialFetchLoading && !fetchLoading) setInitialFetchLoading(false);
  }, [fetchLoading]);

  if (initialFetchLoading) return <BlockLoader />;
  if (fetchError)
    return (
      <Alert className="mb-8" color="error">
        Something went wrong loading the tasks
      </Alert>
    );
  return (
    <Card className="flex flex-col px-8 py-4 mb-12">
      {intersperse(
        Object.entries(todos).map(([incidentId, incidentTodos]) => {
          const everyTodoDone = incidentTodos.every((todo) =>
            Boolean(todo.completed_at),
          );
          return (
            <Accordion key={incidentId} defaultOpen={!everyTodoDone}>
              <AccordionHeader className="text-left font-medium">{`Crisis #${incidentId} - ${incidentTodos[0].incident_name}`}</AccordionHeader>
              <AccordionBody>
                {incidentTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    fetchRefresh={fetchRefresh}
                  />
                ))}
              </AccordionBody>
            </Accordion>
          );
        }),
        <div className="py-2" />,
      )}
    </Card>
  );
};

export default TodoList;