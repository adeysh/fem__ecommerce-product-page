import { cloneAndReplaceImage, updateActiveClass, setupKeyboardActivation } from "./utils";
import { imageSlider, thumnailImages, overlayThumbnailImages, indexManager } from "./constants";
import { containers } from "./constants";

export function initGallery() {
    thumnailImages.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            const newSrc = thumb.src.replace("-thumbnail", "");
            indexManager.set(index);
            cloneAndReplaceImage(imageSlider, newSrc);
            updateActiveClass(thumnailImages, index);
            updateActiveClass(overlayThumbnailImages, index);
        });
    });

    setupKeyboardActivation(containers);
}