import classnames from 'classnames';

export const STATUS_TYPE_INFO = 'info';
export const STATUS_TYPE_SUCCESS = 'success';
export const STATUS_TYPE_WARNING = 'warning';
export const STATUS_TYPE_ERROR = 'error';

export const StatusBadge = ({
  children,
  className,
  icon: Icon,
  type = STATUS_TYPE_INFO,
}) => (
  <span
    className={classnames(
      'flex items-center w-fit px-2 py-1 border rounded capitalize text-xs',
      {
        'bg-blue-100 border-blue-400 text-blue-600': type === STATUS_TYPE_INFO,
        'bg-green-100 border-green-400 text-green-600':
          type === STATUS_TYPE_SUCCESS,
        'bg-orange-100 border-orange-400 text-orange-600':
          type === STATUS_TYPE_WARNING,
        'bg-red-100 border-red-400 text-red-600': type === STATUS_TYPE_ERROR,
      },
      className,
    )}
  >
    {Icon && (
      <Icon
        className={classnames('w-3 mr-1', {
          'fill-blue-600': type === STATUS_TYPE_INFO,
          'fill-green-600': type === STATUS_TYPE_SUCCESS,
          'fill-orange-600': type === STATUS_TYPE_WARNING,
          'fill-red-600': type === STATUS_TYPE_ERROR,
        })}
      />
    )}
    {children}
  </span>
);

export default StatusBadge;
