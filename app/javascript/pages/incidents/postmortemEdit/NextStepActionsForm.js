import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input, DateInput } from 'components/form/Input';
import IconButton from 'components/IconButton';
import useAccountsAutocompletion from 'modules/accounts/useAccountsAutocompletion';
import { AutocompletedInput } from 'components/form/AutocompletedInput';
import { Label } from 'components/form/Label';
import TrashIcon from 'icons/regular/trash-can.svg';

const NextStepActionInputs = ({
  index,
  setFocus,
  register,
  setValue,
  watch,
  displayRemoveButton,
  removeAction,
}) => {
  const [accountInput, setAccountInput] = useState();
  const accountsOptions = useAccountsAutocompletion({
    valueWatcher: accountInput,
  });
  const id = watch(`next_step_actions.${index}.id`);
  const accountWatcher = watch(`next_step_actions.${index}.assigned_to`);
  const accountValue = {
    display: accountWatcher?.email,
    value: accountWatcher?.id,
  };

  return (
    <li className="grid grid-cols-12 gap-x-4 p-3 border rounded">
      <Input
        className="col-span-5"
        placeholder="Title"
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          setFocus(`next_step_actions.${index + 1}.name`);
        }}
        {...register(`next_step_actions.${index}.name`)}
      />
      <AutocompletedInput
        options={accountsOptions}
        onChange={({ display, value }) => {
          setValue(
            `next_step_actions.${index}.assigned_to`,
            { id: value, email: display },
            {
              shouldDirty: true,
            },
          );
        }}
        value={accountValue}
        placeholder="Owner"
        className="col-span-4"
        onInputChange={({ target: { value } }) => {
          setAccountInput(value);
        }}
      />
      <DateInput
        className="col-span-2"
        placeholder="Due date"
        {...register(`next_step_actions.${index}.due_at`)}
      />
      <div className="flex justify-center items-center">
        {displayRemoveButton && (
          <IconButton onClick={() => removeAction({ index, id })}>
            <TrashIcon className="w-4 fill-red-500" />
          </IconButton>
        )}
      </div>
    </li>
  );
};

const NextStepActionsForm = ({ defaultValues, deleteQuery }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { isDirty: formIsDirty },
  } = useForm({
    defaultValues: { next_step_actions: defaultValues },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'next_step_actions',
    control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({}, { shouldFocus: false });
    }
  }, [fields]);

  const nextStepActions = watch('next_step_actions');
  const everyNameFilled = nextStepActions?.every((action) => action.name);
  useEffect(() => {
    if (everyNameFilled) append({}, { shouldFocus: false });
  }, [everyNameFilled]);

  // const lastRow = watch('next_step_actions')?.slice(-2)[0];
  // useEffect(() => {
  //   if (!lastRow.name && !lastRow.assigned_to && !lastRow.due_at) remove(-1);
  // }, [lastRow.name, lastRow.assigned_to, lastRow.due_at]);

  const removeAction = ({ index, id }) => {
    if (id) {
      deleteQuery({ id });
    }
    remove(index);
  };

  return (
    <div>
      <Label>Next step actions</Label>
      <div className="mx-3">
        <ul className="mb-2 flex flex-col gap-y-2">
          {fields.map((field, index) => (
            <NextStepActionInputs
              key={field.id}
              id={field.id}
              index={index}
              setFocus={setFocus}
              register={register}
              setValue={setValue}
              watch={watch}
              displayRemoveButton={index !== nextStepActions.length - 1}
              removeAction={removeAction}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NextStepActionsForm;
