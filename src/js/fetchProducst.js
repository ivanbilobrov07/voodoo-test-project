import axios from 'axios';

axios.defaults.baseURL = 'https://voodoo-sandbox.myshopify.com';

export const fetchProductsByPage = async (quantity, page = 1) => {
  try {
    const response = await axios.get(
      `/products.json?limit=${quantity}&page=${page}`
    );

    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`/products.json?limit=461`);

    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};
