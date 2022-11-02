import { forwardRef } from 'react';
import classnames from 'classnames';

export const inputComponentStyle =
  'px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 block rounded sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none';

const InputComponent = forwardRef(
  ({ className, element: Element, ...props }, ref) => (
    <Element
      ref={ref}
      className={classnames(inputComponentStyle, className)}
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
