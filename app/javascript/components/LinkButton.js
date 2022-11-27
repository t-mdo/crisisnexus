import classnames from 'classnames';
import ChevronLeftIcon from 'icons/regular/chevron-left.svg';
import ChevronRightIcon from 'icons/regular/chevron-right.svg';
import { Link } from 'react-router-dom';

export const LinkButton = ({ direction, children, className, ...props }) => (
  <Link
    className={classnames('flex items-center text-violet-600', className)}
    {...props}
  >
    {direction === 'back' && (
      <ChevronLeftIcon className="w-3 mr-2 fill-violet-600" />
    )}
    {children}
    {direction === 'forward' && (
      <ChevronRightIcon className="w-3 ml-2 fill-violet-600" />
    )}
  </Link>
);

export default LinkButton;
