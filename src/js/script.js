const lightboxGallery = document.querySelector(".lightbox-gallery");
const displayImage = document.querySelector(".lightbox-gallery__display-image");
const thumnailImages = lightboxGallery.querySelectorAll(".lightbox-gallery__thumbnail-image");

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