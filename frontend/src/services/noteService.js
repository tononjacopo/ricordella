// Service for handling notes
import {AuthService} from "./authService";

const API_BASE_URL = 'http://localhost:5000/api/notes';

export class NoteService {
  // Get all notes for user
  static async getAll() {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }

      return await response.json();
    } catch (error) {
      console.error('Get notes error:', error);
      throw error;
    }
  }

  // Get today's notes
  static async getTodayNotes() {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${API_BASE_URL}/today`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch today notes');
      }

      return await response.json();
    } catch (error) {
      console.error('Get today notes error:', error);
      throw error;
    }
  }

  // Create a new note
  static async create(title, content, priority = 1) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, priority }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create note');
      }

      return await response.json();
    } catch (error) {
      console.error('Create note error:', error);
      throw error;
    }
  }

  // Update a note
  static async update(id, title, content, priority) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, priority }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update note');
      }

      return await response.json();
    } catch (error) {
      console.error('Update note error:', error);
      throw error;
    }
  }

  // Delete a note
  static async delete(id) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      return true;
    } catch (error) {
      console.error('Delete note error:', error);
      throw error;
    }
  }
}