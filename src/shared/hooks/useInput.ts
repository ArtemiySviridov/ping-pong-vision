import { type ChangeEvent, useState } from 'react';

interface UseInputReturn {
  value: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
  setError: (error: boolean) => void;
  reset: () => void;
}

const useInput = (initialValue = ''): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError(false);
  };

  const reset = () => {
    setValue(initialValue);
    setError(false);
  };

  return {
    value,
    error,
    onChange,
    setValue,
    setError,
    reset,
  };
};

export default useInput;
