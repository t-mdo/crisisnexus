import classnames from 'classnames';
import { forwardRef } from 'react';
import { Combobox } from '@headlessui/react';
import { inputComponentStyle } from 'components/form/Input';
import CheckIcon from 'images/icons/regular/check.svg';
import ChevronUp from 'images/icons/regular/chevron-up.svg';
import ChevronDown from 'images/icons/regular/chevron-down.svg';

export const AutocompletedInputOption = ({ display, value }) => (
  <Combobox.Option
    key={value}
    className={({ active }) =>
      `relative cursor-default select-none py-2 pl-10 pr-4 ${
        active ? 'bg-violet-600 text-white' : 'text-gray-900'
      }`
    }
    value={value}
  >
    {({ selected, active }) => (
      <>
        <span
          className={`block truncate ${
            selected ? 'font-medium' : 'font-normal'
          }`}
        >
          {display}
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
  ({ onSelect, onChange, value, options, className, ...props }, ref) => (
    <Combobox onChange={onSelect}>
      <div className="relative w-full">
        <Combobox.Input
          ref={ref}
          className={classnames(inputComponentStyle, className)}
          displayValue={value}
          onChange={onChange}
          {...props}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <div className="flex flex-col">
            <ChevronUp className="w-2 h-fit fill-gray-400" />
            <ChevronDown className="w-2 h-fit fill-gray-400" />
          </div>
        </Combobox.Button>
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map(({ display, value }) => (
            <AutocompletedInputOption
              key={value}
              display={display}
              value={value}
            />
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  ),
);

export default AutocompletedInput;
