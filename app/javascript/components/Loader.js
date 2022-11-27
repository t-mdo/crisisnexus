import classnames from 'classnames';
import Spinner from 'icons/duotone/spinner-third.svg';

const Loader = ({ className }) => (
  <Spinner
    className={classnames('w-6 fill-violet-700 animate-spin', className)}
  />
);

export default Loader;
