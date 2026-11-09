document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("startupUser");

    if (storedUser) {
        const loginButtons = document.querySelectorAll("#login-btn-desk, #login-btn-mob, .login-button, .loginmob");

        loginButtons.forEach((loginButton) => {
            loginButton.textContent = storedUser;
            loginButton.style.backgroundColor = "#fffffd";
            loginButton.style.color = "#14532d";

            // Remove link redirection
            const parentLink = loginButton.closest("a");
            if (parentLink) {
                parentLink.removeAttribute("href");
            }

            const logoutBox = document.createElement("div");
            logoutBox.textContent = "Log Out";
            logoutBox.className = "logout-popup";
            document.body.appendChild(logoutBox);

            loginButton.addEventListener("click", (e) => {
                e.stopPropagation();
                const rect = loginButton.getBoundingClientRect();
                logoutBox.style.top = (rect.bottom + window.scrollY + 5) + "px";
                logoutBox.style.left = (rect.left + window.scrollX) + "px";
                logoutBox.style.display = logoutBox.style.display === "block" ? "none" : "block";
            });

            logoutBox.addEventListener("click", () => {
                localStorage.removeItem("startupUser");
                localStorage.removeItem("startupCollege");
                location.reload();
            });
        });

        document.addEventListener("click", () => {
            document.querySelectorAll(".logout-popup").forEach(box => box.style.display = "none");
        });
    }

    
    const storedCollege = localStorage.getItem("startupCollege");
    if (storedCollege) {
        const locationElements = document.querySelectorAll(".location");
        locationElements.forEach((el) => {
            el.textContent = storedCollege;
        });
    }
});