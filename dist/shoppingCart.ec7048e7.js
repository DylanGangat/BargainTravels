parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"p7kT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cartTotal=exports.cartItems=exports.shoppingCartTotalIcon=void 0;const t=document.querySelector("[data-nav-toggle]"),e=document.querySelector("[data-overlay]"),a=document.querySelector("[data-nav]"),s=JSON.parse(localStorage.getItem("SHOPPING_CART")),l=document.querySelector("[data-shoppingcart-icon]");exports.shoppingCartTotalIcon=l;const o=l.querySelector(".shopping-cart-total");exports.cartItems=o;const c=t=>{t.length?(o.textContent=t.length,o.classList.remove("visually-hidden")):o.classList.add("visually-hidden")};exports.cartTotal=c,null!=s&&0!==s.length?c(s):o.classList.add("visually-hidden"),t.addEventListener("click",t=>{t.currentTarget.hasAttribute("data-nav-toggle")&&(a.classList.toggle("visually-hidden"),a.classList.toggle("active"),e.classList.toggle("visually-hidden"),e.classList.toggle("active"))}),e.addEventListener("click",t=>{t.target.hasAttribute("data-overlay")&&(a.classList.add("visually-hidden"),a.classList.toggle("active"),e.classList.add("visually-hidden"),e.classList.remove("active"))});
},{}],"HSqf":[function(require,module,exports) {
"use strict";var t=require("./script.js");let e=[];const a=document.querySelector("[data-unsaved-message]"),n=document.querySelector("[data-order-summary]"),s=document.querySelector("[data-shopping-cart]"),r=document.querySelector("[data-order-subtotal]"),i=document.querySelector("[data-order-total]");s.innerHTML="",s.addEventListener("click",t=>{d(t)}),s.addEventListener("change",t=>{l(t)});const d=t=>{if(t.target.hasAttribute("data-remove")){const a=t.target.closest(".cart-item"),n=parseInt(a.dataset.id),s=e.filter(t=>t.id!==n);m(s)}},l=t=>{if(t.target.hasAttribute("data-quantity")){console.log("clicked");const a=t.target.closest(".cart-item"),n=parseInt(a.dataset.id),s=a.querySelector("[data-size]").dataset.size,r=parseInt(t.target.value);e.find(t=>t.id===n&&t.size===s).quantity=r,m(e)}},o=t=>{s.innerHTML="",t.forEach(c)},c=t=>{const{image:e,name:a,price:n,quantity:r,size:i,id:d}=t,l=`\n        <div class="cart-item" data-id="${d}">\n            <div class="col-span-full xs:col-span-1">\n                <img class="mockup" src="${e}" alt="A mockup of our ${a}" loading="lazy">\n            </div>\n            <div class="col-span-full xs:col-span-2 flex flex-col">\n                <div>\n                <div class="flex items-center justify-between">\n                    <h3 class="font-semibold text-lg md:text-2xl">${a}</h3>\n                    <p class="size text-secondary-300 border-secondary" data-size="${i}">${i}</p>\n                </div>\n                <p class="text-secondary-400 text-lg md:text-2xl font-semibold mt-1 md:mt-2" data-price="${n}">R${n}</p>          \n                </div>\n                <div class="more-info">\n                    <div class="flex gap-4 items-center">\n                        <label for="number${d}">Quantity:</label>\n                        <input type="number" name="number" id="number${d}" min="1" value="${r}" required data-quantity>\n                    </div>\n                    <button data-remove>Remove</button>\n                </div>\n            </div>\n        </div>\n            `;s.innerHTML+=l},m=a=>{localStorage.setItem("SHOPPING_CART",JSON.stringify(a)),e=JSON.parse(localStorage.getItem("SHOPPING_CART")),o(e),u(e),(0,t.cartTotal)(e),p(e)},u=t=>{let e=t.reduce((t,e)=>t+e.price*e.quantity,0);r.textContent=`R${e}`,i.textContent=`R${e}`},g=()=>{localStorage.getItem("SHOPPING_CART")&&(e=JSON.parse(localStorage.getItem("SHOPPING_CART")),o(e),u(e),(0,t.cartTotal)(e))};localStorage.getItem("SHOPPING_CART")&&(e=JSON.parse(localStorage.getItem("SHOPPING_CART")),o(e),u(e),(0,t.cartTotal)(e));const p=t=>{0===t.length?(a.classList.remove("hidden"),n.classList.add("hidden")):(a.classList.add("hidden"),n.classList.remove("hidden"))};p(e);
},{"./script.js":"p7kT"}]},{},["HSqf"], null)
//# sourceMappingURL=/shoppingCart.ec7048e7.js.map