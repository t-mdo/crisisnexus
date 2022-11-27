import classnames from 'classnames';
import Spinner from 'icons/duotone/spinner-third.svg';

export const Loader = ({ className, width = 'w-6' }) => (
  <Spinner
    className={classnames(width, 'fill-violet-700 animate-spin', className)}
  />
);

export const BlockLoader = ({ className }) => (
  <div className="flex justify-center items-center h-full">
    <Loader width="w-10" className={classnames(className)} />
  </div>
);

export default Loader;
