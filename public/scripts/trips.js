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
  const { image, name, info } = item;

  const card = `
  <div class="relative card ">
  <div class="h-48 bg-white rounded-lg overflow-hidden"><img
          class="h-full w-full object-cover hover:opacity-90 hover-default" src="${image}"
          alt="" loading="lazy"></div>
  <div class="mt-2">
      <h3 class="text-lg font-semibold">${name}</h3>
      <div class="flex gap-1 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
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
