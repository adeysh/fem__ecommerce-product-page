import { cartBtn, cartModal, decreaseBtn, increaseBtn, inputQuantity, quantityForm } from "./constants";

export function initCart() {
    cartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cartModal.classList.toggle("active");
    });

    window.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            cartModal.classList.add("mounted");
        }, 50);
    });

    decreaseBtn.addEventListener("click", () => {
        if (inputQuantity.value > 0) inputQuantity.value--;
    });

    increaseBtn.addEventListener("click", () => {
        inputQuantity.value++;
    });

    quantityForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const quantity = parseInt(inputQuantity.value);
        cartModal.classList.add("active");
        updateCart(quantity);
    });


    document.addEventListener("click", (e) => {
        if (cartModal.classList.contains("active") && !cartModal.contains(e.target)) {
            cartModal.classList.remove("active");
        }
    });
}

function updateCart(quantity) {
    updateCartBadge(quantity);

    const existingItem = cartModal.querySelector(".header__cart-item");
    const emptyMessage = cartModal.querySelector(".header__cart-contents");
    const emptyCartHTML = `
        <p class="header__cart-contents" id="cart-contents">Your cart is empty.</p>
    `;

    if (emptyMessage) emptyMessage.remove();

    if (quantity === 0) {
        existingItem?.remove();
        cartModal.insertAdjacentHTML("beforeend", emptyCartHTML);
        return;
    }

    if (existingItem) {
        existingItem.querySelector(".cart-quantity").textContent = quantity;
        existingItem.querySelector(".cart-total-price").textContent = `$${125 * quantity}.00`;
        return;
    }

    const cartItemHTML = `
        <div class="header__cart-item" id="cart-item">
            <div class="header__cart-item-details">
                <div>
                    <img src="/assets/images/image-product-1-thumbnail.jpg" alt="product"
                        class="header__cart-item-image">
                </div>
                <div>
                    <p class="header__cart-item-title">Fall Limited Edition Sneakers</p>
                    <p class="header__cart-item-price">
                        $125.00 &times;
                        <span class="cart-quantity" id="cart-quantity">
                            ${quantity}
                        </span> =
                        <strong class="cart-total-price" id="cart-total-price">
                            $${125 * quantity}.00
                        </strong>
                    </p>
                </div>
                <div>
                    <button type="button"  class="header__cart-item-delete-btn" id="cart-item-delete" aria-label="delete item"  tabindex="0">
                        <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <path
                                    d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                                    id="a" />
                            </defs>
                            <use fill="currentColor" fill-rule="nonzero" xlink:href="#a" />
                        </svg>
                    </button>
                </div>
            </div>
            <button type="button" class="header__cart-checkout-btn" aria-label="checkout">
                Checkout
            </button>
        </div>
    `;

    cartModal.insertAdjacentHTML("beforeend", cartItemHTML);

    cartModal.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest("#cart-item-delete");

        if (deleteBtn) {
            const item = cartModal.querySelector("#cart-item");
            if (item) item.remove();
            cartModal.insertAdjacentHTML("beforeend", emptyCartHTML);
            updateCartBadge(0);
            inputQuantity.value = 0;
        }
    });
}

function updateCartBadge(quantity) {
    const cartCount = document.getElementById("cart-count");
    if (quantity >= 0) {
        cartCount.innerText = quantity;
        cartCount.style.display = "flex";
    }
}