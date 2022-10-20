const Card = ({ as: Element, children }) => (
  <Element className="mb-7 bg-white rounded shadow border border-slate-200">
    {children}
  </Element>
);

export default Card;
