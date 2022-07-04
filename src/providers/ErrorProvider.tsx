import React, {useCallback, useState} from "react";

interface ErrorContextObj {
  error: string | null;
  dispatchError: (message: string) => void;
}

export const ErrorContext = React.createContext<ErrorContextObj>({
  error: null,
  dispatchError: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  const dispatchError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 7000);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, dispatchError }}>
      {children}
    </ErrorContext.Provider>
  );
};