const lightboxGallery = document.querySelector(".lightbox-gallery");
const displayImage = document.querySelector(".lightbox-gallery__display-image");
const overlay = document.getElementById("lightbox-overlay");
const lightboxOverlay = overlay.querySelector(".lightbox-gallery--overlay");
const thumnailImages = lightboxGallery.querySelectorAll(".lightbox-gallery__thumbnail-image");

const overlayThumbnailImages = overlay.querySelectorAll(".lightbox-gallery__thumbnail-image");
const imageSlider = document.getElementById("image-slider");
const closeButton = document.getElementById("overlay-close-btn");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");

thumnailImages.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        const newSrc = thumbnail.src.replace("-thumbnail", "");
        currentIndex = index;

        const currentImage = imageSlider.querySelector("img");
        const newImage = currentImage.cloneNode(true);
        newImage.src = newSrc;

        imageSlider.appendChild(newImage);

        imageSlider.style.transform = "translateX(-100%)";

        setTimeout(() => {
            imageSlider.removeChild(currentImage);

            imageSlider.style.transition = "none";
            imageSlider.style.transform = "translateX(0)";

            void imageSlider.offsetWidth;

            imageSlider.style.transition = "transform 0.5s ease-in-out";
        }, 500);

        updateActiveThumbnail(currentIndex);
    });
});

imageSlider.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("lightbox-gallery__display-image")) {
        overlay.classList.add("active");
        overlayDisplayImage.src = imagePaths[currentIndex];
        updateActiveThumbnail(currentIndex);
    }
});

const imagePaths = [
    "/assets/images/image-product-1.jpg",
    "/assets/images/image-product-2.jpg",
    "/assets/images/image-product-3.jpg",
    "/assets/images/image-product-4.jpg"
];

let currentIndex = 0;
updateActiveThumbnail(currentIndex);
const overlaySlider = document.getElementById("overlay-slider");

const overlayDisplayImage = overlay.querySelector(".lightbox-gallery__display-image");
const prevBtn = overlay.querySelector(".lightbox-gallery__nav--prev");
const nextBtn = overlay.querySelector(".lightbox-gallery__nav--next");

function slideToImage(index, direction) {
    const currentImage = overlaySlider.querySelector("img");
    const newImage = currentImage.cloneNode(true);
    newImage.src = imagePaths[index];

    overlaySlider.style.transition = "none";

    if (direction === "next") {
        overlaySlider.appendChild(newImage);
        overlaySlider.style.transform = "translateX(0)";

        requestAnimationFrame(() => {
            overlaySlider.style.transition = "transform 0.5s ease-in-out";
            overlaySlider.style.transform = "translateX(-100%)";
        });
    } else {
        overlaySlider.insertBefore(newImage, currentImage);
        overlaySlider.style.transform = "translateX(-100%)";

        requestAnimationFrame(() => {
            overlaySlider.style.transition = "transform 0.5s ease-in-out";
            overlaySlider.style.transform = "translateX(0)";
        });
    }

    setTimeout(() => {
        overlaySlider.innerHTML = "";
        overlaySlider.appendChild(newImage);
        overlaySlider.style.transition = "none";
        overlaySlider.style.transform = "translateX(0)";
    }, 500);
}

function updateActiveThumbnail(index) {
    thumnailImages.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });
    overlayThumbnailImages.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });
}

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        slideToImage(currentIndex, "prev");
        updateActiveThumbnail(currentIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < imagePaths.length - 1) {
        currentIndex++;
        slideToImage(currentIndex, "next");
        updateActiveThumbnail(currentIndex);
    }
});


// const lightboxOverlay = document.createElement("div");
// lightboxOverlay.classList.add("lightbox-gallery__overlay");
// lightboxOverlay.id = "lightbox-overlay";

// lightboxGallery.appendChild(lightboxOverlay);

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("active");
    }
});

closeButton.addEventListener("click", () => {
    overlay.classList.remove("active");

    const newImage = displayImage.cloneNode(true);
    newImage.src = imagePaths[currentIndex];

    const currentImage = imageSlider.querySelector("img");
    imageSlider.appendChild(newImage);

    imageSlider.style.transition = "transform 0.5s ease-in-out"
    imageSlider.style.transform = "translateX(-100%)";

    setTimeout(() => {
        imageSlider.removeChild(currentImage);

        imageSlider.style.transition = "none";
        imageSlider.style.transform = "translateX(0)";

        void imageSlider.offsetWidth;

        imageSlider.style.transition = "transform 0.5s ease-in-out";
    }, 500);

    updateActiveThumbnail(currentIndex);
});




// displayImage.addEventListener("click", e => {
//     lightboxOverlay.classList.add("active");
//     const image = document.createElement("img");
//     image.src = displayImage.src.slice(0, displayImage.src.lastIndexOf('.')) + '-thumbnail.jpg';
//     console.log(image.src);
//     image.style.width = "200px";
//     image.style.height = "200px";

//     while (lightboxOverlay.firstChild) {
//         lightboxOverlay.removeChild(lightboxOverlay.firstChild);
//     }

//     lightboxOverlay.appendChild(image);
// });

// lightboxOverlay.addEventListener("click", e => {
//     if (e.target !== e.currentTarget) return;
//     lightboxOverlay.classList.remove("active");
// });

cartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cartModal.classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("cart-modal").classList.add("mounted");
    }, 50);
});

const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const inputQuantity = document.getElementById("quantity");
const quantityForm = document.getElementById("quantity-form");
const addToCartBtn = document.getElementById("add-to-cart");

console.log(inputQuantity.value);

decreaseBtn.addEventListener("click", () => {
    if (inputQuantity.value > 0) {
        inputQuantity.value--;
    }
    return;
});

increaseBtn.addEventListener("click", () => {
    inputQuantity.value++;
});

const cartContents = document.getElementById("cart-contents");
const cartItem = document.getElementById("cart-item");
const emptyCartHTML = `
        <p class="header__cart-contents" id="cart-contents">Your cart is empty.</p>
    `;

function addToCart(quantity) {
    const existingItem = cartModal.querySelector(".header__cart-item");
    const emptyMessage = cartModal.querySelector(".header__cart-contents");
    if (emptyMessage) emptyMessage.remove();

    if (quantity === 0) {
        if (existingItem) existingItem.remove();
        cartModal.insertAdjacentHTML("beforeend", emptyCartHTML);
        return;
    }



    if (existingItem) {
        console.log(quantity);
        if (quantity === 0) {
            existingItem.remove();
            return;
        }
        const quantityEl = existingItem.querySelector(".cart-quantity");
        const totalEl = existingItem.querySelector(".cart-total-price");

        quantityEl.textContent = quantity;
        totalEl.textContent = `$${125 * quantity}.00`;
        return;
    }

    const cartItemHTML = `
        <div class="header__cart-item" id="cart-item">
            <div class="header__cart-item-details">
                <div>
                    <img src="/assets/images/image-product-1-thumbnail.jpg" alt="product"
                        class="header__cart-item-image">
                </div>
                <div>
                    <p class="header__cart-item-title">Fall Limited Edition Sneakers</p>
                    <p class="header__cart-item-price">
                        $125.00 &times;
                        <span class="cart-quantity" id="cart-quantity">
                            ${quantity}
                        </span> =
                        <strong class="cart-total-price" id="cart-total-price">
                            $${125 * quantity}.00
                        </strong>
                    </p>
                </div>
                <div>
                    <button type="button"  class="header__cart-item-delete-btn" id="cart-item-delete" aria-label="delete item">
                        <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <path
                                    d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                                    id="a" />
                            </defs>
                            <use fill="currentColor" fill-rule="nonzero" xlink:href="#a" />
                        </svg>
                    </button>
                </div>
            </div>
            <button type="button" class="header__cart-checkout-btn" aria-label="checkout">
                Checkout
            </button>
        </div>
    `;



    cartModal.insertAdjacentHTML("beforeend", cartItemHTML);
    console.log(cartModal);
    const cartItemDeleteBtn = cartModal.querySelector("#cart-item-delete");


    cartItemDeleteBtn.addEventListener("click", () => {
        const item = cartModal.querySelector("#cart-item");
        if (item) item.remove();

        cartModal.insertAdjacentHTML("beforeend", emptyCartHTML);

        updateCartBadge(0);
        inputQuantity.value = 0;
    });
}

function updateCartBadge(quantity) {
    const cartCount = document.getElementById("cart-count");
    if (quantity >= 0) {
        cartCount.innerText = quantity;
        cartCount.style.display = "flex";
    }
}

quantityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(quantityForm));
    const quantity = parseInt(data.quantity);

    addToCart(quantity);
    updateCartBadge(quantity);
    cartModal.classList.add("active");
});

document.addEventListener("click", (e) => {
    if (cartModal.classList.contains("active") && !cartModal.contains(e.target)) {
        cartModal.classList.remove("active");
    }
});

//menu open/close

const body = document.querySelector("body");
const btnOpen = document.getElementById("nav-button-open");
const btnClose = document.getElementById("nav-button-close");
const media = window.matchMedia('( width < 45em )');
const navContent = document.querySelector(".nav__content");
const navOverlay = document.querySelector(".nav__menu-overlay");

function openMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "true");
    body.classList.add("no-scroll");
    // navContent.removeAttribute("inert");
    // main.setAttribute("inert", "");
    btnClose.focus();
}

function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");
    // navContent.setAttribute("inert", "");
    // main.removeAttribute("inert");
    btnOpen.focus();
}

function setupNav(e) {
    if (e.matches) {
        // navContent.setAttribute("inert", "");
        setTimeout(() => {
            navContent.style.display = "block";
            navOverlay.style.display = "block";
        }, 500);
    } else {
        // navContent.removeAttribute("inert");
        navContent.style.display = "";
        // main.removeAttribute("inert");
    }
}

setupNav(media);
media.addEventListener("change", setupNav);
btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

