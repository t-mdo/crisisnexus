import classnames from 'classnames';
import { forwardRef } from 'react';
import { Combobox } from '@headlessui/react';
import { inputComponentStyle } from 'components/form/Input';
import CheckIcon from 'icons/regular/check.svg';
import ChevronUp from 'icons/regular/chevron-up.svg';
import ChevronDown from 'icons/regular/chevron-down.svg';

export const AutocompletedInputOption = ({ item }) => (
  <Combobox.Option
    className={({ active }) =>
      `relative w-full py-2 pl-12 cursor-default select-none ${
        active ? 'bg-violet-600 text-white' : 'text-gray-900'
      }`
    }
    value={item}
  >
    {({ selected, active }) => (
      <>
        <span
          className={`block truncate ${
            selected ? 'font-medium' : 'font-normal'
          }`}
        >
          {item.display}
        </span>
        {selected ? (
          <span
            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
              active ? 'text-white' : 'text-violet-600'
            }`}
          >
            <CheckIcon className="w-5 fill-white" />
          </span>
        ) : null}
      </>
    )}
  </Combobox.Option>
);

export const AutocompletedInput = forwardRef(
  (
    {
      onChange,
      value,
      onInputChange,
      inputValue,
      options,
      className,
      disabled,
      error,
      ...props
    },
    ref,
  ) => (
    <Combobox disabled={disabled} value={value} onChange={onChange}>
      <div className={classnames('relative', className)}>
        <Combobox.Input
          ref={ref}
          className={classnames(
            inputComponentStyle,
            { 'border-red-500 focus:border-red-500 focus:ring-red-500': error },
            'w-full',
          )}
          displayValue={(item) => item?.display}
          onChange={onInputChange}
          value={inputValue}
          {...props}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <div className="flex flex-col">
            <ChevronUp className="w-2 h-fit fill-gray-400" />
            <ChevronDown className="w-2 h-fit fill-gray-400" />
          </div>
        </Combobox.Button>
        <Combobox.Options className="absolute mt-1 py-1 w-full max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
          {options.map((option) => (
            <AutocompletedInputOption key={option.value} item={option} />
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  ),
);

export default AutocompletedInput;
