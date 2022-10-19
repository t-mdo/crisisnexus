import { cloneElement } from 'react';

/**
 * Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > intersperse([1,2,3], 0)
 * [1,0,2,0,3]
 *
 */
const intersperse = (array, separator) => {
  array = array.filter(Boolean);
  return array.reduce((output, item, index) => {
    output.push(item);

    if (index < array.length - 1) {
      output.push(cloneElement(separator, { key: `interspersed-${index}` }));
    }

    return output;
  }, []);
};

export default intersperse;
