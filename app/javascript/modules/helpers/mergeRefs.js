const mergeRefs = (refs) => (elem) =>
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(elem);
    } else if (ref) {
      ref.current = elem;
    }
  });

export default mergeRefs;
