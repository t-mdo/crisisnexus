import classnames from 'classnames';

const getElement = (uiStyle, inline) => {
  switch (uiStyle) {
    case 'body':
      return inline ? 'span' : 'p';
    case 'heading-1':
      return 'h2';
    case 'heading-2':
      return 'h3';
    case 'heading-3':
      return 'h4';
    case 'subtext':
      return inline ? 'span' : 'p';
    default:
      return inline ? 'span' : 'p';
  }
};

const Text = ({ uiStyle = 'body', inline, className, children }) => {
  const Element = getElement(uiStyle, inline);

  return (
    <Element
      className={classnames(
        {
          'text-gray-400 text-sm': uiStyle === 'subtext',
          'text-gray-900': uiStyle === 'body',
          'text-gray-900 font-semibold text-2xl': uiStyle === 'heading-1',
          'text-gray-900 font-semibold text-xl': uiStyle === 'heading-2',
          'text-gray-900 font-medium text-lg': uiStyle === 'heading-3',
        },
        className,
      )}
    >
      {children}
    </Element>
  );
};

export default Text;
