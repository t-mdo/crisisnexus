import classnames from 'classnames';

const getElement = (uiStyle, inline) => {
  switch (uiStyle) {
    case 'body':
      return inline ? 'span' : 'p';
    case 'title-lg':
      return 'h2';
    case 'title':
      return 'h3';
    case 'title-sm':
      return 'h4';
    default:
      return 'p';
  }
};

const Text = ({ uiStyle = 'body', inline, className, children }) => {
  const Element = getElement(uiStyle, inline);

  return (
    <Element
      className={classnames(
        {
          'text-gray-900': uiStyle === 'body',
          'font-semibold text-lg': uiStyle === 'title',
        },
        className,
      )}
    >
      {children}
    </Element>
  );
};

export default Text;
