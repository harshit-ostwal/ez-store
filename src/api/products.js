import axiosInstance from "@/lib/axios";

export const getAllProducts = async () => {
  try {
    const res = await axiosInstance.get("/products?limit=500&skip=77");
    return res.data.products;
  } catch (error) {
    throw new Error("Failed to fetch products", { cause: error });
  }
};

export const getLimitedProducts = async ({ limit = 10, skip = 77 } = {}) => {
  try {
    const res = await axiosInstance.get(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return res.data.products;
  } catch (error) {
    throw new Error("Failed to fetch limited products", { cause: error });
  }
};

export const getTrendingProducts = async ({ limit = 10, skip = 77 } = {}) => {
  try {
    const res = await axiosInstance.get(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return res.data.products;
  } catch (error) {
    throw new Error("Failed to fetch trending products", { cause: error });
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch product with id ${id}`, {
      cause: error,
    });
  }
};

export const searchProducts = async (query) => {
  try {
    const res = await axiosInstance.get(
      `/products/search?q=${encodeURIComponent(query)}`,
    );
    return res.data.products;
  } catch (error) {
    throw new Error(`Failed to search products with query "${query}"`, {
      cause: error,
    });
  }
};

export const getProductsCategories = async () => {
  try {
    const res = await axiosInstance.get("/products/categories");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch product categories", { cause: error });
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const res = await axiosInstance.get(`/products/category/${category}`);
    return res.data.products;
  } catch (error) {
    throw new Error(`Failed to fetch products for category "${category}"`, {
      cause: error,
    });
  }
};
