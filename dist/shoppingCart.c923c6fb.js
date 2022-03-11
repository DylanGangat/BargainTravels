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
}; // To hide items total when


exports.cartTotal = cartTotal;

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
},{}],"scripts/shoppingCart.js":[function(require,module,exports) {
"use strict";

var _script = require("./script.js");

let shoppingCart = [];
const emptyCartMessage = document.querySelector("[data-unsaved-message]");
const orderSummary = document.querySelector("[data-order-summary]");
const cardParent = document.querySelector("[data-shopping-cart]");
const subTotal = document.querySelector("[data-order-subtotal]");
const orderTotal = document.querySelector("[data-order-total]");
const checkoutBtn = document.querySelector("[data-btn-checkout]");
cardParent.innerHTML = ""; // To watch for updates on cards in the shoppingCart

cardParent.addEventListener("click", e => {
  // Remove a product item
  removeItem(e);
});
cardParent.addEventListener("change", e => {
  // Update total when changing quantity
  quantityUpdated(e);
}); // Remove all items and localStorage after clicking checkout button.

checkoutBtn.addEventListener("click", e => {
  if (localStorage.getItem("SHOPPING_CART")) {
    shoppingCart = [];
    updateCart(shoppingCart);
  }
}); // For removing product item

const removeItem = e => {
  if (e.target.hasAttribute("data-remove")) {
    const parent = e.target.closest(".cart-item"); // Had to convert id from string to number

    const id = parseInt(parent.dataset.id);
    const filteredCart = shoppingCart.filter(item => item.id !== id);
    updateCart(filteredCart);
  }
}; // For Update total when changing quantity


const quantityUpdated = e => {
  if (e.target.hasAttribute("data-quantity")) {
    const parent = e.target.closest(".cart-item"); // Had to convert id from string to number

    const id = parseInt(parent.dataset.id);
    const size = parent.querySelector("[data-size]").dataset.size;
    const quantity = parseInt(e.target.value);
    const findCartItem = shoppingCart.find(item => item.id === id && item.size === size);
    findCartItem.quantity = quantity;
    let quantityChanged = shoppingCart;
    updateCart(quantityChanged);
  }
}; // To put the information of the products into card items


const generateShoppingCart = cart => {
  cardParent.innerHTML = "";
  cart.forEach(templateCard);
}; // Template for the card item


const templateCard = item => {
  const {
    image,
    name,
    price,
    quantity,
    size,
    id
  } = item;
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
}; // Update cart in local storage


const updateCart = filteredCart => {
  // Sets the local storage with new filtered array
  localStorage.setItem("SHOPPING_CART", JSON.stringify(filteredCart)); // updates shoppingCart with filtered array

  shoppingCart = JSON.parse(localStorage.getItem("SHOPPING_CART")); // Uses new array to form new template

  generateShoppingCart(shoppingCart);
  updatePrice(shoppingCart);
  (0, _script.cartTotal)(shoppingCart); // Checks whether it should display or hide message due to the updated array

  cartMessage(shoppingCart);
}; // Update the price of total


const updatePrice = shoppingCart => {
  let totalPrice = shoppingCart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  subTotal.textContent = `R${totalPrice}`;
  orderTotal.textContent = `R${totalPrice}`;
}; // If there are items in local storage then we can get the info and display it


const loadShoppingCart = () => {
  if (localStorage.getItem("SHOPPING_CART")) {
    shoppingCart = JSON.parse(localStorage.getItem("SHOPPING_CART"));
    generateShoppingCart(shoppingCart);
    updatePrice(shoppingCart);
    (0, _script.cartTotal)(shoppingCart);
  }
};

loadShoppingCart(); // To display empty message if user didnt add to cart anything

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58429" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/shoppingCart.js"], null)
//# sourceMappingURL=/shoppingCart.c923c6fb.js.map