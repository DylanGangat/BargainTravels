// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartTotal = exports.cartItems = exports.shoppingCartTotalIcon = void 0;
const navToggle = document.querySelector("[data-nav-toggle]");
const overlay = document.querySelector("[data-overlay]");
const nav = document.querySelector("[data-nav]");
const shoppingCart = JSON.parse(localStorage.getItem("SHOPPING_CART"));
const shoppingCartTotalIcon = document.querySelector("[data-shoppingcart-icon]");
exports.shoppingCartTotalIcon = shoppingCartTotalIcon;
const cartItems = shoppingCartTotalIcon.querySelector(".shopping-cart-total"); // Function for updating the items total thats above the shopping icon

exports.cartItems = cartItems;

const cartTotal = cart => {
  if (cart.length) {
    cartItems.textContent = cart.length;
    cartItems.classList.remove("visually-hidden");
  } else {
    cartItems.classList.add("visually-hidden");
  }
}; // tTo hide items total when


exports.cartTotal = cartTotal;

if (shoppingCart != null && shoppingCart.length !== 0) {
  cartTotal(shoppingCart);
} else {
  cartItems.classList.add("visually-hidden");
}

navToggle.addEventListener("click", e => {
  if (!e.currentTarget.hasAttribute("data-nav-toggle")) return;
  nav.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
overlay.addEventListener("click", e => {
  if (!e.target.hasAttribute("data-overlay")) return;
  nav.classList.add("hidden");
  overlay.classList.add("hidden");
});
},{}],"scripts/city.js":[function(require,module,exports) {
"use strict";

require("./script.js");

const destination = JSON.parse(sessionStorage.getItem("DESTINATION"));
const placeInfo = document.querySelector("[data-destination]");
const placeName = document.querySelector("[data-heading]");
const aboutName = document.querySelector("[data-sub-heading]");
const placeDescription = document.querySelector("[data-description]");
const essentialName = document.querySelector("[data-activities-destination]");
const API_KEY = "a2bab0e7f1mshba65b16d9bca6a4p1fb290jsncdb7eb0d8f34";
const attractionsCarousel = document.querySelector("[data-attraction-carousel]");
const restaurantsCarousel = document.querySelector("[data-restaurant-carousel]");
const hotelsCarousel = document.querySelector("[data-hotel-carousel]"); // To round off the rating to only 1 decimal place.

const roundedOff = score => score.toFixed(0); // ============================= //
// Get Coordinates
// ============================= //
// Using the deprecating API because it's the only one that has a description of the destination


const destinationCoordinates = async destination => {
  const URL = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${destination}&lang=en_US&units=km`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    });
    if (!response.ok) return console.error("response status error");
    const data = await response.json();
    const placeDetails = data.data[0].result_object;
    const name = placeDetails.name;
    const locationId = placeDetails.location_id;
    const description = placeDetails.description;
    destinationPhotos(locationId, name, description);
    destinationAttractions(locationId);
    destinationRestaurants(locationId);
    destinationHotels(locationId);
  } catch (e) {
    console.error(e);
  }
};

if (destination != null) {
  destinationCoordinates(destination);
} // ============================= //
// Hero
// ============================= //
// Get PHOTOS AND INFO on places in city/country


const destinationPhotos = async (locationId, name, description) => {
  const URL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${locationId}&currency=ZAR&limit=10&lang=en_US`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    });
    if (!response.ok) return console.error("response status error");
    const data = await response.json();
    const photoGroup = data.data.slice(0, 3); // Adds name of place to heading

    placeName.innerHTML = `<h1 data-heading><span class="text-secondary-400 font-semibold">Explore</span> ${name}</h1>`;
    aboutName.innerHTML = `About ${name}`;
    essentialName.innerHTML = `Essential ${name}`;
    placeDescription.innerHTML = description;
    destinationInfoTemplate(photoGroup);
  } catch (e) {
    console.error(e);
  }
}; // Function for getting the photos


const destinationInfoTemplate = photoGroup => {
  const picture1 = photoGroup[0].images.original.url;
  const caption1 = photoGroup[0].caption;
  const picture2 = photoGroup[1].images.large.url;
  const caption2 = photoGroup[1].caption;
  const picture3 = photoGroup[2].images.large.url;
  const caption3 = photoGroup[2].caption;
  const hero = `
        <img class="sm:col-span-3 sm:row-span-4 h-full w-full object-cover rounded-lg" src="${picture1}" alt="${caption1}">
        <img class="sm:col-span-2 sm:row-span-2 h-full w-full object-cover rounded-lg" src="${picture2}" alt="${caption2}">
        <img class="sm:col-span-2 sm:row-span-2 h-full w-full object-cover rounded-lg" src="${picture3}" alt="${caption3}">
    `;
  placeInfo.innerHTML = hero;
}; // ============================= //
// Attractions
// ============================= //
// // Get attractions for unique destination


const destinationAttractions = async locationId => {
  const URL = `https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${locationId}&currency=ZAR&lang=en_US&lunit=km&limit=30&sort=recommended`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    });
    if (!response.ok) return console.error("response status error");
    const data = await response.json();
    const answers = data.data;
    const attractions = answers.filter(item => !item.ad_position);
    attractionsCarousel.innerHTML = "";
    attractions.forEach(attractionCard);
  } catch (e) {
    console.error(e);
  }
}; // Attractions template card


const attractionCard = item => {
  const {
    name,
    location_id,
    ranking,
    rating,
    num_reviews,
    website
  } = item;
  const score = roundedOff(parseInt(rating));
  const card = `
  <div class="carousel-card" data-attraction-id="${location_id}">
  <div class="image"><img src="${item.photo.images.medium.url}"
          alt="${item.photo.caption}" loading="lazy">
  </div>
  <div class="mt-2">
      <h3><a href="${website}" target="_blank">${name}</a></h3>
      <div class="flex gap-1 mt-2 items-center" data-stars="${score}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary-400"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg><span class="font-bold text-secondary-400">${score}</span>

    <span class="text-xs text-gray-400 ml-1" data-reviews>(${num_reviews})</span> 
      </div>
      <p>${ranking}</p>
  </div>
  <div class="heart">
      <img class="h-6 w-6 cursor-pointer heart-empty" src="/heart-empty.a66c4ffe.svg"
          alt="empty heart" data-heart>
      <img class="h-6 w-6 cursor-pointer heart-filled hidden"
          src="/heart-filled.0ca63264.svg" alt="empty heart" data-heart>
  </div>
</div>`;
  attractionsCarousel.innerHTML += card;
}; // ============================= //
// Restaurants
// ============================= //
// // Get restaurants for unique destination


const destinationRestaurants = async locationId => {
  const URL = `https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${locationId}&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=ZAR&lunit=km&limit=30&open_now=false&lang=en_US`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    });
    if (!response.ok) return console.error("response status error");
    const data = await response.json();
    const answers = data.data;
    const restaurants = answers.filter(item => !item.ad_position);
    restaurantsCarousel.innerHTML = "";
    restaurants.forEach(restaurantCard);
  } catch (e) {
    console.error(e);
  }
}; // Restaurant template card


const restaurantCard = item => {
  const {
    name,
    location_id,
    rating,
    num_reviews,
    website,
    price_level,
    cuisine
  } = item;
  const score = roundedOff(parseInt(rating));
  const types = cuisine.slice(0, 3).map(item => item.name).join(", ");
  const card = `
  <div class="carousel-card" data-restaurant-id="${location_id}">
  <div class="image"><img src="${item.photo.images.medium.url}"
          alt="${item.photo.caption}" loading="lazy">
  </div>
  <div class="mt-2">
      <h3><a href="${website}" target="_blank">${name}</a></h3>
      <div class="flex gap-1 mt-2 items-center" data-stars="${score}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary-400"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg><span class="font-bold text-secondary-400">${score}</span>

    <span class="text-xs text-gray-400 ml-1" data-reviews>(${num_reviews})</span> 
    <span class="ml-auto text-secondary-400 font-semibold">${price_level}</span>
      </div>
      <p>${types}</p>
  </div>
  <div class="heart">
      <img class="h-6 w-6 cursor-pointer heart-empty" src="/heart-empty.a66c4ffe.svg"
          alt="empty heart" data-heart>
      <img class="h-6 w-6 cursor-pointer heart-filled hidden"
          src="/heart-filled.0ca63264.svg" alt="empty heart" data-heart>
  </div>
</div>`;
  restaurantsCarousel.innerHTML += card;
}; // ============================= //
// Hotels
// ============================= //
// // Get hotels for unique destination


const destinationHotels = async locationId => {
  const URL = `https://travel-advisor.p.rapidapi.com/hotels/list?location_id=${locationId}&adults=1&rooms=1&nights=2&offset=0&currency=ZAR&order=asc&limit=30&sort=popularity&lang=en_US`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    });
    if (!response.ok) return console.error("response status error");
    const data = await response.json();
    const filterOutAds = data.data;
    const hotels = filterOutAds.filter(item => !item.ad_position);
    hotelsCarousel.innerHTML = "";
    hotels.forEach(hotelCard);
  } catch (e) {
    console.error(e);
  }
}; // hotels template card


const hotelCard = item => {
  const {
    name,
    location_id,
    ranking,
    rating,
    num_reviews,
    price_level
  } = item;
  const score = roundedOff(parseInt(rating));
  const card = `
  <div class="carousel-card" data-hotel-id="${location_id}">
  <div class="image"><img src="${item.photo.images.medium.url}"
          alt="Image of the ${name}" loading="lazy">
  </div>
  <div class="mt-2">
      <h3><a href="#" target="_blank">${name}</a></h3>
      <div class="flex gap-1 mt-2 items-center" data-stars="${score}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary-400"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg><span class="font-bold text-secondary-400">${score}</span>

    <span class="text-xs text-gray-400 ml-1" data-reviews>(${num_reviews})</span> 
    <span class="ml-auto text-secondary-400 font-semibold">${price_level}</span>
      </div>
      <p>${ranking}</p>
  </div>
  <div class="heart">
      <img class="h-6 w-6 cursor-pointer heart-empty" src="/heart-empty.a66c4ffe.svg"
          alt="empty heart" data-heart>
      <img class="h-6 w-6 cursor-pointer heart-filled hidden"
          src="/heart-filled.0ca63264.svg" alt="empty heart" data-heart>
  </div>
</div>`;
  hotelsCarousel.innerHTML += card;
}; // ============================= //
// Saving Trips
// ============================= //


const activities = document.querySelector(".destination-activities"); // To store all the activities you loved.

let trips = [];
const places = JSON.parse(localStorage.getItem("LOVED_PLACES")); // Added this because if we leave the trips page it doesn't keep the previous saved trips but now it does because if there is local stoarage saved then we updated the empty trips array with those objects.

if (places) {
  trips = places;
}

const saveActivities = e => {
  if (!e.target.hasAttribute("data-heart")) return; // To change the heart on click

  if (e.target.classList.contains("heart-empty")) {
    e.target.classList.toggle("hidden");
    const sibling2 = e.target.parentElement.querySelector(".heart-filled");
    sibling2.classList.toggle("hidden");
  } else {
    e.target.classList.toggle("hidden");
    const sibling1 = e.target.parentElement.querySelector(".heart-empty");
    sibling1.classList.toggle("hidden");
  } // Get the carousel card so it will be easier to manipulate the DOM.


  const carouselCard = e.target.closest(".carousel-card");
  const image = carouselCard.querySelector("img").src;
  const name = carouselCard.querySelector("h3").textContent;
  const info = carouselCard.querySelector("p").textContent;
  const reviews = carouselCard.querySelector("[data-reviews]").textContent;
  const rating = carouselCard.querySelector("[data-stars]").dataset.stars;
  let card = {};
  card.image = image;
  card.name = name;
  card.info = info;
  card.rating = rating;
  card.reviews = reviews;
  trips.push(card); // To see if there are any duplicate and will filter those out of array that is passed to local storage

  const uniqueTrips = trips.filter((item, index, array) => array.findIndex(t => t.name === item.name && t.info === item.info) === index);
  localStorage.setItem("LOVED_PLACES", JSON.stringify(uniqueTrips));
};

activities.addEventListener("click", e => {
  saveActivities(e);
});
},{"./script.js":"scripts/script.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58895" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/city.js"], null)
//# sourceMappingURL=/city.fc9ac5f7.js.map