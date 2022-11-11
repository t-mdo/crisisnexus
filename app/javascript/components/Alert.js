import classnames from 'classnames';

export const ALERT_STYLE_SUCCESS = 'success';
export const ALERT_STYLE_WARNING = 'warning';
export const ALERT_STYLE_ERROR = 'error';

export const Alert = ({ children, className, style = ALERT_STYLE_SUCCESS }) => (
  <div
    className={classnames(
      'border rounded px-4 py-2 text-center w-fit',
      {
        'bg-green-200 border-green-400 text-green-600':
          style === ALERT_STYLE_SUCCESS,
        'bg-orange-200 border-orange-400 text-orange-600':
          style === ALERT_STYLE_WARNING,
        'bg-red-200 border-red-400 text-red-600': style === ALERT_STYLE_ERROR,
      },
      className,
    )}
  >
    {children}
  </div>
);

export default Alert;
