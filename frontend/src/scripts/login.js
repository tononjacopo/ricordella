// Login page functionality
import { AuthService } from '../services/authService.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = loginForm.elements['username'].value;
      const password = loginForm.elements['password'].value;

      try {
        // Since our backend expects email, we'll treat username as email here
        const { token, user } = await AuthService.login(username, password);
        AuthService.storeUserSession(token, user);

        // Redirect to home page after successful login
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