import { imagePaths, overlay, imageSlider, overlaySlider, mobileSlider, overlayThumbnailImages, displayImage, overlayPrevBtn, overlayNextBtn, mobilePrevBtn, mobileNextBtn, lightboxGallery, pageContent, closeButton } from "./constants";
import { slideToImage } from "./slider";
import { updateActiveClass } from "./utils";
import { indexManager } from "./constants";

export function initOverlay() {
    let currentIndex = indexManager.get();

    overlayPrevBtn?.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex = indexManager.decrement();
            slideToImage(overlaySlider, currentIndex, "prev");
            updateActiveClass(overlayThumbnailImages, currentIndex);
        }
    });

    overlayNextBtn?.addEventListener("click", () => {
        if (currentIndex < imagePaths.length - 1) {
            currentIndex = indexManager.increment();
            slideToImage(overlaySlider, currentIndex, "next");
            updateActiveClass(overlayThumbnailImages, currentIndex);
        }
    });

    mobilePrevBtn?.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex = indexManager.decrement();
            slideToImage(mobileSlider, currentIndex, "prev");
        }
    });

    mobileNextBtn?.addEventListener("click", () => {
        if (currentIndex < imagePaths.length - 1) {
            currentIndex = indexManager.increment();
            slideToImage(mobileSlider, currentIndex, "next");
        }
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            lightboxGallery.removeAttribute("inert");
            pageContent.removeAttribute("inert");
        }
    });

    overlayThumbnailImages.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            if (index === currentIndex) return;
            const direction = index > currentIndex ? "next" : "prev";
            currentIndex = index;
            slideToImage(overlaySlider, currentIndex, direction);
            updateActiveClass(overlayThumbnailImages, index);
        });
    });

    closeButton.addEventListener("click", () => {
        overlay.classList.remove("active");
        lightboxGallery.removeAttribute("inert");
        pageContent.removeAttribute("inert");

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

        updateActiveClass(overlayThumbnailImages, currentIndex);
    });
}