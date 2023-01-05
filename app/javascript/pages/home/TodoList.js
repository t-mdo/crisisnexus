import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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

const LinkToPostmortem = ({ children, type, incident_local_id }) => {
  const editHrefSuffix = type === TODO_TYPE_POSTMORTEM ? '/edit' : '';

  return (
    <Link
      className="group w-full flex justify-between items-center py-2 px-2 hover:bg-slate-300 active:bg-slate-400 rounded transition"
      to={`/incidents/${incident_local_id}/postmortem${editHrefSuffix}`}
    >
      {children}
    </Link>
  );
};

const TodoItem = ({
  todo: { id, type, action_name, completed_at, incident_local_id, due_at },
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

  if (type === TODO_TYPE_POSTMORTEM)
    return (
      <div className="flex items-center gap-3">
        <Checkbox disabled />
        <LinkToPostmortem type={type} incident_local_id={incident_local_id}>
          <Text>Publish the postmortem</Text>
          <div className="hidden group-hover:block">
            <ArrowRightIcon className="w-5 h-5 fill-slate-600" />
          </div>
        </LinkToPostmortem>
      </div>
    );

  const isOverdue = dayjs(due_at).isBefore(dayjs());
  const textColor =
    classnames({
      'text-red-600': !done && isOverdue,
      'text-slate-400': done,
    }) || null;
  if (type === TODO_TYPE_NEXT_STEP_ACTION)
    return (
      <div className="w-full flex gap-x-1 items-center">
        <Checkbox checked={done} onChange={onCheckboxTick} />
        <LinkToPostmortem type={type} incident_local_id={incident_local_id}>
          <Text
            className={classnames({ 'line-through': done })}
            color={textColor}
          >
            Action: {action_name}
          </Text>
          <div className="hidden group-hover:block">
            <ArrowRightIcon className="w-5 h-5 fill-slate-600" />
          </div>
        </LinkToPostmortem>
      </div>
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
  if (todos && Object.entries(todos).length === 0)
    return (
      <Card className="flex justify-center p-4">
        <span className="text-gray-400">
          No next step for you at the moment!
        </span>
      </Card>
    );
  return (
    <Card className="flex flex-col py-8 px-8">
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
