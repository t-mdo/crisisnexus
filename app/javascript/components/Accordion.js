import classnames from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import ChevronUpIcon from 'icons/regular/chevron-up.svg';

export const Accordion = Disclosure;

export const AccordionHeader = ({ className, children, ...props }) => (
  <Disclosure.Button
    className={classnames(
      'w-full p-3 flex justify-between items-center bg-stone-100 ui-not-open:rounded ui-open:rounded-t',
      className,
    )}
    {...props}
  >
    {children}
    <div className="ml-3">
      <ChevronUpIcon className="w-3 h-3 fill-gray-900 ui-open:rotate-180 ui-open:transform transition duration-300" />
    </div>
  </Disclosure.Button>
);

export const AccordionBody = ({ className, children, ...props }) => (
  <Transition
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
  >
    <Disclosure.Panel
      className={classnames(
        'p-3 ui-not-open:rounded ui-open:rounded-b bg-stone-200',
        className,
      )}
      {...props}
    >
      {children}
    </Disclosure.Panel>
  </Transition>
);

export default { Accordion, AccordionHeader };
