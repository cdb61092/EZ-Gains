import axios, { AxiosRequestConfig } from 'axios';
import { useContext, createContext, useState } from 'react';

const AuthContext = createContext(null);
AuthContext.displayName = 'AuthContext';
axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    const options = {
      url: 'http://localhost:3001/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { username: user.username, password: user.password },
    };
    axios(options)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const register = (user) => {
    const options = {
      url: 'http://localhost:3001/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { username: user.username, password: user.password },
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
