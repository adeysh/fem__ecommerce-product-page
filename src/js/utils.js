export function cloneAndReplaceImage(container, newSrc) {
    const currentImage = container.querySelector("img");
    const newImage = currentImage.cloneNode(true);
    newImage.src = newSrc;
    container.appendChild(newImage);
    container.style.transform = "translateX(-100%)";

    setTimeout(() => {
        container.removeChild(currentImage);
        container.style.transition = "none";
        container.style.transform = "translateX(0)";
        void container.offsetWidth;
        container.style.transition = "transform 0.5s ease-in-out";
    }, 500);
}

export function updateActiveClass(elements, index) {
    elements.forEach((el, i) => {
        el.classList.toggle("active", i === index);
    });
}

export function setupKeyboardActivation(targets, imageSelector = "img") {
    targets.forEach(target => {
        target.addEventListener("keyup", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const image = target.querySelector(imageSelector);
                image?.click();
            }
        });
    });
}