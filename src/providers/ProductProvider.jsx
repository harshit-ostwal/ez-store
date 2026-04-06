import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { LocalStorageKeys } from "@/constants/storage-keys";
import {
    getLocalStorageItem,
    setLocalStorageItem,
} from "@/utils/localStorage.utils";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [carts, setCarts] = useState(
        getLocalStorageItem(LocalStorageKeys.CARTS) || []
    );

    const [whishlist, setWhishlist] = useState(
        getLocalStorageItem(LocalStorageKeys.WHISHLIST) || []
    );

    const findProductInCart = (product) => {
        return carts.find((cart) => cart.id === product.id);
    };

    const findProductInWhishlist = (product) => {
        return whishlist.find((wish) => wish.id === product.id);
    };

    const addToCart = (product) => {
        const existingProduct = findProductInCart(product);
        if (existingProduct) {
            const updateProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity + 1,
            };
            const updateCart = carts.map((cart) =>
                cart.id === product.id ? updateProduct : cart
            );

            setCarts(updateCart);
            setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
            toast.success("Product quantity updated in cart.");
            return;
        }

        const productCart = [...carts, { ...product, quantity: 1 }];
        setCarts(productCart);
        setLocalStorageItem(LocalStorageKeys.CARTS, productCart);
        toast.success("Product added to cart.");
    };

    const toggleWhishlist = (product) => {
        const existingProduct = findProductInWhishlist(product);
        if (existingProduct) {
            const updateWhishlist = whishlist.filter(
                (wish) => wish.id !== product.id
            );
            setWhishlist(updateWhishlist);
            setLocalStorageItem(LocalStorageKeys.WHISHLIST, updateWhishlist);
            toast.success("Product removed from whishlist.");
            return;
        }

        const productWhishlist = [...whishlist, product];
        setWhishlist(productWhishlist);
        setLocalStorageItem(LocalStorageKeys.WHISHLIST, productWhishlist);
        toast.success("Product added to whishlist.");
    };

    const increaseQuantity = (product) => {
        const existingProduct = findProductInCart(product);
        if (existingProduct) {
            const updateProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity + 1,
            };
            const updateCart = carts.map((cart) =>
                cart.id === product.id ? updateProduct : cart
            );

            setCarts(updateCart);
            setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
            toast.success("Product quantity increased.");
        }
    };

    const decreaseQuantity = (product) => {
        const existingProduct = findProductInCart(product);
        if (existingProduct && existingProduct.quantity > 1) {
            const updateProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity - 1,
            };
            const updateCart = carts.map((cart) =>
                cart.id === product.id ? updateProduct : cart
            );

            setCarts(updateCart);
            setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
            toast.success("Product quantity decreased.");
            return;
        } else if (existingProduct && existingProduct.quantity === 1) {
            const updateCart = carts.filter((cart) => cart.id !== product.id);
            setCarts(updateCart);
            setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
            toast.success("Product removed from cart.");
        }
    };

    return (
        <ProductContext.Provider
            value={{
                carts,
                whishlist,
                addToCart,
                toggleWhishlist,
                findProductInCart,
                findProductInWhishlist,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
