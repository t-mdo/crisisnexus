import classnames from 'classnames';
import { Disclosure } from '@headlessui/react';
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
    <ChevronUpIcon className="w-3 h-3 fill-gray-900 ui-open:rotate-180 ui-open:transform transition duration-300" />
  </Disclosure.Button>
);

export const AccordionBody = ({ className, children, ...props }) => (
  <Disclosure.Panel
    className={classnames(
      'p-3 ui-not-open:rounded ui-open:rounded-b bg-stone-200',
      className,
    )}
    {...props}
  >
    {children}
  </Disclosure.Panel>
);

export default { Accordion, AccordionHeader };
