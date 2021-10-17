import "./script.js";

const searchForm = document.querySelector(".search");

searchForm.addEventListener("submit", e => {
  const destination = searchForm.destination.value.trim();
  if (!destination.length) return;
  console.log(destination);
  sessionStorage.setItem("DESTINATION", JSON.stringify(destination));
  searchForm.reset();
});
