import classnames from 'classnames';

const FullView = ({ className, children }) => (
  <div
    className={classnames(
      'flex flex-col h-[calc(100vh-64px)] overflow-y-auto',
      className,
    )}
  >
    {children}
  </div>
);

export default FullView;
