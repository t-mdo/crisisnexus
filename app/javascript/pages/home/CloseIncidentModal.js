import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
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

const CloseIncidentModal = ({ open, onClose }) => {
  const { openIncident, setOpenIncident } = useContext(OpenIncidentContext);

  const {
    loading,
    data: patchResponse,
    error: patchError,
    trigger: triggerIncidentPatch,
  } = useHttpQuery({
    url: `/incidents/${openIncident.local_id}`,
    method: 'PATCH',
    trigger: true,
    onSuccess: () => {
      setOpenIncident(null);
      resetForm();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset: resetForm,
  } = useForm({
    defaultValues: {
      name: openIncident.name,
      summary: openIncident.summary,
    },
  });

  const onSubmit = (data) => {
    const body = { incident: { ...data, status: 'closed' } };
    triggerIncidentPatch({ body });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalPanel className="w-full">
        <ModalTitle onClose={onClose}>Close the incident</ModalTitle>
        <ModalDescription>
          <ErrorFeedback
            formErrors={Object.values(formErrors).map((error) => error.message)}
            queryErrors={patchError && patchResponse.errors}
          />
          <p className="mb-8 text-gray-500">
            Let's take time to review everything before closing
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Title</Label>
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
            <Label>Summary</Label>
            <TextArea
              {...register('summary')}
              type="text"
              className="w-full h-32 mb-12"
              placeholder="Longer summary to describe the incident in details"
            />
            <div className="w-full flex justify-end">
              <Button loading={loading} role="submit">
                Close the crisis
              </Button>
            </div>
          </form>
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

export default CloseIncidentModal;
