import {ChangeEvent, useState} from "react";

export const useForm = (validationFunction: (value: string) => boolean) => {
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState<string>('');

  const isValid = validationFunction(value);
  const hasError = isTouched && !isValid;

  const valueInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  const valueBlurHandler = () => {
    setIsTouched(true);
  }

  const valueReset = () => {
    setValue('');
    setIsTouched(false);
  }

  return {
    value,
    hasError,
    isValid,
    valueInputHandler,
    valueBlurHandler,
    valueReset,
  }
}