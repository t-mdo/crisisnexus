import { forwardRef } from 'react';
import classnames from 'classnames';
import intersperse from 'modules/helpers/intersperse';

export const ListRow = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);

export const List = forwardRef(({ children, className, ...props }, ref) => (
  <ul ref={ref} className={classnames('overflow-y-auto', className)} {...props}>
    {intersperse(children, <hr />)}
  </ul>
));

export default List;
