import { LocalStorageKeys } from "@/constants/storage-keys";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";
import { createContext, useContext, useState } from "react";
import { v7 as uuidV7 } from "uuid";
import bcrypt from "bcryptjs";
import { toast } from "sonner";

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
      toast.error("User with this email already exists");
      return;
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
    toast.success("Account created successfully!");
    return true;
  };

  const signIn = async (data) => {
    const existingUser = findByEmail(data.email);

    if (!existingUser) {
      toast.error("User not found");
      return;
    }

    const comparePassword = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!comparePassword) {
      toast.error("Invalid credentials, Please try again later.");
      return;
    }

    setLoggedInUser(existingUser);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, existingUser);
    toast.success("Logged in successfully!");
    return true;
  };

  const signOut = () => {
    setLoggedInUser(null);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, null);
    toast.success("Signed out successfully!");
  };

  const value = {
    users,
    signUp,
    signIn,
    signOut,
    loggedInUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
