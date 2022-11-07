import classnames from 'classnames';

const Card = ({ as: Element = 'div', children, className }) => (
  <Element
    className={classnames(
      'bg-white rounded shadow border border-slate-200',
      className,
    )}
  >
    {children}
  </Element>
);

export default Card;
