const lightboxGallery = document.querySelector(".lightbox-gallery");
const displayImage = document.querySelector(".lightbox-gallery__display-image");
const overlay = document.getElementById("lightbox-overlay");
const lightboxOverlay = overlay.querySelector(".lightbox-gallery--overlay");
const thumnailImages = lightboxGallery.querySelectorAll(".lightbox-gallery__thumbnail-image");
const imageSlider = document.getElementById("image-slider");
const closeButton = document.getElementById("overlay-close-btn");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");

thumnailImages.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        const newSrc = thumbnail.src.replace("-thumbnail", "");

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
    });
});

displayImage.addEventListener("click", () => {
    overlay.classList.add("active");
});

const imagePaths = [
    "/assets/images/image-product-1.jpg",
    "/assets/images/image-product-2.jpg",
    "/assets/images/image-product-3.jpg",
    "/assets/images/image-product-4.jpg"
];

let currentIndex = 0;
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

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        slideToImage(currentIndex, "prev");
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < imagePaths.length - 1) {
        currentIndex++;
        slideToImage(currentIndex, "next");
    }
});


// const lightboxOverlay = document.createElement("div");
// lightboxOverlay.classList.add("lightbox-gallery__overlay");
// lightboxOverlay.id = "lightbox-overlay";

// lightboxGallery.appendChild(lightboxOverlay);

overlay.addEventListener("click", (e) => {
    console.log(e.target, e.currentTarget);
    if (e.target === overlay) {
        overlay.classList.remove("active");
    }
});

closeButton.addEventListener("click", () => {
    overlay.classList.remove("active");
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

cartBtn.addEventListener("click", () => {
    cartModal.classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("cart-modal").classList.add("mounted");
    }, 50);
});