import classnames from 'classnames';

export const Card = ({ as: Element = 'div', children, className }) => (
  <Element className={classnames('bg-white rounded shadow ', className)}>
    {children}
  </Element>
);

export default Card;
