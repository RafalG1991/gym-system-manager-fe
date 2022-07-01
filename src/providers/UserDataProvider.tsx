import React, {FormEvent, useEffect, useState} from 'react';
import { UserDataResponse } from 'types';

interface AuthContextObj {
  userData: UserDataResponse | null;
  isLoading: boolean;
  changeBmi: (newHeight: string, newWeight: string) => Promise<void>;
  changeName: (firstName: string, lastName: string) => Promise<void>;
  idName: string;
  idBmi: string;
  setIdName: (id: string) => void;
  setIdBmi: (id: string) => void;
}

export const UserDataContext = React.createContext<AuthContextObj>({
  userData: null,
  isLoading: false,
  changeBmi: async () => {},
  changeName: async () => {},
  idName: '',
  idBmi: '',
  setIdName: () => {},
  setIdBmi: () => {},
});

export const UserDataProvider = ({children}: {children: React.ReactNode}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [idName, setIdName] = useState('');
  const [idBmi, setIdBmi] = useState('');

  useEffect(() => {
    const login = localStorage.getItem('login');
    (async () => {
      if (login) {
        setIsLoading(true);
        try {
          const res = await fetch('/user/data', {
            credentials: "include",
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': 'true',
              "Content-Type": "application/json",
            }
          });
          if (res.ok) {
            const data = await res.json();
            setUserData(data);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [idName, idBmi]);

  const changeBmi = async (newHeight: string, newWeight: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/user', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: newHeight,
          weight: newWeight,
        }),
      });
      setIdBmi(await res.json());
    } finally {
      setIsLoading(false);
    }
  }

  const changeName = async (firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/user', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
        }),
      });
      setIdName(await res.json());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserDataContext.Provider value={{ userData, isLoading, changeBmi, idName, setIdName, idBmi, setIdBmi, changeName }} >
      {children}
    </UserDataContext.Provider>
  );
};