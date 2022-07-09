import React, { useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useError} from "../hooks/use-error";

interface LoginData {
  login: string;
  password: string;
}

interface AuthContextObj {
  user: { sub: string, iat: number, exp: number } | null,
  signIn: ({login, password}: LoginData) => void,
  signUp: ({login, password}: LoginData) => void,
  signOut: () => void
}

export const AuthContext = React.createContext<AuthContextObj>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {}
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const { dispatchError } = useError();
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      (async () => {
        try {
          const res = await fetch('/api/user/me', {
            credentials: "include",
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'true',
              "Content-Type": "application/json",
            }
          });
          if(res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            signOut();
          }
        } catch (e) {
          dispatchError();
        }
      })();
    }
  }, [location, dispatchError]);

  const signUp = async ({ login, password }: LoginData) => {
    try {
      const res = await fetch('api/user/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login,
          password,
        }),
      });
      const data = await res.json();
      if(res.ok) {
        localStorage.setItem('login', 'true');
        setUser(data);
      } else {
        dispatchError(data.err);
      }
    } catch (e) {
      dispatchError();
    }
  };

  const signIn = async ({ login, password }: LoginData) => {
    try {
      const res = await fetch('api/user/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login,
          password,
        }),
      });
      const data = await res.json();
      if(res.ok) {
        localStorage.setItem('login', 'true');
        setUser(data);
      } else {
        dispatchError(data.err);
      }
    } catch (e) {
      dispatchError();
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('login');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }} >
      {children}
    </AuthContext.Provider>
  );
};