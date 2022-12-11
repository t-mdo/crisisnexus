import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import range from 'lodash/range';
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
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { isDirty: formIsDirty },
  } = useForm({
    defaultValues,
  });
  const nextStepActions = watch('next_step_actions');
  const nextStepActionsCount =
    nextStepActions?.filter((action) => action.name).length || 0;

  return (
    <div>
      <Label>Next step actions</Label>
      <div className="mx-3">
        <ul className="flex flex-col gap-y-2">
          {range(nextStepActionsCount + 1).map((index) => (
            <NextStepActionInputs
              key={index}
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
