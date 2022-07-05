import { apiClient } from './api';

export const fwtService = {
  getPaintings: (params = {}) => apiClient.get(`paintings`, { params }),
  getAuthors: (params = {}) => apiClient.get(`authors`, { params }),
  getLocations: (params = {}) => apiClient.get(`locations`, { params }),
};
