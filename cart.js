document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("startupUser");
    const storedCollege = localStorage.getItem("startupCollege");

    if (storedCollege) {
        document.querySelectorAll(".location").forEach((el) => {
            el.textContent = storedCollege;
        });
    }

    if (storedUser) {
        const loginButtons = document.querySelectorAll("#login-btn-desk, #login-btn-mob, .login-button, .loginmob");

        loginButtons.forEach((loginButton) => {
            loginButton.textContent = storedUser;
            loginButton.style.backgroundColor = "#fffffd";
            loginButton.style.color = "#14532d";

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
                window.location.replace("index.html");
            });
        });

        document.addEventListener("click", () => {
            document.querySelectorAll(".logout-popup").forEach(box => box.style.display = "none");
        });
    }

    if (!storedUser) {
        const popup = document.getElementById("custom-popup");
        if (popup) popup.style.display = "flex";
    } else {
        renderCart();
    }

    function renderCart() {
        const cartContainer = document.getElementById("cart-container");
        if (!cartContainer) return;
        
        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

        if (cart.length === 0) {
            cartContainer.innerHTML = `<div class="nothing"><h2>Your cart is empty!</h2></div>`;
            return;
        }

        cartContainer.innerHTML = ""; 

        cart.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("equipment-card");
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <p class="price">${item.price}</p>
                    
                    <div class="cart-controls">
                        <div class="quantity-picker">
                            <button class="qty-btn minus-btn">-</button>
                            <span class="qty-count">${item.quantity}</span>
                            <button class="qty-btn plus-btn">+</button>
                        </div>
                        <button class="remove-btn">Remove</button>
                    </div>
                </div>
            `;

            card.querySelector(".minus-btn").addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    localStorage.setItem("cartItems", JSON.stringify(cart));
                    renderCart();
                }
            });

            card.querySelector(".plus-btn").addEventListener("click", () => {
                item.quantity++;
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });

            card.querySelector(".remove-btn").addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });

            cartContainer.appendChild(card);
        });

        const submitSection = document.createElement("div");
        submitSection.className = "checkout-section";
        submitSection.innerHTML = `
            <button id="submit-cart-btn" class="submit-btn">Confirm & Submit Order</button>
        `;
        cartContainer.appendChild(submitSection);

        document.getElementById("submit-cart-btn").addEventListener("click", () => {
            const confirmPopup = document.getElementById("confirm-popup");
            const errorMsg = document.getElementById("time-error-msg");
            if (errorMsg) errorMsg.style.display = "none";
            if (confirmPopup) confirmPopup.style.display = "flex";
        });
    }

    const yesBtn = document.getElementById("popup-yes-btn");
    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            const deliveryInput = document.getElementById("delivery-time-input");
            const returnInput = document.getElementById("return-time-input");
            const errorMsg = document.getElementById("time-error-msg");

            if (!deliveryInput.value || !returnInput.value) {
                errorMsg.textContent = "Please select both delivery and return times.";
                errorMsg.style.display = "block";
                return;
            }

            const deliveryVal = new Date(deliveryInput.value);
            const returnVal = new Date(returnInput.value);
            
            // Compare timestamps directly using local time values
            const now = new Date();
            const minAllowedTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

            const hours = deliveryVal.getHours();

            // Validate delivery hours: 8:00 AM (8) to 5:00 PM (17)
            if (hours < 8 || hours >= 17) {
                errorMsg.textContent = "Delivery time must be between 8:00 AM and 5:00 PM.";
                errorMsg.style.display = "block";
                return;
            }

            // Validate advance notice: at least 2 hours ahead
            if (deliveryVal < minAllowedTime) {
                errorMsg.textContent = "Delivery must be requested at least 2 hours in advance.";
                errorMsg.style.display = "block";
                return;
            }

            // Validate return time is after delivery time
            if (returnVal <= deliveryVal) {
                errorMsg.textContent = "Return time must be after the delivery time.";
                errorMsg.style.display = "block";
                return;
            }

            errorMsg.style.display = "none";
            const confirmPopup = document.getElementById("confirm-popup");
            const submitPopup = document.getElementById("submit-popup");
            if (confirmPopup) confirmPopup.style.display = "none";
            
            localStorage.removeItem("cartItems");
            
            if (submitPopup) submitPopup.style.display = "flex";
        });
    }

    const noBtn = document.getElementById("popup-no-btn");
    if (noBtn) {
        noBtn.addEventListener("click", () => {
            const confirmPopup = document.getElementById("confirm-popup");
            const errorMsg = document.getElementById("time-error-msg");
            if (errorMsg) errorMsg.style.display = "none";
            if (confirmPopup) confirmPopup.style.display = "none";
        });
    }

    const homeBtn = document.getElementById("popup-home-btn");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.replace("index.html");
        });
    }

    const loginBtn = document.getElementById("popup-login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.replace("login.html");
        });
    }

    const closeBtn = document.getElementById("popup-close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            window.location.replace("index.html");
        });
    }
});