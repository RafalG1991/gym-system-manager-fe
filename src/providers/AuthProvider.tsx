import React, {useEffect, useState} from 'react';

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
  signIn: ({login, password}: LoginData) => {},
  signUp: ({login, password}: LoginData) => {},
  signOut: () => {}
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      (async () => {
        try {
          const res = await fetch('/user/me', {
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
            localStorage.removeItem('login');
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  const signUp = async ({ login, password }: LoginData) => {
    try {
      const res = await fetch('/user/signup', {
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
      if(res.ok) {
        const data = await res.json();
        localStorage.setItem('login', 'true');
        setUser(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async ({ login, password }: LoginData) => {
    try {
      const res = await fetch('/user/login', {
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
      if(res.ok) {
        const data = await res.json();
        localStorage.setItem('login', 'true');
        setUser(data);
      }
    } catch (e) {
      console.log(e);
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