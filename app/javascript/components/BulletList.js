import classnames from 'classnames';
import CircleCheckIcon from 'icons/regular/circle-check.svg';

export const BulletPoint = ({ children, className }) => (
  <li className={classnames('flex items-baseline', className)}>
    <CircleCheckIcon className="flex-shrink-0 w-3 h-3 mr-2 fill-stone-500" />
    {children}
  </li>
);

export default { BulletPoint };
