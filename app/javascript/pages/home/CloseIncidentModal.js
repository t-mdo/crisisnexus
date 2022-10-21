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
import Button from 'components/Button';
import { Alert, ALERT_TYPE_ERROR } from 'components/Alert';

const CloseIncidentModal = ({ open, onClose }) => {
  const { openIncident } = useContext(OpenIncidentContext);

  const {
    loading,
    data: patchResponse,
    error: patchError,
    trigger: triggerIncidentPatch,
  } = useHttpQuery({
    url: `/incidents/${openIncident.local_id}`,
    body: { status: 'closed' },
    method: 'PATCH',
    trigger: true,
    onSuccess: () => {
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
  const formHasErrors = Object.keys(formErrors).length > 0;

  const onSubmit = () => {
    triggerIncidentPatch();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalPanel className="w-full">
        <ModalTitle onClose={onClose}>Close the incident</ModalTitle>
        <ModalDescription>
          {(formHasErrors || patchError) && (
            <Alert className="mb-4" type={ALERT_TYPE_ERROR}>
              <ul>
                {formHasErrors &&
                  Object.entries(formErrors).map(([key, { message }]) => (
                    <li key={key}>{message}</li>
                  ))}
                {patchError &&
                  patchResponse.errors.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
              </ul>
            </Alert>
          )}
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
