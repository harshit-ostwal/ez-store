import { LocalStorageKeys } from "@/constants/storage-keys";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";
import { createContext, useContext, useState } from "react";
import { v7 as uuidV7 } from "uuid";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(
    getLocalStorageItem(LocalStorageKeys.USERS) || [],
  );

  const [loggedInUser, setLoggedInUser] = useState(
    getLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER) || null,
  );

  const findByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  const signUp = async (data) => {
    const existingUser = findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = [
      ...users,
      {
        id: uuidV7(),
        lastLoginAt: null,
        ...data,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setUsers(newUser);
    setLocalStorageItem(LocalStorageKeys.USERS, newUser);
  };

  const signIn = (data) => {
    const existingUser = findByEmail(data.email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.password !== data.password) {
      throw new Error("Invalid password");
    }

    setLoggedInUser(existingUser);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, existingUser);
  };

  const value = {
    signUp,
    signIn,
    loggedInUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
