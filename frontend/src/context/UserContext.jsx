import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCon = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
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
