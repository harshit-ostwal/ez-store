import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Navigate, Outlet } from "react-router";

function AuthLayout() {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-dvh w-11/12 max-w-lg mx-auto flex items-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
