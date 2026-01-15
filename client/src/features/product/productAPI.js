import axiosInstance from "../../service/api";

export const getProducts = async (page = 1, limit = 5) => {
  const res = await axiosInstance.get(
    `/products?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const searchProduct = async (term) => {
  const res = await axiosInstance.get(`/products/search?term=${term}`);
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data.product;
};



export const getProductReviews = async (id) => {
  const res = await axiosInstance.get(`/products/${id}/reviews`);
  return res.data;
};

export const addProductReview = async (id, data) => {
  const res = await axiosInstance.post(
    `/products/${id}/review`,
    data
  );
  return res.data;
};

