console.log("hello world");

const searchForm = document.querySelector(".search");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const destination = searchForm.destination.value.trim();
  if (!destination.length) return;
  console.log(destination);
  sessionStorage.setItem("Destination", JSON.stringify(destination));
  window.location.href = "./city-page.html";
  searchForm.reset();
});

