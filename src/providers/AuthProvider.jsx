import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { LocalStorageKeys } from "@/constants/storage-keys";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";

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

    const newUser = [
      ...users,
      {
        id: crypto.randomUUID(),
        lastLoginAt: null,
        ...data,
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

    if (!existingUser.password || existingUser.password !== data.password) {
      toast.error("Invalid credentials, Please try again later.");
      return;
    }

    setLoggedInUser(existingUser);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, existingUser);
    toast.success("Logged in successfully!");
    return true;
  };

  const signOut = (msg = true) => {
    setLoggedInUser(null);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, null);
    if (msg) {
      toast.success("Signed out successfully!");
    }
  };

  const updateProfile = async (data) => {
    const updateUser = {
      ...loggedInUser,
      fullName: data.fullName,
      updatedAt: new Date().toISOString(),
    };

    const updatedUsers = users.map((user) =>
      user.id === loggedInUser.id ? updateUser : user,
    );

    setUsers(updatedUsers);
    setLoggedInUser(updateUser);
    setLocalStorageItem(LocalStorageKeys.USERS, updatedUsers);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, updateUser);
    toast.success("Profile updated successfully!");
    return true;
  };

  const deleteAccount = () => {
    const updatedUsers = users.filter((user) => user.id !== loggedInUser.id);
    setUsers(updatedUsers);
    setLoggedInUser(null);
    setLocalStorageItem(LocalStorageKeys.USERS, updatedUsers);
    setLocalStorageItem(LocalStorageKeys.LOGGED_IN_USER, null);
    toast.success("Account deleted successfully!");
  };

  const value = {
    users,
    signUp,
    signIn,
    signOut,
    loggedInUser,
    deleteAccount,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
