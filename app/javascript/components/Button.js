import classnames from 'classnames';
import { Link } from 'react-router-dom';

export const BUTTON_COLOR_PRIMARY = 'primary';
export const BUTTON_COLOR_SECONDARY = 'secondary';
export const BUTTON_COLOR_SUCCESS = 'success';
export const BUTTON_COLOR_DANGER = 'danger';

export const Button = ({
  children,
  loading,
  href,
  color = BUTTON_COLOR_PRIMARY,
  className,
  ...props
}) => {
  const Element = href ? Link : 'button';
  return (
    <Element
      to={href}
      className={classnames(
        'block py-2 px-4 focus-visible:ring ring-violet-300 text-white font-semibold rounded-lg transition duration-100',
        {
          'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 disabled:hover:bg-violet-500 disabled:active:big-violet-500':
            color === BUTTON_COLOR_PRIMARY,
          'bg-lime-400 hover:bg-lime-500 active:bg-lime-600 disabled:hover:bg-lime-500 disabled:active:big-lime-500':
            color === BUTTON_COLOR_SECONDARY,
          'bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:hover:bg-green-500 disabled:active:big-green-500':
            color === BUTTON_COLOR_SUCCESS,
          'bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:hover:bg-red-500 disabled:active:big-red-500':
            color === BUTTON_COLOR_DANGER,
        },
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Element>
  );
};

export default Button;
