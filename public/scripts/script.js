const navToggle = document.querySelector("[data-nav-toggle]");
const overlay = document.querySelector("[data-overlay]");
const nav = document.querySelector("[data-nav]");
const shoppingCart = JSON.parse(localStorage.getItem("SHOPPING_CART"));
export const shoppingCartTotalIcon = document.querySelector(
  "[data-shoppingcart-icon]"
);
export const cartItems = shoppingCartTotalIcon.querySelector(
  ".shopping-cart-total"
);

// Function for updating the items total thats above the shopping icon
export const cartTotal = cart => {
  if (cart.length) {
    cartItems.textContent = cart.length;
    cartItems.classList.remove("visually-hidden");
  } else {
    cartItems.classList.add("visually-hidden");
  }
};

// To hide items total when
if (shoppingCart != null && shoppingCart.length !== 0) {
  cartTotal(shoppingCart);
} else {
  cartItems.classList.add("visually-hidden");
}

navToggle.addEventListener("click", e => {
  if (!e.currentTarget.hasAttribute("data-nav-toggle")) return;
  nav.classList.toggle("visually-hidden");
  nav.classList.toggle("active");
  overlay.classList.toggle("visually-hidden");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", e => {
  if (!e.target.hasAttribute("data-overlay")) return;
  nav.classList.add("visually-hidden");
  nav.classList.toggle("active");
  overlay.classList.add("visually-hidden");
  overlay.classList.remove("active");
});
