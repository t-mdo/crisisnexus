import { forwardRef } from 'react';
import classnames from 'classnames';

const InputComponent = forwardRef(
  ({ className, element: Element, ...props }, ref) => (
    <Element
      ref={ref}
      className={classnames(
        'px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded sm:text-sm focus:ring-1',
        className,
      )}
      {...props}
    />
  ),
);

export const Input = forwardRef((props, ref) => (
  <InputComponent ref={ref} element="input" {...props} />
));

export const TextArea = forwardRef((props, ref) => (
  <InputComponent ref={ref} element="textarea" {...props} />
));

export default { Input, TextArea };
