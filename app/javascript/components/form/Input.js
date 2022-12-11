import { useEffect, useState, useRef, forwardRef } from 'react';
import mergeRefs from 'modules/helpers/mergeRefs';
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

export const DateInput = forwardRef(
  ({ className, placeholder, ...props }, ref) => {
    const inputRef = useRef();
    const dateInputRef = useRef();
    const hasValue = Boolean(dateInputRef?.current?.value);

    const onFocus = ({ target }) => {
      target.style.display = 'none';
      dateInputRef.current.style.display = 'block';
      dateInputRef.current.focus();
    };

    useEffect(() => {
      if (dateInputRef.current) {
        dateInputRef.current.addEventListener('blur', ({ target }) => {
          console.log(target.value);
          if (target.value) return;
          dateInputRef.current.value = '';
          inputRef.current.style.display = 'block';
          dateInputRef.current.style.display = 'none';
        });
        return () => {
          dateInputRef.current.removeEventListener('blur', () => {});
        };
      }
    }, []);

    return (
      <>
        <Input
          ref={inputRef}
          className={classnames({ hidden: hasValue }, className)}
          onFocus={onFocus}
          placeholder={placeholder}
        />
        <Input
          className={classnames({ hidden: !hasValue }, className)}
          ref={mergeRefs([ref, dateInputRef])}
          element="input"
          type="date"
          {...props}
        />
      </>
    );
  },
);

export default { Input, TextArea };
