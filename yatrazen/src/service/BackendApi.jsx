import axios from "axios";

// Use environment variable for API base URL
// In production: set VITE_API_BASE_URL to your deployed backend URL
// In development: defaults to localhost
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if(user?.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  // Debug: log the request body
  if (config.url === '/trips' && config.method === 'post') {
    console.log('Request body being sent:', JSON.stringify(config.data, null, 2));
  }
  return config;
})

export const createTrip = async(tripData) => {
  const resp = await apiClient.post("/trips", tripData);
  return resp.data;
}

export const getTripById = async(tripId) => {
  const resp = await apiClient.get(`/trips/${tripId}`);
  return resp.data;
}

export const getUserTrips = async(userEmail) => {
  const resp = await apiClient.get(`/trips/user/${encodeURIComponent(userEmail)}`);
  return resp.data;
}

export const searchPlaces = async(textQuery) => {
  const resp = await apiClient.post('/places/search', { textQuery });
  return resp.data;
}

export const verifyToken = async(token) => {
  const resp = await apiClient.post('/auth/verify-token', {token});
  return resp.data;
}