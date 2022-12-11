import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import range from 'lodash/range';
import { Input, DateInput } from 'components/form/Input';
import IconButton from 'components/IconButton';
import useAccountsAutocompletion from 'modules/accounts/useAccountsAutocompletion';
import { AutocompletedInput } from 'components/form/AutocompletedInput';
import { Label } from 'components/form/Label';
import TrashIcon from 'icons/regular/trash-can.svg';
import PlusIcon from 'icons/regular/plus.svg';

const NextStepActionInputs = ({
  index,
  setFocus,
  register,
  setValue,
  watch,
}) => {
  const [accountInput, setAccountInput] = useState();
  const accountsOptions = useAccountsAutocompletion({
    valueWatcher: accountInput,
  });
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
        <IconButton>
          <TrashIcon className="w-4 fill-red-500" />
        </IconButton>
      </div>
    </li>
  );
};

const NextStepActionsForm = ({ defaultValues }) => {
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

  const everyNameFilled = watch('next_step_actions')?.every(
    (action) => action.name,
  );
  useEffect(() => {
    if (everyNameFilled) {
      append({}, { shouldFocus: false });
    }
  }, [everyNameFilled]);

  return (
    <div>
      <Label>Next step actions</Label>
      <div className="mx-3">
        <ul className="mb-2 flex flex-col gap-y-2">
          {fields.map((field, index) => (
            <NextStepActionInputs
              key={field.id}
              index={index}
              setFocus={setFocus}
              register={register}
              setValue={setValue}
              watch={watch}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NextStepActionsForm;
