import classnames from 'classnames';

const Card = ({ as: Element = 'div', children, className }) => (
  <Element
    className={classnames(
      'mb-7 bg-white rounded shadow border border-slate-200',
      className,
    )}
  >
    {children}
  </Element>
);

export default Card;
