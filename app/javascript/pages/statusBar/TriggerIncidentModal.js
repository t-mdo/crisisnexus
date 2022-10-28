import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import { OpenIncidentContext } from 'modules/contexts/openIncidentContext';
import {
  Modal,
  ModalPanel,
  ModalTitle,
  ModalDescription,
} from 'components/Modal';
import { Input, TextArea } from 'components/form/Input';
import Label from 'components/form/Label';
import ErrorFeedback from 'components/form/ErrorFeedback';
import Button from 'components/Button';

const TriggerIncidentModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const { setOpenIncident } = useContext(OpenIncidentContext);
  const {
    loading,
    data: postResponse,
    error: postError,
    trigger: triggerPostIncidents,
  } = useHttpQuery({
    url: '/incidents',
    method: 'POST',
    trigger: true,
    onSuccess: ({ data: { incident } }) => {
      setOpenIncident(incident);
      resetForm();
      onClose();
      navigate('/');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset: resetForm,
  } = useForm();

  const onSubmit = (data) => {
    const payload = { incident: data };
    triggerPostIncidents({ body: payload });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalPanel className="w-full">
        <ModalTitle onClose={onClose}>Trigger an incident</ModalTitle>
        <ModalDescription>
          <ErrorFeedback
            formErrors={Object.values(formErrors).map((error) => error.message)}
            queryErrors={postError && postResponse.errors}
          />
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

export default TriggerIncidentModal;
