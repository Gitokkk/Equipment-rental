document.addEventListener("DOMContentLoaded", () => {
    // 1. Handle Login State
    const storedUser = localStorage.getItem("startupUser");
    if (storedUser) {
        const loginButtons = document.querySelectorAll("#login-btn-desk, #login-btn-mob, .login-button, .loginmob");

        loginButtons.forEach((loginButton) => {
            loginButton.textContent = storedUser;
            loginButton.style.backgroundColor = "#fffffd";

            const parentLink = loginButton.closest("a");
            if (parentLink) {
                parentLink.removeAttribute("href");
            }

            loginButton.onclick = (e) => {
                e.preventDefault();
                if (confirm("Log out?")) {
                    localStorage.removeItem("startupUser");
                    localStorage.removeItem("startupCollege");
                    location.reload();
                }
            };
        });
    }

    // 2. Handle College Location Display
    const storedCollege = localStorage.getItem("startupCollege");
    if (storedCollege) {
        const locationElements = document.querySelectorAll(".location");
        locationElements.forEach((el) => {
            el.textContent = storedCollege;
        });
    }
});