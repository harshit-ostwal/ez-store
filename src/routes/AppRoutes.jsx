import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import {
    getAllProducts,
    getLimitedProducts,
    getProductById,
    getProductsByCategory,
    getProductsCategories,
    getTrendingProducts,
} from "@/api/products.js";
import Loading from "@/components/common/Loading.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";
import About from "@/pages/about.jsx";
import App from "@/pages/app.jsx";
import Categories from "@/pages/categories.jsx";
import Category from "@/pages/category.jsx";
import Contact from "@/pages/contact.jsx";
import ProductDetails from "@/pages/product-details.jsx";
import Products from "@/pages/products.jsx";
import Profile from "@/pages/profile.jsx";
import Whishlist from "@/pages/whislist.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import SignIn from "../pages/auth/sign-in.jsx";
import SignUp from "../pages/auth/sign-up.jsx";

function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            hydrateFallbackElement: <Loading />,
            children: [
                {
                    path: "/",
                    loader: async () => {
                        const [categories, trending, newArrivals, bestSellers] =
                            await Promise.all([
                                getProductsCategories(),
                                getTrendingProducts({ limit: 10, skip: 85 }),
                                getTrendingProducts({ limit: 10, skip: 125 }),
                                getTrendingProducts({ limit: 10, skip: 155 }),
                            ]);
                        return {
                            categories,
                            trending,
                            newArrivals,
                            bestSellers,
                        };
                    },
                    hydrateFallbackElement: <Loading />,
                    element: <App />,
                },
                {
                    path: "categories",
                    loader: async () => {
                        const categories = await getProductsCategories();
                        return { categories };
                    },
                    hydrateFallbackElement: <Loading />,
                    element: <Categories />,
                },
                {
                    path: "products",
                    loader: async () => {
                        const allProducts = await getAllProducts();
                        return { allProducts };
                    },
                    hydrateFallbackElement: <Loading />,
                    element: <Products />,
                },
                {
                    path: "products/category/:category",
                    loader: async ({ params }) => {
                        const allProducts = await getProductsByCategory(
                            params.category
                        );
                        return { allProducts };
                    },
                    hydrateFallbackElement: <Loading />,
                    element: <Category />,
                },
                {
                    path: "products/:id",
                    loader: async ({ params }) => {
                        const [limitedProducts, product] = await Promise.all([
                            getLimitedProducts({ skip: Number(params.id) }),
                            getProductById(params.id),
                        ]);
                        return { limitedProducts, product };
                    },
                    hydrateFallbackElement: <Loading />,
                    element: <ProductDetails />,
                },
                {
                    path: "my",
                    hydrateFallbackElement: <Loading />,
                    children: [
                        {
                            path: "whishlist",
                            hydrateFallbackElement: <Loading />,
                            element: <Whishlist />,
                        },
                        {
                            path: "profile",
                            hydrateFallbackElement: <Loading />,
                            element: <Profile />,
                        },
                    ],
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "contact",
                    hydrateFallbackElement: <Loading />,
                    element: <Contact />,
                },
                {
                    path: "*",
                    element: <Navigate to="/" replace />,
                },
            ],
        },
        {
            path: "/auth",
            element: <AuthLayout />,
            hydrateFallbackElement: <Loading />,
            children: [
                {
                    path: "sign-in",
                    hydrateFallbackElement: <Loading />,
                    element: <SignIn />,
                },
                {
                    path: "sign-up",
                    hydrateFallbackElement: <Loading />,
                    element: <SignUp />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default AppRoutes;
