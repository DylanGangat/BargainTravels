// const destination = JSON.parse(sessionStorage.getItem("Destination"));
// const placeInfo = document.querySelector("[data-destination]");
// const placeName = document.querySelector("[data-heading]");
// const aboutName = document.querySelector("[data-sub-heading]");
// const placeDescription = document.querySelector("[data-description]");
// // console.log(destination);
// // console.log(placeInfo);

// // const destinationCoordinates = async destination => {
// //   const URL = `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${destination}&lang=en_US&units=km`;

// //   try {
// //     const response = await fetch(URL, {
// //       method: "GET",
// //       headers: {
// //         "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
// //         "x-rapidapi-key": "16e3acdd49msh25947ac11c794fap1f8ca9jsn211243103f14",
// //       },
// //     });

// //     if (!response.ok) return console.error("response status error");
// //     const data = await response.json();
// //     const placeDetails = data.data.Typeahead_autocomplete.results[0].detailsV2;
// //     console.log("DETAILS", placeDetails);
// //     const name = placeDetails.names.name;
// //     const latitude = placeDetails.geocode.latitude;
// //     const longitude = placeDetails.geocode.longitude;
// //     const locationId = placeDetails.locationId;
// //     console.log(
// //       "name:",
// //       name,
// //       "longitude:",
// //       longitude,
// //       "longitude:",
// //       latitude,
// //       "locationId:",
// //       locationId
// //     );

// //     destinationPhotos(locationId, name);
// //   } catch (e) {
// //     console.error(e);
// //   }
// // };

// // Using the deprecating API because it's the only one that has a description of the destination
// const destinationCoordinates = async destination => {
//   const URL = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${destination}&lang=en_US&units=km`;

//   try {
//     const response = await fetch(URL, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//         "x-rapidapi-key": "a2bab0e7f1mshba65b16d9bca6a4p1fb290jsncdb7eb0d8f34",
//       },
//     });

//     if (!response.ok) return console.error("response status error");
//     const data = await response.json();
//     // console.log(data.data[0].result_object);
//     const placeDetails = data.data[0].result_object;
//     console.log("DETAILS", placeDetails);
//     const name = placeDetails.name;
//     const latitude = placeDetails.latitude;
//     const longitude = placeDetails.longitude;
//     const locationId = placeDetails.location_id;
//     const description = placeDetails.description;
//     console.log(
//       "name:",
//       name,
//       "longitude:",
//       longitude,
//       "longitude:",
//       latitude,
//       "locationId:",
//       locationId,
//       "description:",
//       description
//     );

//     destinationPhotos(locationId, name, description);
//     // destinationAttractions(latitude, longitude);
//     destinationAttractions(locationId);
//   } catch (e) {
//     console.error(e);
//   }
// };

// destinationCoordinates(destination);

// // Get PHOTOS AND INFO on places in city/country
// const destinationPhotos = async (locationId, name, description) => {
//   const URL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${locationId}&currency=ZAR&limit=10&lang=en_US`;

//   try {
//     const response = await fetch(URL, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//         "x-rapidapi-key": "a2bab0e7f1mshba65b16d9bca6a4p1fb290jsncdb7eb0d8f34",
//       },
//     });

//     if (!response.ok) return console.error("response status error");
//     const data = await response.json();
//     const photoGroup = data.data.slice(0, 3);

//     // Adds name of place to heading
//     placeName.innerHTML = `<h1 data-heading><span class="text-secondary-400 font-semibold">Explore</span> ${name}</h1>`;
//     aboutName.innerHTML = `About ${name}`;
//     placeDescription.innerHTML = description;

//     destinationInfoTemplate(photoGroup);
//   } catch (e) {
//     console.error(e);
//   }
// };

// // Function for getting the photos

// const destinationInfoTemplate = photoGroup => {
//   // placeInfo.innerHTML = "";

//   // console.log(
//   //   photoGroup.forEach(picture => {
//   //     const image = picture.images.large.url;
//   //     const caption = picture.caption;
//   //     const hero = `
//   //   <img class="sm:col-span-3 sm:row-span-4 h-full w-full object-cover rounded-lg" src="${image}" alt="${caption}">
//   //   `;
//   //     placeInfo.innerHTML += hero;
//   //   })
//   // );
//   const picture1 = photoGroup[0].images.original.url;
//   const caption1 = photoGroup[0].caption;

//   const picture2 = photoGroup[1].images.large.url;
//   const caption2 = photoGroup[1].caption;

//   const picture3 = photoGroup[2].images.large.url;
//   const caption3 = photoGroup[2].caption;
//   const hero = `
//         <img class="sm:col-span-3 sm:row-span-4 h-full w-full object-cover rounded-lg" src="${picture1}" alt="${caption1}">
//         <img class="sm:col-span-2 sm:row-span-2 h-full w-full object-cover rounded-lg" src="${picture2}" alt="${caption2}">
//         <img class="sm:col-span-2 sm:row-span-2 h-full w-full object-cover rounded-lg" src="${picture3}" alt="${caption3}">
//     `;
//   placeInfo.innerHTML = hero;
// };

// // Get the THINGS TO DO for the destination

// // const destinationAttractions = async (latitude, longitude) => {
// //   const URL = `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${longitude}&latitude=${latitude}&lunit=km&currency=ZAR&lang=en_US`;

// //   try {
// //     const response = await fetch(URL, {
// //       method: "GET",
// //       headers: {
// //         "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
// //         "x-rapidapi-key": "16e3acdd49msh25947ac11c794fap1f8ca9jsn211243103f14",
// //       },
// //     });

// //     if (!response.ok) return console.error("response status error");

// //     const data = await response.json();
// //     const attraction = data.data.slice(0, 12);
// //     console.log(attraction);
// //   } catch (e) {
// //     console.error(e);
// //   }
// // };

// const destinationAttractions = async locationId => {
//   const URL = `https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${locationId}&currency=ZAR&lang=en_US&lunit=km&sort=ranking`;

//   try {
//     const response = await fetch(URL, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//         "x-rapidapi-key": "a2bab0e7f1mshba65b16d9bca6a4p1fb290jsncdb7eb0d8f34",
//       },
//     });

//     if (!response.ok) return console.error("response status error");

//     const data = await response.json();
//     console.log(data.data);

//     const attractions = data.data;
//     // attractions.filter(item => item.location_id != 0);
//     const answer = attractions.filter(
//       item => item.location_id != 0 && !item.ad_position
//     );
//     console.log("Filtered for ratings:", answer);
//     // console.log(attraction);
//   } catch (e) {
//     console.error(e);
//   }
// };
