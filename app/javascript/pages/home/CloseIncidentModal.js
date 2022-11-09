import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import { AutocompletedInput } from 'components/form/AutocompletedInput';
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

const IncidentUpdateForm = ({
  closureFormData,
  setClosureFormData,
  goToNextStep,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: closureFormData.incident,
  });

  const onSubmit = (incident) => {
    setClosureFormData((data) => ({ ...data, incident }));
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorFeedback
        formErrors={Object.values(formErrors).map((error) => error.message)}
        className="mb-4"
      />
      <p className="mb-4 text-sm text-gray-400">
        Let's take time to review everything before closing
      </p>
      <Label>Title</Label>
      <Input
        {...register('name', {
          required: 'A short description is required',
        })}
        type="text"
        className="w-3/4 mb-4"
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
      <div className="flex justify-end w-full">
        <Button role="submit">Next step</Button>
      </div>
    </form>
  );
};

const PostmortemForm = ({
  closureFormData,
  setClosureFormData,
  closeIncident,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm({ defaultValues: closureFormData.postmortem });

  const { data: { accounts } = {}, trigger: triggerFetch } = useHttpQuery({
    url: '/accounts',
    trigger: true,
  });

  const assignedTo = watch('assigned_to');
  useEffect(() => {
    const params = assignedTo ? { q: assignedTo, limit: 4 } : {};
    triggerFetch({ params });
  }, [assignedTo]);

  const onSubmit = (postmortem) => {
    setClosureFormData((data) => ({ ...data, postmortem }));
    closeIncident();
  };

  const autocompleteOptions =
    accounts?.map((account) => ({
      display: account.email,
      value: account.id,
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <ErrorFeedback
          formErrors={Object.values(formErrors).map((error) => error.message)}
          className="mb-4"
        />
        <Label>Who's owning the postmortem?</Label>
        <AutocompletedInput
          options={autocompleteOptions}
          onSelect={(account_id) => {
            setValue('assigned_to', account_id);
          }}
          placeholder="New member's email"
          className="w-2/3"
          {...register('assigned_to')}
        />
      </div>
      <div className="mt-48 flex justify-end w-full">
        <Button role="submit">Next step</Button>
      </div>
    </form>
  );
};

const CloseIncidentModal = ({ open, onClose }) => {
  const { openIncident, setOpenIncident } = useContext(OpenIncidentContext);
  const [formStep, setFormStep] = useState('incident');
  const [closureFormData, setClosureFormData] = useState({
    incident: {
      name: openIncident.name,
      summary: openIncident.summary,
    },
    postmortem: {},
  });

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
      onClose();
    },
  });

  return (
    <Modal open={true} onClose={onClose}>
      <ModalPanel className="w-full">
        <ModalTitle onClose={onClose}>Close the incident</ModalTitle>
        <ModalDescription>
          {formStep === 'incident' && (
            <IncidentUpdateForm
              closureFormData={closureFormData}
              setClosureFormData={setClosureFormData}
              goToNextStep={() => setFormStep('postmortem')}
            />
          )}
          {formStep === 'postmortem' && (
            <PostmortemForm
              closureFormData={closureFormData}
              setClosureFormData={setClosureFormData}
              closeIncident={() => {}}
            />
          )}
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

export default CloseIncidentModal;
