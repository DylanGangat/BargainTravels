import "./script.js";

const destinationsGrid = document.querySelector("[data-destinations-grid]");
let activities = JSON.parse(localStorage.getItem("LOVED_PLACES"));
const p = document.querySelector("[data-unsaved-message]");

destinationsGrid.innerHTML = "";

if (activities.length === 0) {
  p.classList.remove("hidden");
} else {
  p.classList.add("hidden");
}

const destinationTemplateCard = item => {
  const { image, name, info, stars } = item;
  

  const card = `
  <div class="relative card ">
  <div class="h-48 bg-white rounded-lg overflow-hidden"><img
          class="h-full w-full object-cover hover:opacity-90 hover-default" src="${image}"
          alt="" loading="lazy"></div>
  <div class="mt-2">
      <h3 class="text-lg font-semibold">${name}</h3>
      <div class="flex gap-1 mt-2 stars items-center">
        ${stars} <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary-400"
        viewBox="0 0 20 20" fill="currentColor">
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
      </div>
      <p class="text-sm text-gray-400 mt-1">${info}</p>
  </div>
  <div class="bg-white p-1 inline-block absolute top-2 right-2 rounded-full close-btn">
    <svg class="h-6 w-6 cursor-pointer close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="path" d="M6 18L18 6M6 6L18 18" stroke="#343a40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </div>

</div>
  `;

  destinationsGrid.innerHTML += card;
};

activities.forEach(destinationTemplateCard);

destinationsGrid.addEventListener("click", e => {
  if (
    e.target.classList.contains("close") ||
    e.target.classList.contains("path")
  ) {
    const closeBtn = e.target.closest(".close-btn");
    const parent = closeBtn.parentElement;
    const name = parent.querySelector("h3").textContent;

    // Filtering out the activity we clicked on.
    const newActivities = activities.filter(item => item.name !== name);
    // console.log("NEW:", newActivities);
    // I then override my localStorage - LOVED_PLACES with the new filtered array
    localStorage.setItem("LOVED_PLACES", JSON.stringify(newActivities));
    // I then update the activities variable with the updated localStorage array
    activities = JSON.parse(localStorage.getItem("LOVED_PLACES"));
    // Have to delete previous cards or else the new cards will be added to the existing ones.
    destinationsGrid.innerHTML = "";
    // This will toggle a paragraph saying your cart is empty depending on if it is.
    if (activities.length === 0) {
      p.classList.remove("hidden");
    } else {
      p.classList.add("hidden");
    }
    // I then populated the page with it's new  destinationTemplateCards.

    activities.forEach(destinationTemplateCard);
  }
});
