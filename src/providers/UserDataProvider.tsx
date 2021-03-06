import React, {FormEvent, useContext, useEffect, useState} from 'react';
import { UserDataResponse } from 'types';
import {AuthContext} from "./AuthProvider";
import {useError} from "../hooks/use-error";

interface AuthContextObj {
  userData: UserDataResponse | null;
  isLoading: boolean;
  changeBmi: (newHeight: string, newWeight: string) => Promise<void>;
  changeName: (firstName: string, lastName: string) => Promise<void>;
  extendMembership: (months: number) => Promise<void>;
  idName: string;
  idBmi: string;
  idMembership: string;
  setIdName: (id: string) => void;
  setIdBmi: (id: string) => void;
  setIdMembership: (id: string) => void;
}

export const UserDataContext = React.createContext<AuthContextObj>({
  userData: null,
  isLoading: false,
  changeBmi: async () => {},
  changeName: async () => {},
  extendMembership: async () => {},
  idName: '',
  idBmi: '',
  idMembership: '',
  setIdName: () => {},
  setIdBmi: () => {},
  setIdMembership: () => {},
});

export const UserDataProvider = ({children}: {children: React.ReactNode}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [idName, setIdName] = useState('');
  const [idBmi, setIdBmi] = useState('');
  const [idMembership, setIdMembership] = useState('');
  const {signOut} = useContext(AuthContext);
  const {dispatchError} = useError();

  useEffect(() => {
    const login = localStorage.getItem('login');
    (async () => {
      if (login) {
        setIsLoading(true);
        try {
          const res = await fetch('api/user/data', {
            credentials: "include",
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': 'true',
              "Content-Type": "application/json",
            }
          });
          const data = await res.json();
          if (res.ok) {
            setUserData(data);
          } else {
            dispatchError(data.err);
          }
        } catch (e) {
          dispatchError();
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [idName, idBmi, idMembership, dispatchError]);

  const changeBmi = async (newHeight: string, newWeight: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('api/user', {
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
      const data = await res.json();
      if (res.ok) {
        setIdBmi(data);
      } else {
        dispatchError(data.err);
        signOut();
      }
    }  catch (e) {
      dispatchError();
    } finally {
      setIsLoading(false);
    }
  }

  const changeName = async (firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('api/user', {
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
      const data = await res.json();
      if (res.ok) {
        setIdName(data);
      } else {
        dispatchError(data.err);
        signOut();
      }
    } catch (e) {
      dispatchError();
    } finally {
      setIsLoading(false);
    }
  }

  const extendMembership = async (months: number) => {
    setIsLoading(true);
    try {
      const res = await fetch('api/user/membership', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          months,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setIdMembership(data);
      } else {
        dispatchError(data.err)
        signOut();
      }
    } catch (e) {
      dispatchError();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserDataContext.Provider value={{ userData, isLoading, changeBmi, idName, setIdName, idBmi, setIdBmi, changeName, extendMembership, idMembership, setIdMembership}} >
      {children}
    </UserDataContext.Provider>
  );
};