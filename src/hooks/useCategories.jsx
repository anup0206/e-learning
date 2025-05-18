

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://blog-1rng.onrender.com/category';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useCategories = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem('userId');

  // Fetch categories
  const fetchCategories = async () => {
    const response = await api.get('/');
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Create category
  const createCategory = useMutation({
    mutationFn: async (categoryData) => {
      const response = await api.post('/create', {
        ...categoryData,
        userId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Update category
  const updateCategory = useMutation({
    mutationFn: async ({ id, categoryData }) => {
      const response = await api.put(`/${id}`, {
        ...categoryData,
        userId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Delete category
  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
