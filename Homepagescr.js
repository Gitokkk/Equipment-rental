document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("startupUser");

    if (storedUser) {
        // Find all login buttons (desktop and mobile)
        const loginButtons = document.querySelectorAll("#login-btn-desk, #login-btn-mob, .login-button, .loginmob");

        loginButtons.forEach((loginButton) => {
            loginButton.textContent = storedUser;
            loginButton.style.backgroundColor = "#fff1b7";

            // Remove the link so it doesn't go back to login.html
            const parentLink = loginButton.closest("a");
            if (parentLink) {
                parentLink.removeAttribute("href");
            }

            // Click to logout
            loginButton.onclick = (e) => {
                e.preventDefault();
                if (confirm("Log out?")) {
                    localStorage.removeItem("startupUser");
                    location.reload();
                }
            };
        });
    }
});