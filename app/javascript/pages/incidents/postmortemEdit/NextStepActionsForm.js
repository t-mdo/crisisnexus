import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAutosave from 'modules/form/useAutosave';
import { Input, DateInput } from 'components/form/Input';
import InputError from 'components/form/InputError';
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
  errors,
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
      <div className="flex flex-col col-span-5">
        <Input
          placeholder="Title"
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            setFocus(`next_step_actions.${index + 1}.name`);
          }}
          error={Boolean(errors?.name)}
          {...register(`next_step_actions.${index}.name`)}
        />
        <InputError className="mt-1" message={errors?.name?.message} />
      </div>
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
      <div className="col-span-2 flex flex-col">
        <DateInput
          placeholder="Due date"
          error={Boolean(errors?.due_at)}
          max={dayjs().add(3, 'year').format('YYYY-MM-DD')}
          {...register(`next_step_actions.${index}.due_at`)}
        />
        <InputError className="mt-1" message={errors?.due_at?.message} />
      </div>
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

const validationSchema = yup
  .object({
    next_step_actions: yup.array().of(
      yup.object({
        assigned_to: yup.object().nullable().default(null),
        due_at: yup
          .date()
          .min(new Date(), 'Due date must be in the future')
          .transform((curr, orig) => (orig === '' ? null : curr))
          .nullable()
          .default(null),
        name: yup
          .string()
          .nullable()
          .default(null)
          .when(['assigned_to', 'due_at'], {
            is: (assigned_to, due_at) => assigned_to || due_at,
            then: (schema) => schema.required('Title is required'),
          }),
      }),
    ),
  })
  .required();

const NextStepActionsForm = ({ defaultValues, deleteQuery, postQuery }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      next_step_actions: defaultValues.map((action) => ({
        ...action,
        due_at: action.due_at
          ? dayjs(action.due_at).format('YYYY-MM-DD')
          : null,
      })),
    },
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    name: 'next_step_actions',
    control,
  });

  const appendAction = () =>
    append({ name: null, due_at: null }, { shouldFocus: false });

  const nextStepActions = watch('next_step_actions');
  const everyNameFilled = nextStepActions?.every((action) => action.name);
  useEffect(() => {
    if (everyNameFilled) appendAction();
  }, [everyNameFilled]);

  const removeAction = ({ index, id }) => {
    if (id) {
      deleteQuery({ id });
    }
    remove(index);
  };

  const resetForm = ({ data: { next_step_actions } }) => {
    const formNextStepAction = watch('next_step_actions');

    if (next_step_actions?.length) {
      formNextStepAction.forEach((action, index) => {
        if (!action.id && action.name)
          update(index, { id: next_step_actions[index].id, ...action });
      });
    }
  };

  const onSubmit = ({ next_step_actions }) => {
    postQuery({
      next_step_actions: next_step_actions.map((action) => ({
        id: action.id,
        name: action.name,
        assigned_to_id: action.assigned_to?.id,
        due_at: dayjs(action.due_at).format('YYYY-MM-DD'),
      })),
      onSuccess: resetForm,
    });
  };

  useAutosave({
    onSubmit: handleSubmit(onSubmit),
    control,
  });

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
              errors={errors?.next_step_actions?.[index]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NextStepActionsForm;
