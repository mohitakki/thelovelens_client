import { useMutation, useQuery } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, logout, setError } from '../features/auth/stores/authSlice';
import { useLocalStorage } from './useLocalStorage';

export const useAuthQuery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setItem, removeItem } = useLocalStorage();

  // Get current user query
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await authAPI.getCurrentUser();
        return response.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Store token in localStorage
      setItem('token', data.data.result);
      
      // Update Redux state
      dispatch(setUser(data.data.result));
      
      // Navigate to dashboard
      navigate('/', { replace: true });

      // Return the response data
      return data.data.result;
    },
    onError: (error) => {
      dispatch(setError(error.response?.data?.message || "Login failed"));
      return error.response?.data || { success: false, message: "Login failed" };
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      // Store token in localStorage
      setItem('token', data.data.token);
      
      // Update Redux state
      dispatch(setUser(data.data.user));
      
      // Navigate to dashboard
      navigate('/dashboard');
    },
    onError: (error) => {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // Remove token from localStorage
      removeItem('token');
      
      // Update Redux state
      dispatch(logout());
      
      // Navigate to home
      navigate('/');
    },
    onError: () => {
      // Even if the API call fails, we still want to log out locally
      removeItem('token');
      dispatch(logout());
      navigate('/');
    },
  });

  return {
    user,
    isLoadingUser,
    login: (credentials) => {
      return loginMutation.mutateAsync(credentials);
    },
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}; 