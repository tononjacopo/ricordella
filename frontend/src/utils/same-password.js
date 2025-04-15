// Password confirmation validation
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.querySelector('input[name="password"]');
  const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');

  if (passwordInput && confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Passwords don't match");
      } else {
        confirmPasswordInput.setCustomValidity('');
      }
    });
  }
});