// Signup page functionality
import { AuthService } from '../services/authService.js';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('form');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = signupForm.elements['email'].value;
      const username = signupForm.elements['username'].value;
      const password = signupForm.elements['password'].value;

      try {
        const { token } = await AuthService.register(email, username, password);

        // Get user details and store session
        const user = await AuthService.getCurrentUser(token);
        AuthService.storeUserSession(token, user);

        // Redirect to home page after successful registration
        window.location.href = 'home.html';
      } catch (error) {
        alert(error.message);
      }
    });
  }

  // Redirect to home if already logged in
  if (AuthService.isAuthenticated()) {
    window.location.href = 'home.html';
  }
});