import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { useAuth } from "@/providers/AuthProvider";

function MainLayout() {
    const { loggedInUser } = useAuth();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

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
