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
import { Alert, ALERT_TYPE_ERROR } from 'components/Alert';

const TriggerCrisisModal = ({ open, onClose }) => {
  const {
    loading,
    error: postError,
    trigger: triggerPostIncidents,
  } = useHttpQuery({
    url: '/incidents',
    method: 'POST',
    trigger: true,
    onSuccess: () => onClose(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const formHasErrors = Object.keys(formErrors).length > 0;

  const onSubmit = (data) => {
    const payload = { incident: data };
    triggerPostIncidents({ body: payload });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalPanel className="w-full">
        <ModalTitle onClose={onClose}>Trigger an incident</ModalTitle>
        <ModalDescription>
          {(formHasErrors || postError) && (
            <Alert className="mb-4" type={ALERT_TYPE_ERROR}>
              <ul>
                {Object.entries(formErrors).map(([key, { message }]) => (
                  <li key={key}>{message}</li>
                ))}
                {postError && <li>{postError}</li>}
              </ul>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>What's happening?</Label>
            <Input
              {...register('name', {
                required: 'A short description is required',
              })}
              type="text"
              className="w-3/4 mb-6"
              placeholder="Short description (Blank page, 500 errors, blank pages, etc.)"
              aria-required="true"
              aria-invalid={formErrors?.name ? 'true' : 'false'}
            />
            <Label>Summary (optional)</Label>
            <TextArea
              {...register('summary')}
              type="text"
              className="w-full h-32 mb-12"
              placeholder="Longer summary to describe the incident in details"
            />
            <div className="w-full flex justify-end">
              <Button loading={loading} role="submit">
                Godspeed!
              </Button>
            </div>
          </form>
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

export default TriggerCrisisModal;
