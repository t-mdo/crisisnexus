import { useState, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import debounce from 'lodash/debounce';

const useAutosave = ({ onSubmit, control }) => {
  const [isTouched, setIsTouched] = useState(false);

  const debouncedTriggerForm = useCallback(
    debounce(() => {
      onSubmit();
    }, 2000),
    [],
  );

  const form = useWatch({ control });
  useEffect(() => {
    if (!isTouched) {
      setIsTouched(true);
      return;
    }

    debouncedTriggerForm();
  }, [form]);
};

export default useAutosave;
