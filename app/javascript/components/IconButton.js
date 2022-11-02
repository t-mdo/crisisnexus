import classnames from 'classnames';

const IconButton = ({ children, className, ...props }) => (
  <button
    className={classnames(
      'p-1 focus-visible:ring ring-violet-300 transition duration-100',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
