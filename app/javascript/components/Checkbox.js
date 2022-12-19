import classnames from 'classnames';
import { Switch } from '@headlessui/react';
import CheckIcon from 'icons/regular/check.svg';

export const Checkbox = ({ className, ...props }) => {
  return (
    <Switch
      className={classnames(
        'flex flex-shrink-0 h-4 w-4 rounded transform bg-white ui-checked:bg-slate-500 disabled:bg-slate-200 border border-slate-300 disabled:border-slate-300 ui-checked:border-0 ring-0 transition duration-200 ease-in-out',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={
          'flex items-center justify-center pointer-events-none inline-block h-full w-full'
        }
      >
        <CheckIcon className="hidden ui-checked:block w-3 h-3 fill-white" />
      </span>
    </Switch>
  );
};

export default Checkbox;
