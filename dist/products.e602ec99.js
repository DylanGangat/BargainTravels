parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"p7kT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cartTotal=exports.cartItems=exports.shoppingCartTotalIcon=void 0;const t=document.querySelector("[data-nav-toggle]"),e=document.querySelector("[data-overlay]"),a=document.querySelector("[data-nav]"),s=JSON.parse(localStorage.getItem("SHOPPING_CART")),l=document.querySelector("[data-shoppingcart-icon]");exports.shoppingCartTotalIcon=l;const o=l.querySelector(".shopping-cart-total");exports.cartItems=o;const c=t=>{t.length?(o.textContent=t.length,o.classList.remove("visually-hidden")):o.classList.add("visually-hidden")};exports.cartTotal=c,null!=s&&0!==s.length?c(s):o.classList.add("visually-hidden"),t.addEventListener("click",t=>{t.currentTarget.hasAttribute("data-nav-toggle")&&(a.classList.toggle("visually-hidden"),a.classList.toggle("active"),e.classList.toggle("visually-hidden"),e.classList.toggle("active"))}),e.addEventListener("click",t=>{t.target.hasAttribute("data-overlay")&&(a.classList.add("visually-hidden"),a.classList.toggle("active"),e.classList.add("visually-hidden"),e.classList.remove("active"))});
},{}],"nlyi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.savedCart=void 0;var e=require("./script.js");const t=document.querySelector("[data-product-info]"),r=document.querySelector(".btn"),a=document.querySelector(".colours-group"),o=document.querySelectorAll(".colour-block"),c=document.querySelectorAll("[data-changing-image]"),s=JSON.parse(localStorage.getItem("SHOPPING_CART"));exports.savedCart=s;let l=[];s&&0!==s.length&&(l=s,(0,e.cartTotal)(l));const i=()=>{const r=t.querySelector("[data-name]").textContent,a=parseInt(t.querySelector("[data-price]").dataset.price),o=t.querySelector("[data-size]").value,c=t.querySelector("[data-color-group]").querySelector(".active").textContent,s=parseInt(t.querySelector("[data-quantity]").value),i=document.querySelector(".active").dataset.mockup,n=Math.floor(1e3*Math.random()+1),d={};if(d.name=r,d.price=a,d.quantity=s,d.size=o,d.color=c,d.image=i,d.id=n,""===d.size)return;l.push(d);const u=l.slice().reverse().filter((e,t,r)=>r.findIndex(t=>t.size===e.size&&t.name===e.name&&t.color===e.color)===t).reverse();(0,e.cartTotal)(u),localStorage.setItem("SHOPPING_CART",JSON.stringify(u))};r.addEventListener("click",()=>{i()});const n=e=>{if(e.target.classList.contains("colour-block")){o.forEach(e=>e.classList.remove("active"));e.target.classList.add("active");const t=e.target.dataset.color,r=document.querySelector(`${t}`);c.forEach(e=>e.classList.add("visually-hidden")),r.classList.remove("visually-hidden")}};a.addEventListener("click",e=>{n(e)});
},{"./script.js":"p7kT"}]},{},["nlyi"], null)
//# sourceMappingURL=/products.e602ec99.js.map