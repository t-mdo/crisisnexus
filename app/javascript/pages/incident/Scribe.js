import { useContext } from 'react';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import FullView from 'components/FullView';
import Card from 'components/Card';
import { Input } from 'components/form/Input';
import { Button } from 'components/Button';

const NotesScribed = () => {};

const IncidentScribe = () => {
  const { incident } = useContext(OpenIncidentContext);

  return (
    <FullView className="py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-3xl">Incident scribe</h2>
      <Card className="px-8 py-6">
        <h3 className="text-xl">Notes scribed</h3>
        <NotesScribed incident={incident} />
        <form className="flex">
          <Input className="w-5/6 rounded-r-none" />
          <Button className="w-1/6 rounded-l-none min-w-fit">Submit</Button>
        </form>
      </Card>
    </FullView>
  );
};

export default IncidentScribe;
