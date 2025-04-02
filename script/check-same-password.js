document.addEventListener('DOMContentLoaded', function () {
        var form = document.querySelector('form');

        form.addEventListener('submit', function (event) {
                var password = form.querySelector('input[name="password"]').value;
                var confirmPassword = form.querySelector('input[name="confirm_password"]').value;

                if (password !== confirmPassword) {
                        alert('The passwords do not match!');
                        event.preventDefault();
                }
        });
});
