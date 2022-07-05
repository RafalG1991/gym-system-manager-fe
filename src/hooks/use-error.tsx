import React, { useContext } from 'react';
import {ErrorContext} from "../providers/ErrorProvider";

export const useError = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw new Error('useError needs to be used inside ErrorContext');
  }

  return errorContext;
};
