import axios from 'axios';
import { products as fallbackProducts, categories as fallbackCategories } from '@/data/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.clickkarte.com/api';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || 'indivolt-store-uuid-5555-6666';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
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

// Formatted fallback categories
const defaultCategories = fallbackCategories.map((c) => ({
  id: c.id,
  name: c.label,
  imageUrl: c.image,
  slug: c.slug,
}));

// Formatted fallback products helper
const getFallbackProducts = (params = {}) => {
  let list = fallbackProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    mrp: p.originalPrice,
    imageUrl: p.image,
    category: p.category,
    description: p.description,
    metadata: {
      badge: p.badge,
      rating: p.rating,
      specs: p.specs,
      images: [p.image],
    },
  }));

  if (params.category) {
    const cat = String(params.category).toLowerCase().replace(/ /g, '-');
    list = list.filter((p) => {
      const pCat = String(p.category).toLowerCase().replace(/ /g, '-');
      return pCat === cat || pCat.startsWith(cat) || cat.startsWith(pCat);
    });
  }

  return list;
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    const data = response.data?.data;
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return defaultCategories;
  } catch (error) {
    console.warn('API getCategories failed, using fallback data:', error.message);
    return defaultCategories;
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    const data = response.data?.data;
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return getFallbackProducts(params);
  } catch (error) {
    console.warn('API getProducts failed, using fallback data:', error.message);
    return getFallbackProducts(params);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    if (response.data?.data) {
      return response.data.data;
    }
  } catch (error) {
    console.warn(`API getProductById(${id}) failed, checking fallback:`, error.message);
  }

  const fallback = fallbackProducts.find((p) => String(p.id) === String(id));
  if (fallback) {
    return {
      id: fallback.id,
      name: fallback.name,
      price: fallback.price,
      mrp: fallback.originalPrice,
      imageUrl: fallback.image,
      category: fallback.category,
      description: fallback.description,
      metadata: {
        badge: fallback.badge,
        rating: fallback.rating,
        specs: fallback.specs,
        images: [fallback.image],
      },
    };
  }

  return null;
};

export const createOrder = async (orderData) => {
  try {
    const payload = {
      storeId: STORE_ID,
      ...orderData,
    };
    const response = await api.post('/orders', payload);
    return response.data;
  } catch (error) {
    console.error('API createOrder failed:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
