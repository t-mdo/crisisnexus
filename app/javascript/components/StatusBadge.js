import classnames from 'classnames';

export const STATUS_COLOR_INFO = 'info';
export const STATUS_COLOR_SUCCESS = 'success';
export const STATUS_COLOR_WARNING = 'warning';
export const STATUS_COLOR_ERROR = 'error';

export const StatusBadge = ({
  children,
  className,
  icon: Icon,
  color = STATUS_COLOR_INFO,
}) => (
  <span
    className={classnames(
      'flex items-center w-fit h-fit px-2 py-1 border rounded capitalize text-xs',
      {
        'bg-blue-100 border-blue-400 text-blue-600':
          color === STATUS_COLOR_INFO,
        'bg-green-100 border-green-500 text-green-600':
          color === STATUS_COLOR_SUCCESS,
        'bg-orange-100 border-orange-400 text-orange-600':
          color === STATUS_COLOR_WARNING,
        'bg-red-100 border-red-400 text-red-600': color === STATUS_COLOR_ERROR,
      },
      className,
    )}
  >
    {Icon && (
      <Icon
        className={classnames('w-3 mr-2', {
          'fill-blue-600': color === STATUS_COLOR_INFO,
          'fill-green-600': color === STATUS_COLOR_SUCCESS,
          'fill-orange-600': color === STATUS_COLOR_WARNING,
          'fill-red-600': color === STATUS_COLOR_ERROR,
        })}
      />
    )}
    {children}
  </span>
);

export default StatusBadge;
