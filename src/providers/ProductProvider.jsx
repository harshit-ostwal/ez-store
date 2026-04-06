import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { LocalStorageKeys } from "@/constants/storage-keys";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [carts, setCarts] = useState(
    getLocalStorageItem(LocalStorageKeys.CARTS) || [],
  );

  const [whishlist, setWhishlist] = useState(
    getLocalStorageItem(LocalStorageKeys.WHISHLIST) || [],
  );

  const totalCartItems = carts.reduce(
    (total, cart) => total + cart.quantity,
    0,
  );

  const totalCartPrice = carts.reduce(
    (total, cart) => total + cart.price * cart.quantity,
    0,
  );

  const totalDiscount = carts.reduce(
    (total, cart) =>
      total + (cart.price * cart.discountPercentage * cart.quantity) / 100,
    0,
  );

  const totalPriceAfterDiscount = totalCartPrice - totalDiscount;

  const cartSummary = {
    totalItems: totalCartItems,
    totalPrice: totalCartPrice.toFixed(2),
    totalDiscount: totalDiscount.toFixed(2),
    totalPriceAfterDiscount: totalPriceAfterDiscount.toFixed(2),
  };

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
        cart.id === product.id ? updateProduct : cart,
      );

      setCarts(updateCart);
      setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
      setOpen(true);
      return;
    }

    const productCart = [...carts, { ...product, quantity: 1 }];
    setCarts(productCart);
    setLocalStorageItem(LocalStorageKeys.CARTS, productCart);
    setOpen(true);
  };

  const toggleWhishlist = (product) => {
    const existingProduct = findProductInWhishlist(product);
    if (existingProduct) {
      const updateWhishlist = whishlist.filter(
        (wish) => wish.id !== product.id,
      );
      setWhishlist(updateWhishlist);
      setLocalStorageItem(LocalStorageKeys.WHISHLIST, updateWhishlist);
      return;
    }

    const productWhishlist = [...whishlist, product];
    setWhishlist(productWhishlist);
    setLocalStorageItem(LocalStorageKeys.WHISHLIST, productWhishlist);
  };

  const increaseQuantity = (product) => {
    const existingProduct = findProductInCart(product);
    if (existingProduct) {
      const updateProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };
      const updateCart = carts.map((cart) =>
        cart.id === product.id ? updateProduct : cart,
      );

      setCarts(updateCart);
      setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
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
        cart.id === product.id ? updateProduct : cart,
      );

      setCarts(updateCart);
      setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
      return;
    } else if (existingProduct && existingProduct.quantity === 1) {
      const updateCart = carts.filter((cart) => cart.id !== product.id);
      setCarts(updateCart);
      setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
    }
  };

  const removeFromCart = (product) => {
    const existingProduct = findProductInCart(product);
    if (existingProduct) {
      const updateCart = carts.filter((cart) => cart.id !== product.id);
      setCarts(updateCart);
      setLocalStorageItem(LocalStorageKeys.CARTS, updateCart);
    }
  };

  const clearCart = () => {
    setCarts([]);
    setLocalStorageItem(LocalStorageKeys.CARTS, []);
    toast.success("Cart cleared.");
  };

  const clearWhishlist = () => {
    setWhishlist([]);
    setLocalStorageItem(LocalStorageKeys.WHISHLIST, []);
    toast.success("Whishlist cleared.");
  };

  return (
    <ProductContext.Provider
      value={{
        open,
        setOpen,
        carts,
        setCarts,
        whishlist,
        setWhishlist,
        addToCart,
        toggleWhishlist,
        findProductInCart,
        findProductInWhishlist,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartSummary,
        clearCart,
        clearWhishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
