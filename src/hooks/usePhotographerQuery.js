import { useQuery } from '@tanstack/react-query';
import { photographersAPI } from '../services/api';

export const usePhotographerQuery = () => {
  // Get photographers list query
  const { 
    data: photographers, 
    isLoading: isLoadingPhotographers,
    error: photographersError,
    refetch: refetchPhotographers
  } = useQuery({
    queryKey: ['photographers-list'],
    queryFn: async () => {
      try {
        const response = await photographersAPI.getList();
        return response.data.result;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch photographers');
      }
    },
  });

  return {
    photographers,
    isLoadingPhotographers,
    photographersError,
    refetchPhotographers
  };
}; 