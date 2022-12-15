import { useState } from 'react';
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

const TODO_TYPE_POSTMORTEM = 'postmortem';
const TODO_TYPE_NEXT_STEP_ACTION = 'next_step_action';

const TodoItem = ({ todo: { type, action_name, completed_at } }) => {
  const [done, setDone] = useState(Boolean(completed_at));

  if (type === TODO_TYPE_POSTMORTEM) {
    return (
      <div className="flex items-center gap-3 py-1 px-3">
        <Checkbox disabled />
        <Text>Publish the postmortem</Text>
      </div>
    );
  }
  if (type === TODO_TYPE_NEXT_STEP_ACTION) {
    return (
      <div className="flex items-center gap-3 p-2">
        <Checkbox
          value={done}
          onChange={() => {
            setDone((state) => {
              return !state;
            });
          }}
        />
        <Text
          className={classnames({ 'line-through': done })}
          color={done ? 'text-gray-500' : null}
        >
          Action: {action_name}
        </Text>
      </div>
    );
  }
  return null;
};

const TodoList = () => {
  const {
    data: { todos } = {},
    loading: fetchLoading,
    error: fetchError,
    success: fetchSuccess,
    refresh: fetchRefresh,
  } = useHttpQuery({ url: '/todos' });

  if (fetchLoading) return <BlockLoader />;
  if (fetchError)
    return (
      <Alert className="mb-8" color="error">
        Something went wrong loading the tasks
      </Alert>
    );
  if (fetchSuccess)
    return (
      <Card className="flex flex-col px-8 py-4 mb-12">
        {intersperse(
          Object.entries(todos).map(([incidentId, incidentTodos]) => (
            <Accordion key={incidentId} defaultOpen>
              <AccordionHeader className="text-left">{`Crisis #${incidentId}: ${incidentTodos[0].incident_name}`}</AccordionHeader>
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
          )),
          <div className="py-2" />,
        )}
      </Card>
    );
};

export default TodoList;
