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
import intersperse from 'modules/helpers/intersperse';

const TODO_TYPE_POSTMORTEM = 'postmortem';
const TODO_TYPE_NEXT_STEP_ACTION = 'next_step_action';

const TodoItem = ({ todo: { type, action_name } }) => {
  if (type === TODO_TYPE_POSTMORTEM) {
    return <Text>Publish the postmortem</Text>;
  }
  if (type === TODO_TYPE_NEXT_STEP_ACTION) {
    return <Text>Action: {action_name}</Text>;
  }
  return null;
};

const TodoList = () => {
  const {
    data: { todos } = {},
    loading: fetchLoading,
    error: fetchError,
    success: fetchSuccess,
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
              <AccordionHeader>{`Crisis #${incidentId}: ${incidentTodos[0].incident_name}`}</AccordionHeader>
              <AccordionBody>
                {incidentTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
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
