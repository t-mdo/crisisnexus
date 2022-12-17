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

const Text = ({ uiStyle = 'body', inline, color, className, children }) => {
  const Element = getElement(uiStyle, inline);

  return (
    <Element
      className={classnames(
        {
          'text-gray-400': !color && uiStyle === 'subtext',
          'text-gray-900': !color && uiStyle !== 'subtext',
          [color]: color,
          'text-sm': uiStyle === 'subtext',
          'text-base': uiStyle === 'body',
          'font-semibold text-2xl': uiStyle === 'heading-1',
          'font-semibold text-xl': uiStyle === 'heading-2',
          'font-medium text-lg': uiStyle === 'heading-3',
        },
        className,
      )}
    >
      {children}
    </Element>
  );
};

export default Text;
