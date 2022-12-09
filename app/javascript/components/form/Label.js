import classnames from 'classnames';

export const Label = ({ subtitle, className, children }) => (
  <>
    <label
      className={classnames(
        'block font-medium text-gray-700 mb-2',
        {
          'mb-2': !subtitle,
          'mb-1': subtitle,
        },
        className,
      )}
    >
      {children}
    </label>
    {subtitle && <p className="text-xs text-gray-400 mb-2">{subtitle}</p>}
  </>
);

export default Label;
