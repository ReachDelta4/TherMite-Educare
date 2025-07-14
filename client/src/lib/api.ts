// API client for TherMite Educare
// This can work both with local development and Vercel serverless functions

const API_URL = import.meta.env.PROD 
  ? '/api' // In production, use relative URL for API calls
  : 'http://localhost:5000/api'; // In development, use local server

// Helper for making API requests
export async function fetchAPI<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred',
    }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  // For 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// API functions
export const api = {
  // Health check
  health: () => fetchAPI('/health'),
  
  // Auth
  login: (credentials: { email: string; password: string }) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  logout: () => fetchAPI('/auth/logout', { method: 'POST' }),
  
  // User
  getCurrentUser: () => fetchAPI('/users/me'),
  
  // Any other API endpoints your app needs
}; 