import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import useAccountsAutocompletion from 'modules/accounts/useAccountsAutocompletion';
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
import { InputError } from 'components/form/InputError';
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
  setClosureFormData,
  closingLoading,
  closingErrors,
}) => {
  const [queryText, setQueryText] = useState('');
  const [assignedToId, setAssignedToId] = useState();
  const [error, setError] = useState();

  const accountsOptions = useAccountsAutocompletion({
    valueWatcher: queryText,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!assignedToId) {
      setError('Please select an assignee');
      return;
    }
    setClosureFormData((data) => ({
      ...data,
      postmortem: { assigned_to: assignedToId },
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <ErrorFeedback queryErrors={closingErrors} className="mb-4" />
        <Label>Who's owning the postmortem?</Label>
        <AutocompletedInput
          options={accountsOptions}
          onChange={({ value }) => {
            setAssignedToId(value);
          }}
          placeholder="Postmortem owner email"
          className="w-2/3"
          onInputChange={({ target: { value } }) => setQueryText(value)}
          inputValue={queryText}
          error={Boolean(error)}
        />
        <InputError message={error} />
      </div>
      <div className="mt-48 flex justify-end w-full">
        <Button loading={closingLoading} role="submit">
          Close incident
        </Button>
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
      status: 'closed',
    },
    postmortem: {},
  });

  const {
    loading,
    data: putResponse,
    error: putError,
    trigger: triggerIncidentPut,
  } = useHttpQuery({
    url: `/incidents/${openIncident.local_id}/status`,
    method: 'PUT',
    trigger: true,
    body: { ...closureFormData },
    onSuccess: () => {
      setOpenIncident(null);
      onClose();
    },
  });

  useEffect(() => {
    if (closureFormData.postmortem.assigned_to) triggerIncidentPut();
  }, [closureFormData.postmortem.assigned_to]);

  return (
    <Modal open={open} onClose={onClose}>
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
              setClosureFormData={setClosureFormData}
              closingLoading={loading}
              closingErrors={putError && putResponse.errors}
            />
          )}
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

export default CloseIncidentModal;
