import classnames from 'classnames';

export const InputError = ({ message, className }) => {
  if (!message) return null;
  return (
    <div className={classnames('text-red-500 text-xs', className)}>
      {message}
    </div>
  );
};

export default InputError;
