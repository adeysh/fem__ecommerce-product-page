const lightboxGallery = document.querySelector(".lightbox-gallery");
const displayImage = document.getElementById("main-display-image");
const thumnailImages = lightboxGallery.querySelectorAll(".lightbox-gallery__thumbnail-image");
const slider = document.getElementById("image-slider");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");

thumnailImages.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        const newSrc = thumbnail.src.replace("-thumbnail", "");

        const currentImage = slider.querySelector("img");

        const newImage = currentImage.cloneNode(true);
        newImage.src = newSrc;

        slider.appendChild(newImage);

        slider.style.transform = "translateX(-100%)";

        setTimeout(() => {
            slider.removeChild(currentImage);

            slider.style.transition = "none";
            slider.style.transform = "translateX(0)";

            void slider.offsetWidth;

            slider.style.transition = "transform 0.5s ease-in-out";
        }, 500);
    });
});



const lightboxOverlay = document.createElement("div");
lightboxOverlay.classList.add("lightbox-gallery__overlay");
lightboxOverlay.id = "lightbox-overlay";

lightboxGallery.appendChild(lightboxOverlay);


displayImage.addEventListener("click", e => {
    lightboxOverlay.classList.add("active");
    const image = document.createElement("img");
    image.src = displayImage.src.slice(0, displayImage.src.lastIndexOf('.')) + '-thumbnail.jpg';
    console.log(image.src);
    image.style.width = "200px";
    image.style.height = "200px";

    while (lightboxOverlay.firstChild) {
        lightboxOverlay.removeChild(lightboxOverlay.firstChild);
    }

    lightboxOverlay.appendChild(image);
});

lightboxOverlay.addEventListener("click", e => {
    if (e.target !== e.currentTarget) return;
    lightboxOverlay.classList.remove("active");
});

cartBtn.addEventListener("click", () => {
    cartModal.classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("cart-modal").classList.add("mounted");
    }, 50);
});