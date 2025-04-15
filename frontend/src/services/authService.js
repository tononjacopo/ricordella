// Service for handling authentication
const API_BASE_URL = 'http://localhost:5000/api/auth';

export class AuthService {
  // Register a new user
  static async register(email, username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  // Store user session
  static storeUserSession(token, user) {
    localStorage.setItem('inkdrop_token', token);
    localStorage.setItem('inkdrop_user', JSON.stringify(user));
  }

  // Clear user session
  static clearUserSession() {
    localStorage.removeItem('inkdrop_token');
    localStorage.removeItem('inkdrop_user');
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem('inkdrop_token');
  }

  // Get stored token
  static getToken() {
    return localStorage.getItem('inkdrop_token');
  }

  // Get stored user
  static getUser() {
    const user = localStorage.getItem('inkdrop_user');
    return user ? JSON.parse(user) : null;
  }
}