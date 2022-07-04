import React, { useContext } from 'react';
import {ErrorContext} from "../providers/ErrorProvider";

export const useError = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw new Error('useAuth needs to be used inside AuthContext');
  }

  return errorContext;
};
