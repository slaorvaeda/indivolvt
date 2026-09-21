import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || 'indivolt-store-uuid-5555-6666';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject storeId query parameter for GET requests
api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = {
      storeId: STORE_ID,
      ...config.params,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export default api;
