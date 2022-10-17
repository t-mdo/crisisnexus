import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import {
  Modal,
  ModalPanel,
  ModalTitle,
  ModalDescription,
} from 'components/Modal';
import { Input, TextArea } from 'components/form/Input';
import Label from 'components/form/Label';
import Button from 'components/Button';

const TriggerCrisisModal = () => {
  const {
    loading,
    error,
    trigger: triggerPostIncidents,
  } = useHttpQuery({
    url: '/incidents',
    method: 'POST',
    trigger: true,
  });

  const {
    register,
    handleSubmit,
    formState: { error: formError },
  } = useForm();

  const onSubmit = (data) => {
    const payload = { incident: data };
    triggerPostIncidents({ body: payload });
  };

  return (
    <Modal open={true} onClose={() => {}}>
      <ModalPanel className="w-full">
        <ModalTitle>Trigger an incident</ModalTitle>
        <ModalDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>What's happening?</Label>
            <Input
              {...register('name', { required: true })}
              type="text"
              className="w-3/4 mb-6"
              placeholder="Short description (Blank page, 500 errors, blank pages, etc.)"
            />
            <Label>Summary (optional)</Label>
            <TextArea
              {...register('summary')}
              type="text"
              className="w-full h-32 mb-12"
              placeholder="Longer summary to describe the incident in details"
            />
            <div className="w-full flex justify-end">
              <Button role="submit">Godspeed!</Button>
            </div>
          </form>
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

export default TriggerCrisisModal;
