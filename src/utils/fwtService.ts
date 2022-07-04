import { apiClient } from './api';

export const fwtService = {
  getPaintings: () => apiClient.get('paintings'),
  getAuthors: () => apiClient.get('authors'),
  getLocations: () => apiClient.get('locations'),
};
