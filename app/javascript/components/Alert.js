import classnames from 'classnames';

export const ALERT_COLOR_SUCCESS = 'success';
export const ALERT_COLOR_WARNING = 'warning';
export const ALERT_COLOR_ERROR = 'error';

export const Alert = ({ children, className, color = ALERT_COLOR_SUCCESS }) => (
  <div
    className={classnames(
      'border rounded px-4 py-2 text-center w-fit',
      {
        'bg-green-200 border-green-400 text-green-600':
          color === ALERT_COLOR_SUCCESS,
        'bg-orange-200 border-orange-400 text-orange-600':
          color === ALERT_COLOR_WARNING,
        'bg-red-200 border-red-400 text-red-600': color === ALERT_COLOR_ERROR,
      },
      className,
    )}
  >
    {children}
  </div>
);

export default Alert;
