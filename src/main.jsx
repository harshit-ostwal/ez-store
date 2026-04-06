import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Toaster } from "@/components/ui/sonner";
import { ProductProvider } from "./providers/ProductProvider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductProvider>
      <AppRoutes />
    </ProductProvider>
    <Toaster />
  </AuthProvider>,
);
