import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCon = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate=useNavigate()

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (userToken) {
      setUser(userToken);
    }
  }, []);

  return (
    <UserCon.Provider value={{ user, setUser }}>
      {children}
    </UserCon.Provider>
  );
};

export const useUserContext = () => useContext(UserCon);

export default UserContextProvider;
