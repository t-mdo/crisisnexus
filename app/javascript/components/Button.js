import classnames from 'classnames';

export const BUTTON_TYPE_PRIMARY = 'primary';
export const BUTTON_TYPE_SECONDARY = 'secondary';
export const BUTTON_TYPE_SUCCESS = 'success';
export const BUTTON_TYPE_DANGER = 'danger';

export const Button = ({
  children,
  loading,
  type = BUTTON_TYPE_PRIMARY,
  className,
  ...props
}) => (
  <button
    className={classnames(
      'py-2 px-4 focus-visible:ring ring-violet-300 text-white font-semibold rounded-lg transition duration-100',
      {
        'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 disabled:hover:bg-violet-500 disabled:active:big-violet-500':
          type === BUTTON_TYPE_PRIMARY,
        'bg-lime-400 hover:bg-lime-500 active:bg-lime-600 disabled:hover:bg-lime-500 disabled:active:big-lime-500':
          type === BUTTON_TYPE_SECONDARY,
        'bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:hover:bg-green-500 disabled:active:big-green-500':
          type === BUTTON_TYPE_SUCCESS,
        'bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:hover:bg-red-500 disabled:active:big-red-500':
          type === BUTTON_TYPE_DANGER,
      },
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    )}
    disabled={loading}
    {...props}
  >
    {loading ? 'Loading...' : children}
  </button>
);

export default Button;
