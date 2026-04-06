import { lazy, Suspense } from "react";
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
import AuthLayout from "../layouts/AuthLayout.jsx";

const About = lazy(() => import("@/pages/about.jsx"));
const App = lazy(() => import("@/pages/app.jsx"));
const Categories = lazy(() => import("@/pages/categories.jsx"));
const Category = lazy(() => import("@/pages/category.jsx"));
const Contact = lazy(() => import("@/pages/contact.jsx"));
const ProductDetails = lazy(() => import("@/pages/product-details.jsx"));
const Products = lazy(() => import("@/pages/products.jsx"));
const Profile = lazy(() => import("@/pages/profile.jsx"));
const Whishlist = lazy(() => import("@/pages/whislist.jsx"));
const SignIn = lazy(() => import("../pages/auth/sign-in.jsx"));
const SignUp = lazy(() => import("../pages/auth/sign-up.jsx"));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

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
          element: (
            <SuspenseWrapper>
              <App />
            </SuspenseWrapper>
          ),
        },
        {
          path: "categories",
          loader: async () => {
            const categories = await getProductsCategories();
            return { categories };
          },
          hydrateFallbackElement: <Loading />,
          element: (
            <SuspenseWrapper>
              <Categories />
            </SuspenseWrapper>
          ),
        },
        {
          path: "products",
          loader: async () => {
            const allProducts = await getAllProducts();
            return { allProducts };
          },
          hydrateFallbackElement: <Loading />,
          element: (
            <SuspenseWrapper>
              <Products />
            </SuspenseWrapper>
          ),
        },
        {
          path: "products/category/:category",
          loader: async ({ params }) => {
            const allProducts = await getProductsByCategory(params.category);
            return { allProducts };
          },
          hydrateFallbackElement: <Loading />,
          element: (
            <SuspenseWrapper>
              <Category />
            </SuspenseWrapper>
          ),
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
          element: (
            <SuspenseWrapper>
              <ProductDetails />
            </SuspenseWrapper>
          ),
        },
        {
          path: "my",
          hydrateFallbackElement: <Loading />,
          children: [
            {
              path: "whishlist",
              hydrateFallbackElement: <Loading />,
              element: (
                <SuspenseWrapper>
                  <Whishlist />
                </SuspenseWrapper>
              ),
            },
            {
              path: "profile",
              hydrateFallbackElement: <Loading />,
              element: (
                <SuspenseWrapper>
                  <Profile />
                </SuspenseWrapper>
              ),
            },
          ],
        },
        {
          path: "about",
          element: (
            <SuspenseWrapper>
              <About />
            </SuspenseWrapper>
          ),
        },
        {
          path: "contact",
          hydrateFallbackElement: <Loading />,
          element: (
            <SuspenseWrapper>
              <Contact />
            </SuspenseWrapper>
          ),
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
          element: (
            <SuspenseWrapper>
              <SignIn />
            </SuspenseWrapper>
          ),
        },
        {
          path: "sign-up",
          hydrateFallbackElement: <Loading />,
          element: (
            <SuspenseWrapper>
              <SignUp />
            </SuspenseWrapper>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
