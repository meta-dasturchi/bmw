

// ======================================
// BMW MODELS DATA
// ======================================

const cars = [
    {
        name: "BMW M4 Competition",
        description: "High Performance Coupe",
        price: 78000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
        power: "503 HP"
    },
    {
        name: "BMW M3 Competition",
        description: "Pure Driving Performance",
        price: 76000,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200",
        power: "503 HP"
    },
    {
        name: "BMW M5",
        description: "Luxury Sports Sedan",
        price: 120000,
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200",
        power: "717 HP"
    },
    {
        name: "BMW M8 Competition",
        description: "Ultimate Luxury Performance",
        price: 140000,
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200",
        power: "617 HP"
    },
    {
        name: "BMW X5",
        description: "Luxury Sports Activity Vehicle",
        price: 67000,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200",
        power: "375 HP"
    },
    {
        name: "BMW X6",
        description: "Powerful Sports Activity Coupe",
        price: 75000,
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200",
        power: "375 HP"
    },
    {
        name: "BMW X7",
        description: "Ultimate Luxury SUV",
        price: 85000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200",
        power: "375 HP"
    },
    {
        name: "BMW i4",
        description: "All-Electric Gran Coupe",
        price: 57000,
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200",
        power: "396 HP"
    },
    {
        name: "BMW i7",
        description: "Electric Luxury Sedan",
        price: 105000,
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200",
        power: "536 HP"
    },
    {
        name: "BMW Z4",
        description: "Pure Roadster Experience",
        price: 54000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
        power: "382 HP"
    }
];


// ======================================
// CAROUSEL
// ======================================

let currentIndex = 0;

const hero = document.querySelector(".hero");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const currentSlide = document.getElementById("currentSlide");
const indicators = document.getElementById("indicators");


// Carousel indicators yaratish

cars.forEach((car, index) => {

    const dot = document.createElement("button");

    dot.classList.add("indicator");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    indicators.appendChild(dot);

});


// Slide almashtirish funksiyasi

function showSlide(index) {

    currentIndex = (index + cars.length) % cars.length;

    const car = cars[currentIndex];

    hero.style.backgroundImage =
        `url("${car.image}")`;

    heroTitle.textContent = car.name;

    heroDescription.textContent =
        `${car.description} | ${car.power}`;

    currentSlide.textContent =
        String(currentIndex + 1).padStart(2, "0");

    document.querySelectorAll(".indicator").forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentIndex
        );

    });

}


// Oldingi avtomobil

document.getElementById("prevBtn").addEventListener("click", () => {

    showSlide(currentIndex - 1);

});


// Keyingi avtomobil

document.getElementById("nextBtn").addEventListener("click", () => {

    showSlide(currentIndex + 1);

});


// Avtomatik carousel

let carouselTimer = setInterval(() => {

    showSlide(currentIndex + 1);

}, 5000);


// ======================================
// MODEL CARDS
// ======================================

const modelGrid = document.getElementById("modelGrid");

cars.forEach((car, index) => {

    const card = document.createElement("div");

    card.className = "model-card";

    card.innerHTML = `

        <img src="${car.image}" alt="${car.name}">

        <div class="model-info">

            <h3>${car.name}</h3>

            <p>${car.description}</p>

            <h4>From $${car.price.toLocaleString("en-US")}</h4>

            <button onclick="selectCar(${index})">
                EXPLORE MODEL
            </button>

        </div>

    `;

    modelGrid.appendChild(card);

});


// ======================================
// CONFIGURATOR
// ======================================

const modelSelect = document.getElementById("modelSelect");

const configImage = document.getElementById("configImage");

const configName = document.getElementById("configName");

const configSubtitle = document.getElementById("configSubtitle");

const carPrice = document.getElementById("carPrice");

const colorName = document.getElementById("colorName");

let selectedCar = 0;

let selectedColor = "Black";


// Narxni formatlash

function formatPrice(price) {

    return "$" + price.toLocaleString("en-US");

}


// Configurator yangilash

function updateConfigurator(index) {

    selectedCar = index;

    const car = cars[index];

    configImage.src = car.image;

    configName.textContent = car.name;

    configSubtitle.textContent =
        `${car.description} | ${car.power}`;

    carPrice.textContent = formatPrice(car.price);

    modelSelect.value = index;

    updateCarColor();

}


// Select orqali model tanlash

modelSelect.addEventListener("change", (event) => {

    updateConfigurator(Number(event.target.value));

});


// Model kartasidan configuratorga o'tish

function selectCar(index) {

    updateConfigurator(index);

    document.getElementById("configurator").scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================
// COLOR SELECTION
// ======================================

const colorButtons = document.querySelectorAll(".color-circle");

const colorFilters = {
    Black: "brightness(0.65) saturate(0.8)",
    White: "grayscale(0.3) brightness(1.3)",
    Red: "hue-rotate(125deg) saturate(1.5)",
    Blue: "hue-rotate(190deg) saturate(1.4)",
    Grey: "grayscale(0.8) brightness(0.9)"
};


colorButtons.forEach(button => {

    button.addEventListener("click", () => {

        colorButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedColor = button.dataset.color;

        colorName.textContent = selectedColor;

        updateCarColor();

    });

});


// Rang effektini qo'llash

function updateCarColor() {

    configImage.style.filter =
        colorFilters[selectedColor];

}


// ======================================
// REQUEST INFORMATION
// ======================================

document.getElementById("orderBtn").addEventListener("click", () => {

    const car = cars[selectedCar];

    alert(
        `Selected BMW: ${car.name}\n` +
        `Color: ${selectedColor}\n` +
        `Estimated Price: ${formatPrice(car.price)}\n\n` +
        `Thank you for your interest!`
    );

});


// ======================================
// MOBILE NAVBAR
// ======================================

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Navbar link bosilganda menyuni yopish

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ======================================
// CONTACT FORM
// ======================================

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("userName").value.trim();

    const email = document.getElementById("userEmail").value.trim();

    const message = document.getElementById("userMessage").value.trim();

    if (!name || !email || !message) {

        formMessage.textContent = "Please fill in all fields!";

        return;

    }

    formMessage.textContent =
        "Thank you, " + name + "! Your demo message is ready.";

    contactForm.reset();

});


// ======================================
// INITIALIZATION
// ======================================

showSlide(0);

updateConfigurator(0);














