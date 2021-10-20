import "./script.js";
import { shoppingCartTotalIcon, cartItems, cartTotal } from "./script.js";

let shoppingCart = [];

const emptyCartMessage = document.querySelector("[data-unsaved-message]");
const orderSummary = document.querySelector("[data-order-summary]");
const cardParent = document.querySelector("[data-shopping-cart]");
const subTotal = document.querySelector("[data-order-subtotal]");
const orderTotal = document.querySelector("[data-order-total]");
cardParent.innerHTML = "";

// To watch for updates on cards in the shoppingCart
cardParent.addEventListener("click", e => {
  // Remove a product item
  removeItem(e);

  // Update total when changing quantity
  quantityUpdated(e);
});

// For removing product item
const removeItem = e => {
  if (e.target.hasAttribute("data-remove")) {
    const parent = e.target.closest(".cart-item");
    // Had to convert id from string to number
    const id = parseInt(parent.dataset.id);
    const filteredCart = shoppingCart.filter(item => item.id !== id);
    updateCart(filteredCart);
  }
};

// For Update total when changing quantity
const quantityUpdated = e => {
  if (e.target.hasAttribute("data-quantity")) {
    const parent = e.target.closest(".cart-item");
    // Had to convert id from string to number
    const id = parseInt(parent.dataset.id);
    const size = parent.querySelector("[data-size]").dataset.size;
    const quantity = parseInt(e.target.value);
    const findCartItem = shoppingCart.find(
      item => item.id === id && item.size === size
    );
    findCartItem.quantity = quantity;
    let quantityChanged = shoppingCart;
    updateCart(quantityChanged);
  }
};

// To put the information of the products into card items
const generateShoppingCart = cart => {
  cardParent.innerHTML = "";
  cart.forEach(templateCard);
};

// Template for the card item
const templateCard = item => {
  const { image, name, price, quantity, size, id } = item;

  const card = `
        <div class="cart-item" data-id="${id}">
            <div class="col-span-full xs:col-span-1">
                <img class="mockup" src="${image}" alt="A mockup of our ${name}" loading="lazy">
            </div>
            <div class="col-span-full xs:col-span-2 flex flex-col">
                <div>
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-lg md:text-2xl">${name}</h3>
                    <p class="size text-secondary-300 border-secondary" data-size="${size}">${size}</p>
                </div>
                <p class="text-secondary-400 text-lg md:text-2xl font-semibold mt-1 md:mt-2" data-price="${price}">R${price}</p>          
                </div>
                <div class="more-info">
                    <div class="flex gap-4 items-center">
                        <label for="number${id}">Quantity:</label>
                        <input type="number" name="number" id="number${id}" min="1" value="${quantity}" required data-quantity>
                    </div>
                    <button data-remove>Remove</button>
                </div>
            </div>
        </div>
            `;

  cardParent.innerHTML += card;
};

// Update cart in loacal storage
const updateCart = filteredCart => {
  // Sets the local storage with new filtered array
  localStorage.setItem("SHOPPING_CART", JSON.stringify(filteredCart));
  // updates shoppingCart with filtered array
  shoppingCart = JSON.parse(localStorage.getItem("SHOPPING_CART"));
  // Uses new array to form new template
  generateShoppingCart(shoppingCart);
  updatePrice(shoppingCart);
  cartTotal(shoppingCart);

  // Checks whether it should display or hide message due to the updated array
  cartMessage(shoppingCart);
};

// Update the price of total
const updatePrice = shoppingCart => {
  let totalPrice = shoppingCart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  subTotal.textContent = `R${totalPrice}`;
  orderTotal.textContent = `R${totalPrice}`;
};

// If there are items in local storage then we can get the info and display it
const loadShoppingCart = () => {
  if (localStorage.getItem("SHOPPING_CART")) {
    shoppingCart = JSON.parse(localStorage.getItem("SHOPPING_CART"));
    generateShoppingCart(shoppingCart);
    updatePrice(shoppingCart);
    cartTotal(shoppingCart);
  }
};

loadShoppingCart();

// To display empty message if user didnt add to cart anything
const cartMessage = shoppingCart => {
  if (shoppingCart.length === 0) {
    emptyCartMessage.classList.remove("hidden");
    orderSummary.classList.add("hidden");
  } else {
    emptyCartMessage.classList.add("hidden");
    orderSummary.classList.remove("hidden");
  }
};

cartMessage(shoppingCart);
