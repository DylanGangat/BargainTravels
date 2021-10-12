import "./script.js";

const parent = document.querySelector("[data-product-info]");
const addToCart = document.querySelector(".btn");
// For changing image and active color
const colorGroup = document.querySelector(".colours-group");
const colors = document.querySelectorAll(".colour-block");
const changingImages = document.querySelectorAll("[data-changing-image]");

// Array where we put all add to cart items
let shoppingCart = [];
// console.log(shoppingCart);

addToCart.addEventListener("click", () => {
  const name = parent.querySelector("[data-name]").textContent;
  const price = parseInt(parent.querySelector("[data-price]").dataset.price);
  const size = parent.querySelector("[data-size]").value;
  const color = parent.querySelector("[data-color]");
  const activeColor = color.querySelector(".active").textContent;
  const quantity = parseInt(parent.querySelector("[data-quantity]").value);
  const mockup = document.querySelector("[data-mockup]").dataset.mockup;
  console.log(name, price, size, activeColor, quantity, mockup);

  const item = {};
  item.name = name;
  item.price = price;
  item.quantity = quantity;
  item.size = size;
  item.color = activeColor;
  item.image = mockup;

  shoppingCart.push(item);

  // It checks to see if you added the same sized item and then filters and removes your previous item and replaces it with an new item.
  const cart = shoppingCart
    .slice()
    .reverse()
    .filter(
      (item, index, array) =>
        array.findIndex(t => t.size === item.size) === index
    )
    .reverse();

  localStorage.setItem("SHOPPING_CART", JSON.stringify(cart));

  console.log("Item:", item, "Shopping Cart:", shoppingCart, "Cart:", cart);
});



colorGroup.addEventListener("click", e => {
  if (e.target.classList.contains("colour-block")) {
    console.log(e.target);
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
});
