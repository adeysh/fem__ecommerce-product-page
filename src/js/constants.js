export const body = document.querySelector("body");
export const main = document.querySelector("main");

export const lightboxGallery = document.querySelector(".lightbox-gallery");
export const containers = lightboxGallery.querySelectorAll(".lightbox-gallery__thumbnail-image-container");
export const overlay = document.getElementById("lightbox-overlay");
export const pageContent = document.querySelector(".page-content");

export const imageSlider = document.getElementById("image-slider");
export const thumnailImages = lightboxGallery.querySelectorAll(".lightbox-gallery__thumbnail-image");
export const displayImage = document.querySelector(".lightbox-gallery__display-image");
export const overlaySlider = document.getElementById("overlay-slider");
export const overlayThumbnailImages = overlay.querySelectorAll(".lightbox-gallery__thumbnail-image");
export const overlayDisplayImage = overlay.querySelector(".lightbox-gallery__display-image");
export const mobileSlider = document.getElementById("mobile-slider");

export const closeButton = document.getElementById("overlay-close-btn");


export const overlayPrevBtn = overlay.querySelector(".lightbox-gallery__nav--prev:not(.mobile)");
export const overlayNextBtn = overlay.querySelector(".lightbox-gallery__nav--next:not(.mobile)");
export const mobilePrevBtn = document.querySelector(".lightbox-gallery__nav--prev.mobile");
export const mobileNextBtn = document.querySelector(".lightbox-gallery__nav--next.mobile");

export const cartBtn = document.getElementById("cart-btn");
export const cartModal = document.getElementById("cart-modal");
export const decreaseBtn = document.getElementById("decrease");
export const increaseBtn = document.getElementById("increase");
export const quantityForm = document.getElementById("quantity-form");
export const inputQuantity = document.getElementById("quantity");
export const addToCartBtn = document.getElementById("add-to-cart");
export const cartItemDeleteBtn = cartModal.querySelector("#cart-item-delete");

export const btnOpen = document.getElementById("nav-button-open");
export const btnClose = document.getElementById("nav-button-close");
export const media = window.matchMedia('( width < 45em )');
export const navContent = document.querySelector(".nav__content");
export const navOverlay = document.querySelector(".nav__menu-overlay");

export const imagePaths = [
    "/assets/images/image-product-1.jpg",
    "/assets/images/image-product-2.jpg",
    "/assets/images/image-product-3.jpg",
    "/assets/images/image-product-4.jpg"
];

let currentIndex = 0;

export const indexManager = {
    get: () => currentIndex,
    set: (val) => { currentIndex = val; },
    increment: () => ++currentIndex,
    decrement: () => --currentIndex,
};