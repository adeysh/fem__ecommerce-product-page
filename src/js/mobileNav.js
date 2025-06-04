import { body, main, btnOpen, btnClose, media, navContent, navOverlay } from "./constants";

export function setupMobileNav() {

    function openMobileMenu() {
        btnOpen.setAttribute("aria-expanded", "true");
        body.classList.add("no-scroll");
        navContent.removeAttribute("inert");
        main.setAttribute("inert", "");
        btnClose.focus();
    }

    function closeMobileMenu() {
        btnOpen.setAttribute("aria-expanded", "false");
        body.classList.remove("no-scroll");
        navContent.setAttribute("inert", "");
        main.removeAttribute("inert");
        btnOpen.focus();
    }

    function handleOutsideMenuClick(e) {
        const isMenuOpen = navContent.style.display === "block";
        const isClickInsideMenu = navContent.contains(e.target);
        const isClickOnOpenBtn = e.target.closest("#nav-button-open");

        if (isMenuOpen && !isClickInsideMenu && !isClickOnOpenBtn) {
            closeMobileMenu();
        }
    }

    function setupNav(e) {
        if (e.matches) {
            navContent.setAttribute("inert", "");
            setTimeout(() => {
                navContent.style.display = "block";
                navOverlay.style.display = "block";
            }, 500);
        } else {
            navContent.removeAttribute("inert");
            navContent.style.display = "";
            main.removeAttribute("inert");
        }
    }

    setupNav(media);
    media.addEventListener("change", setupNav);
    btnOpen.addEventListener("click", openMobileMenu);
    btnClose.addEventListener("click", closeMobileMenu);
    document.addEventListener("click", handleOutsideMenuClick);
}