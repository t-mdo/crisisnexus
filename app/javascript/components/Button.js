import classnames from 'classnames';
import { Link } from 'react-router-dom';

export const BUTTON_COLOR_PRIMARY = 'primary';
export const BUTTON_COLOR_SECONDARY = 'secondary';
export const BUTTON_COLOR_SUCCESS = 'success';
export const BUTTON_COLOR_DANGER = 'danger';
export const BUTTON_COLOR_WHITE = 'white';

export const Button = ({
  children,
  loading,
  href,
  color = BUTTON_COLOR_PRIMARY,
  className,
  disabled,
  ...props
}) => {
  const Element = href ? Link : 'button';
  return (
    <Element
      to={href}
      className={classnames(
        'block py-2 px-4 focus-visible:ring ring-violet-300 text-white font-semibold rounded-lg transition duration-100',
        {
          'bg-slate-500 hover:bg-slate-600 active:bg-slate-700 disabled:hover:bg-slate-500 disabled:active:big-slate-500':
            color === BUTTON_COLOR_PRIMARY,
          'text-gray-100 bg-purple-600 hover:bg-purple-700 active:bg-purple-800':
            color === 'purple',
          'text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-400':
            color === BUTTON_COLOR_SECONDARY,
          'bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:hover:bg-green-500 disabled:active:big-green-500':
            color === BUTTON_COLOR_SUCCESS,
          'bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:hover:bg-red-500 disabled:active:big-red-500':
            color === BUTTON_COLOR_DANGER,
          'text-gray-900 border-gray-300 border bg-white hover:bg-gray-100 active:bg-gray-200 ':
            color === BUTTON_COLOR_WHITE,
        },
        'disabled:opacity-50',
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Element>
  );
};

export default Button;
