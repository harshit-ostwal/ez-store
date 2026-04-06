import React from "react";
import { Navigate, Outlet } from "react-router";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { useAuth } from "@/providers/AuthProvider";

function MainLayout() {
    const { loggedInUser } = useAuth();

    if (!loggedInUser) {
        return (
            <Navigate to="/auth/sign-in" replace state={{ from: location }} />
        );
    }

    return (
        <div className="flex flex-col min-h-screen items-center w-11/12 xl:max-w-4/5 mx-auto gap-10 py-10">
            <Navbar />
            <div className="flex-1 w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
