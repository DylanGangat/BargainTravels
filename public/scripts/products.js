import "./script.js";
import { shoppingCartTotalIcon, cartItems, cartTotal } from "./script.js";
const parent = document.querySelector("[data-product-info]");
const addToCart = document.querySelector(".btn");

// For changing image and active color
const colorGroup = document.querySelector(".colours-group");
const colors = document.querySelectorAll(".colour-block");
const changingImages = document.querySelectorAll("[data-changing-image]");
export const savedCart = JSON.parse(localStorage.getItem("SHOPPING_CART"));

// Array where we put all add to cart items
let shoppingCart = [];

// To check if there is a cart with a length and then it would update the cart total icon
if (savedCart && savedCart.length !== 0) {
  shoppingCart = savedCart;
  cartTotal(shoppingCart);
}

const getProductDetails = () => {
  const name = parent.querySelector("[data-name]").textContent;
  const price = parseInt(parent.querySelector("[data-price]").dataset.price);
  const size = parent.querySelector("[data-size]").value;
  const colorGroup = parent.querySelector("[data-color-group]");
  const activeColor = colorGroup.querySelector(".active").textContent;
  const quantity = parseInt(parent.querySelector("[data-quantity]").value);
  const mockupImage = document.querySelector(".active").dataset.mockup;
  const randomNumber = Math.floor(Math.random() * 1000 + 1);

  const item = {};
  item.name = name;
  item.price = price;
  item.quantity = quantity;
  item.size = size;
  item.color = activeColor;
  item.image = mockupImage;
  item.id = randomNumber;

  // So the user has to add a size to continue
  if (item.size === "") return;

  shoppingCart.push(item);

  // It checks to see if you added the same sized item and same names and then filters and removes your previous item and replaces it with an new item.
  const cart = shoppingCart
    .slice()
    .reverse()
    .filter(
      (item, index, array) =>
        array.findIndex(
          t =>
            t.size === item.size &&
            t.name === item.name &&
            t.color === item.color
        ) === index
    )
    .reverse();

  cartTotal(cart);

  localStorage.setItem("SHOPPING_CART", JSON.stringify(cart));
};

addToCart.addEventListener("click", () => {
  getProductDetails();
});

const updateMockupColor = e => {
  if (e.target.classList.contains("colour-block")) {
    // To reset the color groups by removing all active states
    colors.forEach(color => color.classList.remove("active"));
    // To add the active state to the onn you clicked
    const activeColor = e.target.classList.add("active");
    // To get the id so i can use it to select the right image to display
    const imageId = e.target.dataset.color;
    console.log("IMAGEID:", imageId);
    // To select the image that i want to display
    const image = document.querySelector(`${imageId}`);
    console.log("IMAGE:", image);
    // To reset the images so they are all hidden
    changingImages.forEach(image => image.classList.add("visually-hidden"));
    // To remove the hidden on the image i want to display
    image.classList.remove("visually-hidden");
  }
};

colorGroup.addEventListener("click", e => {
  updateMockupColor(e);
});
