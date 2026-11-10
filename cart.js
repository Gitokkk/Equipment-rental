document.addEventListener("DOMContentLoaded", () => {
    
    const storedUser = localStorage.getItem("startupUser");

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

    
    if (!storedUser) {
        document.getElementById("custom-popup").style.display = "flex";
    } else {
        renderCart();
    }

    function renderCart() {
        const cartContainer = document.getElementById("cart-container");
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
            document.getElementById("confirm-popup").style.display = "flex";
        });
    }


    const yesBtn = document.getElementById("popup-yes-btn");
    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            document.getElementById("confirm-popup").style.display = "none";
            localStorage.removeItem("cartItems");
            document.getElementById("submit-popup").style.display = "flex";
        });
    }

    const noBtn = document.getElementById("popup-no-btn");
    if (noBtn) {
        noBtn.addEventListener("click", () => {
            document.getElementById("confirm-popup").style.display = "none";
        });
    }


    const homeBtn = document.getElementById("popup-home-btn");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    const loginBtn = document.getElementById("popup-login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }

    const closeBtn = document.getElementById("popup-close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});