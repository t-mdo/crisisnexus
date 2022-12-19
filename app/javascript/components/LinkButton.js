import classnames from 'classnames';
import ArrowLeftIcon from 'icons/regular/arrow-left.svg';
import ArrowRightIcon from 'icons/regular/arrow-right.svg';
import { Link } from 'react-router-dom';

export const LinkButton = ({ direction, children, className, ...props }) => (
  <Link
    className={classnames('flex items-center text-blue-800', className)}
    {...props}
  >
    {direction === 'back' && (
      <ArrowLeftIcon className="w-3 mr-2 fill-blue-800" />
    )}
    {children}
    {direction === 'forward' && (
      <ArrowRightIcon className="w-3 ml-2 fill-blue-800" />
    )}
  </Link>
);

export default LinkButton;
