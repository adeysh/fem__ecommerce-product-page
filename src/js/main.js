import { initGallery } from "./gallery";
import { initOverlay } from "./overlay";
import { initCart } from "./cart";
import { setupMobileNav } from "./mobileNav";

document.addEventListener("DOMContentLoaded", () => {
    initGallery();
    initOverlay();
    initCart();
    setupMobileNav();
});