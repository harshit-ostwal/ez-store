import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { ProductProvider } from "./providers/ProductProvider";
import AppRoutes from "./routes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ProductProvider>
            <AppRoutes />
        </ProductProvider>
        <Toaster />
    </AuthProvider>
);
