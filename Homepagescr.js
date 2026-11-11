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
                window.location.replace("index.html");
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

    const equipmentList = [
        { name: "Dissection Kit", description: "Dushala Biology Student Dissection Kit, 19 Professional Instruments for Biology Practicals", price: "₹10/hour", image: "kit.png" },
        { name: "Pen Drive", description: "SanDisk Cruzer Blade 128GB USB 2.0 Pen Drive", price: "₹15/hour", image: "pendrive.png" },
        { name: "Scientific Calculator", description: "Casio Fx-350Ms 2Nd Gen Non-Programmable Scientific Calculator, 240 Functions and 2-Line Display", price: "₹20/hour", image: "calc.png" },
        { name: "Lab coat", description: "SCHOFIC Unisex Lab Coat Apron with Full Sleeves & 3 Pockets (size-34)", price: "₹15/hour", image: "coat.png" },
        { name: "Safety goggles", description: "Spotview Chemical Protection Safety Goggles Adjustable Strap Minimum Lens Fogging", price: "₹15/hour", image: "goggles.png" },
        { name: "Raspberry pi", description: "Raspberry Pi 4 Model B", price: "₹30/hour", image: "raspbery.png" },
        { name: "Arduino uno", description: "Arduino Uno Rev3", price: "₹35/hour", image: "arduino.png" }
    ];

    const container = document.getElementById("equipment-container");

    function renderEquipment(items) {
        container.innerHTML = ""; 

        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("equipment-card");
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <p class="price">${item.price}</p>
                    <button class="rent-btn">Rent Now</button>
                </div>
            `;
            
            const rentBtn = card.querySelector(".rent-btn");
            rentBtn.addEventListener("click", () => {
                const currentUser = localStorage.getItem("startupUser");
                if (!currentUser) {
                    document.getElementById("custom-popup").style.display = "flex";
                } else {
                    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
                    if (!cart.some(c => c.name === item.name)) {
    cart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cart));
}
                    rentBtn.textContent = "Added to cart!";
                    rentBtn.style.backgroundColor = "#fff1b7";
                    rentBtn.style.color = "#14532d";
                    rentBtn.disabled = true;
                }
            });

            container.appendChild(card);
        });
    }

    renderEquipment(equipmentList);

    function handleSearch() {
        const deskInput = document.getElementById("equipment_search_desk");
        const mobInput = document.getElementById("equipment_search_mob");
        
        const query = (deskInput ? deskInput.value : "").trim() || (mobInput ? mobInput.value : "").trim();
        const searchTerm = query.toLowerCase();

        const filteredList = equipmentList.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );

        renderEquipment(filteredList);
    }

    const deskSearchBtn = document.getElementById("search_button_desk");
    if (deskSearchBtn) {
        deskSearchBtn.addEventListener("click", handleSearch);
    }

    const mobSearchBtn = document.getElementById("search_button_mob");
    if (mobSearchBtn) {
        mobSearchBtn.addEventListener("click", handleSearch);
    }

    const deskInput = document.getElementById("equipment_search_desk");
    if (deskInput) {
        deskInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSearch();
        });
    }

    const mobInput = document.getElementById("equipment_search_mob");
    if (mobInput) {
        mobInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSearch();
        });
    }

    document.getElementById("popup-login-btn").addEventListener("click", () => {
        window.location.replace("login.html");
    });

    document.getElementById("popup-close-btn").addEventListener("click", () => {
        document.getElementById("custom-popup").style.display = "none";
    });
});