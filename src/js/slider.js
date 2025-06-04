import { imagePaths, imageSlider, overlay, overlayDisplayImage, lightboxGallery, pageContent, thumnailImages } from "./constants";
import { updateActiveClass, setupKeyboardActivation } from "./utils";
import { indexManager } from "./constants";

export function slideToImage(sliderElement, index, direction) {
    console.log("hello");
    const currentImage = sliderElement.querySelector("img");
    const newImage = currentImage.cloneNode(true);
    newImage.src = imagePaths[index];
    sliderElement.style.transition = "none";

    if (direction === "next") {
        sliderElement.appendChild(newImage);
        sliderElement.style.transform = "translateX(0)";

        requestAnimationFrame(() => {
            sliderElement.style.transition = "transform 0.5s ease-in-out";
            sliderElement.style.transform = "translateX(-100%)";
        });
    } else {
        sliderElement.insertBefore(newImage, currentImage);
        sliderElement.style.transform = "translateX(-100%)";

        requestAnimationFrame(() => {
            sliderElement.style.transition = "transform 0.5s ease-in-out";
            sliderElement.style.transform = "translateX(0)";
        });
    }

    setTimeout(() => {
        sliderElement.innerHTML = "";
        sliderElement.appendChild(newImage);
        sliderElement.style.transition = "none";
        sliderElement.style.transform = "translateX(0)";
    }, 500);

}

imageSlider.addEventListener("click", (e) => {
    const currentIndex = indexManager.get();

    if (e.target && e.target.classList.contains("lightbox-gallery__display-image")) {
        overlay.classList.add("active");
        overlayDisplayImage.src = imagePaths[currentIndex];
        updateActiveClass(thumnailImages, currentIndex);
        lightboxGallery.setAttribute("inert", "");
        pageContent.setAttribute("inert", "");
    }
});

setupKeyboardActivation([imageSlider]);