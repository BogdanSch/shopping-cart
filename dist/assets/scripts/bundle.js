/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/jquery.maskedinput/gruntfile.js":
/*!******************************************************!*\
  !*** ./node_modules/jquery.maskedinput/gruntfile.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




module.exports = function( grunt ) {
  grunt.initConfig({
    // TODO: change to read component.json
    pkg: __webpack_require__(/*! ./package.json */ "./node_modules/jquery.maskedinput/package.json"),

    uglify: {
      options: {
        banner: '/*\n    <%= pkg.description %>\n    Copyright (c) 2007 - <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)\n    Version: <%= pkg.version %>\n*/\n'
      },

      dev: {
        options: {
          beautify: true,
          mangle: false
        },

        files: {
          'dist/jquery.maskedinput.js': ['src/jquery.maskedinput.js']
        }
      },

      min: {
        files: {
          'dist/jquery.maskedinput.min.js': ['src/jquery.maskedinput.js']
        }
      }
    },

    jasmine: {
      full: {
        src: "src/**/*.js",
        options: {
          specs: "spec/*[S|s]pec.js",
          vendor: [
            "spec/lib/matchers.js",
            "spec/lib/jasmine-species/jasmine-grammar.js",
            "spec/lib/setup.js",
            "lib/jquery-1.9.0.min.js",
            "spec/lib/jquery.keymasher.js"
          ]
        }
      }
    },
    nugetpack: {
        dist: {
            src: 'jquery.maskedinput.nuspec',
            dest: 'dist/'
        }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-nuget');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('pack', ['default','nugetpack']);
  grunt.registerTask('default', ['test', 'uglify']);
};


/***/ }),

/***/ "./src/scripts/js/authentication-handler.js":
/*!**************************************************!*\
  !*** ./src/scripts/js/authentication-handler.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_authentication_user_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/authentication/user.js */ "./src/scripts/js/modules/authentication/user.js");
/* harmony import */ var _modules_authentication_user_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/authentication/user-manager.js */ "./src/scripts/js/modules/authentication/user-manager.js");
/* harmony import */ var _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/authentication/cookie.js */ "./src/scripts/js/modules/authentication/cookie.js");






const authenticationHandlerModule = () => {
  const body = document.body;
  const loggedInUserCookieName = "loggedInUser";
  const cookieLifeDuration = new Date() + 2 * 3600000;

  const userManager = new _modules_authentication_user_manager_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  let loginCookie = null;

  if (_modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"].checkCookie(loggedInUserCookieName)) {
    loginCookie = _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCookie(loggedInUserCookieName);
  }

  function signIn(email, password) {
    let user = userManager.findUser(email, password);

    if (user) {
      loginCookie = new _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"]("loggedInUser", email, cookieLifeDuration);
      return true;
    } else {
      return false;
    }
  }

  function signUp(name, email, number, password) {
    const user = new _modules_authentication_user_js__WEBPACK_IMPORTED_MODULE_0__["default"](name, email, number, password);
    userManager.addUser(user);
    loginCookie = new _modules_authentication_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"]("loggedInUser", email, cookieLifeDuration);
  }

  if (body.dataset.svPage === "sign-in") {
    const signInForm = $("#signInForm");
    signInForm.on("submit", (event) => {
      event.preventDefault();
      const email = signInForm.find("#inputEmail").val();
      const password = signInForm.find("#inputPassword").val();
      if (signIn(email, password)) location.href = "index.html";
      return false;
    });
  } else if (body.dataset.svPage === "sign-up") {
    const signUpForm = $("#signUpForm");
    signUpForm.on("submit", (event) => {
      event.preventDefault();
      const name = signUpForm.find("#inputName").val();
      const email = signUpForm.find("#inputEmail").val();
      const number = signUpForm.find("#inputNumber").val();
      const password = signUpForm.find("#inputPassword").val();
      signUp(name, email, number, password);
      location.href = "index.html";
    });
  } else {
    if (loginCookie !== null) {
      $(".header .profile__dropdown").html(
        `<li><button class="btn brn-log-out dropdown-item">Log out</button></li>`
      );
      $(".header .profile__dropdown .brn-log-out").on(
        "click",
        function (event) {
          loginCookie?.deleteCookie();
        }
      );
    } else {
      $(".header .profile__dropdown")
        .html(`<li><a class="dropdown-item" href="./sign-in.html">Sign in</a></li>
      <li>
          <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="./sign-up.html">Sign up</a></li>`);
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authenticationHandlerModule);


/***/ }),

/***/ "./src/scripts/js/cart-handler.js":
/*!****************************************!*\
  !*** ./src/scripts/js/cart-handler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cardHandler: () => (/* binding */ cardHandler),
/* harmony export */   categories: () => (/* binding */ categories),
/* harmony export */   currency: () => (/* binding */ currency)
/* harmony export */ });
/* harmony import */ var _modules_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cart.js */ "./src/scripts/js/modules/cart.js");
/* harmony import */ var _modules_category_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/category.js */ "./src/scripts/js/modules/category.js");
/* harmony import */ var _modules_products_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/products-loader.js */ "./src/scripts/js/modules/products-loader.js");




function cardHandler() {
  const cartProductsList = document.querySelector(
    ".header__cart-list .items-list"
  );

  const body = document.body;
  const productsToGenerateContainer = document.querySelector(
    ".products-container"
  );
  const amountProductsToDisplay = 12;
  const totalPriceLabel = document.querySelector(".items-total-price");
  const clearCartButton = document.querySelector("#clearCartButton");

  function main() {
    const addToCartButtons = document.querySelectorAll(".products__add-button");

    const cart = new _modules_cart_js__WEBPACK_IMPORTED_MODULE_0__.Cart("cart", cartProductsList, totalPriceLabel);
    cart.displayCartItems();

    addToCartButtons.forEach((addToCartButton) => {
      addToCartButton.addEventListener("click", (event) => {
        addToCartButton.innerHTML = "Added to your cart";
        setTimeout(() => {
          addToCartButton.innerHTML = "Add to the cart";
        }, 1000);
        const buttonParent = addToCartButton.parentNode.parentNode;
        cart.addItem(buttonParent);
      });
    });

    clearCartButton.addEventListener("click", (event) => {
      cart.clearCart();
    });
  }

  function generateProductsSection(
    htmlContent,
    productsCategory,
    showStoreButton
  ) {
    if (productsToGenerateContainer) {
      let productsSectionText = `<section class="products mb-5" id="products-${productsCategory.title}" data-aos="fade-up" data-aos-duration="2000">
      <div class="container">
          <div class="products__wrap">
              <div class="text-content">
                  <h2 class="products__title text-center">${productsCategory.title}</h2>
                  <p class="products__description text-center">${productsCategory.description}</p>
              </div>
              <div class="products__list mt-5">${htmlContent}</div>
              `;
      if (showStoreButton) {
        productsSectionText += `<div class="products__more text-center mt-5"><a href="./store.html" class="btn btn-primary btn-lg">Shop More</a></div>`;
      }
      productsSectionText += `</div></div></section>`;
      productsToGenerateContainer.innerHTML += productsSectionText;
    }
  }

  if (productsToGenerateContainer) {
    let productsLoader = null;

    if (body.dataset.svPage === "home") {
      productsLoader = new _modules_products_loader_js__WEBPACK_IMPORTED_MODULE_2__.ProductsLoader(
        "./data/products.json",
        categories.latestDeals,
        generateProductsSection,
        main
      );
      productsLoader.loadProducts(amountProductsToDisplay);
    } else if (body.dataset.svPage === "store") {
      productsLoader = new _modules_products_loader_js__WEBPACK_IMPORTED_MODULE_2__.ProductsLoader(
        "./data/products.json",
        categories.latestDeals,
        generateProductsSection,
        main
      );
      productsLoader.loadProducts(amountProductsToDisplay);

      productsLoader.productsCategory = categories.laptops;
      productsLoader.loadProducts(amountProductsToDisplay);

      productsLoader.productsCategory = categories.iphones;
      productsLoader.loadProducts(amountProductsToDisplay);
    }
  }
}

const categories = {
  latestDeals: new _modules_category_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "Latest Deals",
    `Discover our diverse selection of high-quality
  tech products, ranging from cutting-edge smartphones to powerful laptops, designed to
  elevate
  your digital experience. Explore our curated collection and find the perfect device to
  suit your needs and style.`,
    true
  ),
  iphones: new _modules_category_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "Iphone",
    `Discover the latest innovations in mobile technology with our selection of iPhones. From the sleek design to the cutting-edge features, each iPhone offers a seamless blend of style and performance. Whether you're captivated by the stunning displays, powerful cameras, or intuitive user experience, there's an iPhone to suit every need and preference. Explore our collection to find the perfect balance of elegance and functionality, and elevate your mobile experience with the iconic iPhone.`
  ),
  laptops: new _modules_category_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "Laptop",
    `Elevate your productivity and computing experience with our range of laptops. Designed for performance and versatility, our laptops offer powerful processing capabilities, stunning displays, and sleek, portable designs. Whether you're a professional looking for a reliable workhorse or a student seeking a versatile device for studying and entertainment, our selection of laptops caters to diverse needs and preferences. From ultra-portable models for on-the-go productivity to high-performance machines for gaming and multimedia tasks, explore our collection to find the perfect laptop to match your lifestyle.`
  ),
};

const currency = "$";


/***/ }),

/***/ "./src/scripts/js/chat-bot.js":
/*!************************************!*\
  !*** ./src/scripts/js/chat-bot.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chatbotModule)
/* harmony export */ });


class Chatbot {
  constructor() {
    this.phrases = {
      main: [
        "Our manager will call you back soon!",
        "You can clarify the details by phone at 123456789",
        "Stay connected!",
        "Today is a beautiful weather!",
        "It's very pleasant to communicate with you!",
      ],
      hello: "Hey there!",
      bye: "Glad to talk to you. See you next time!",
      aboutStore:
        "Our online store offers a wide range of products at competitive prices.",
      contactInfo:
        "You can contact us at support@example.com or call us at 123-456-7890.",
      hoursOfOperation:
        "Our store is open Monday to Friday from 9:00 AM to 5:00 PM.",
    };

    this.chatbotElement = $(".chatbot__form");
    this.questionInput = $("#questionInput");
    this.answers = $("#answers");

    this.openChatbotButton = $(".chatbot__button");

    this.init();
  }

  init() {
    this.displayMessage("bot", this.phrases.hello);

    this.openChatbotButton.on("click", () => {
      this.chatbotElement.toggleClass("show");
    });

    $("#questionInput, #chatbotSubmit").on("click", () => {
      return false;
    });

    $("#chatbotSubmit").on("click", () => {
      let question = this.questionInput.val().trim();

      if (!this.checkString(question)) {
        this.questionInput.val("");
        this.displayMessage("user", question);

        setTimeout(() => {
          if (question.toLowerCase().includes("bye")) {
            this.displayMessage("bot", this.phrases.bye);
          } else if (question.toLowerCase().includes("about")) {
            this.displayMessage("bot", this.phrases.aboutStore);
          } else if (question.toLowerCase().includes("contact")) {
            this.displayMessage("bot", this.phrases.contactInfo);
          } else if (question.toLowerCase().includes("hours")) {
            this.displayMessage("bot", this.phrases.hoursOfOperation);
          } else {
            const randomIndex = Math.floor(
              Math.random() * this.phrases.main.length
            );
            this.displayMessage("bot", this.phrases.main[randomIndex]);
          }

          this.chatbotElement.animate(
            {
              scrollTop:
                chatbotElement.scrollHeight - chatbotElement.clientHeight,
            },
            10
          );
        }, 1000);
      }
    });

    this.questionInput.keypress("keyup", this.enterKey);
  }

  displayMessage(user, message) {
    this.answers.append(`<div class="answers__${user}">${message}</div>`);
  }

  enterKey(event) {
    if (event.keyCode === 13) {
      $("#chatbotSubmit").click();
      return false;
    }
  }

  checkString(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
}

function chatbotModule() {
  const chatbot = new Chatbot();
}


/***/ }),

/***/ "./src/scripts/js/contact-form.js":
/*!****************************************!*\
  !*** ./src/scripts/js/contact-form.js ***!
  \****************************************/
/***/ (() => {



(function ($, undefined) {
    const userPhone = $(".contact__form #phone");
    if (userPhone) {
        userPhone.mask("+31 (0) 999 999 999", { placeholder: " " });
    }
})(jQuery);

/***/ }),

/***/ "./src/scripts/js/header.js":
/*!**********************************!*\
  !*** ./src/scripts/js/header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ headerModule)
/* harmony export */ });


function headerModule() {
  // const headerOffset = 20;

  // window.addEventListener("scroll", (event) => {
  //   const header = $("header");
  //   if (window.scrollY >= headerOffset) {
  //     header.addClass("sticky");
  //   } else {
  //     if (header.hasClass("sticky")) {
  //       header.removeClass("sticky");
  //     }
  //   }
  // });
}


/***/ }),

/***/ "./src/scripts/js/images-loader.js":
/*!*****************************************!*\
  !*** ./src/scripts/js/images-loader.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const imagesLoaderModule = () => {
  const placeholderPath = `https://placehold.co/600x400`;

  const images = document.querySelectorAll("img");

  function setupImages() {
    images.forEach((image) => {
      if (!image.parentNode.classList.contains("carousel-item")) {
        const imageSrc = image.getAttribute("src");
        image.setAttribute("data-img-src", imageSrc);
        image.setAttribute("src", placeholderPath);
      }
    });
  }

  setupImages();

  function isInViewport(element, offset = 300) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= -offset &&
      rect.bottom <= document.documentElement.clientHeight + offset &&
      rect.right <= document.documentElement.clientWidth + offset
    );
  }

  function handleImageChange() {
    images.forEach((image) => {
      if (isInViewport(image)) {
        const dataSrc = image.getAttribute("data-img-src");
        if (dataSrc && image.src !== dataSrc) {
          image.src = dataSrc;
        }
      }
    });
  }

  handleImageChange();

  window.addEventListener("scroll", handleImageChange);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (imagesLoaderModule);


/***/ }),

/***/ "./src/scripts/js/modules/authentication/cookie.js":
/*!*********************************************************!*\
  !*** ./src/scripts/js/modules/authentication/cookie.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cookie)
/* harmony export */ });
class Cookie {
  constructor(name, value, expireDate) {
    this.name = name;
    this.value = value;
    this.expireDate = expireDate;
    this.initCookie();
  }
  initCookie() {
    let cookieString = `${this.name}=${this.value}`;
    const expires = new Date(this.expireDate).toUTCString();
    cookieString += `; expires=${expires}`;
    document.cookie = cookieString;
  }
  deleteCookie() {
    this.setCookie(this.name, "", { expires: new Date(0) });
    delete this.cookies[this.name];
  }
  static getExistingCookies() {
    const cookieString = document.cookie;
    console.log(document.cookie);
    let cookies = {};
    if (cookieString !== "") {
      const cookieArray = cookieString.split("; ");
      console.log(cookieArray);
      cookieArray.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookies[name] = value;
      });
    }
    return cookies;
  }
  static checkCookie(name) {
    const allCookies = this.getExistingCookies();
    return allCookies[name] !== null;
  }
  static getCookie(name) {
    const allCookies = this.getExistingCookies();
    return new Cookie(name, allCookies[name]);
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/authentication/user-manager.js":
/*!***************************************************************!*\
  !*** ./src/scripts/js/modules/authentication/user-manager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserManager)
/* harmony export */ });
class UserManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  }

  addUser(user) {
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  findUser(email, password) {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/authentication/user.js":
/*!*******************************************************!*\
  !*** ./src/scripts/js/modules/authentication/user.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor(name, email, number, password) {
    this.name = name;
    this.email = email;
    this.number = number;
    this.password = password;
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/cart.js":
/*!****************************************!*\
  !*** ./src/scripts/js/modules/cart.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cart: () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.js */ "./src/scripts/js/modules/product.js");


class Cart {
  #currency = `$`;

  constructor(name, cartProductsList, totalPriceLabel) {
    this.name = name;
    this.cartProductsList = cartProductsList;
    this.totalPriceLabel = totalPriceLabel;
    this.cartData = this.getCartData();
  }

  setCartData() {
    localStorage.setItem(this.name, JSON.stringify(this.cartData)) || {};
  }

  getCartData() {
    this.cartData = JSON.parse(localStorage.getItem(this.name)) || {};
    return this.cartData;
  }

  addItem(item) {
    this.getCartData();

    const itemId = item.getAttribute("data-product-id");

    if (this.cartData.hasOwnProperty(itemId)) {
      this.cartData[itemId][3] += 1;
    } else {
      const itemPicture = item.querySelector(`[class*="-picture"]`).src;
      const itemTitle = item.querySelector(`[class*="-title"]`).innerHTML;
      const itemPrice = item.querySelector(`[class*="-price"]`).innerHTML;
      const itemCategory = item.querySelector(`[class*="-category"]`).innerHTML;

      this.cartData[itemId] = [
        itemTitle,
        itemPicture,
        itemPrice,
        1,
        itemCategory,
      ];
    }

    this.setCartData();
    this.displayCartItems();
  }
  removeItem(item) {
    this.getCartData();
    const itemId = item.getAttribute("data-product-id");

    if (this.cartData.hasOwnProperty(itemId)) {
      this.cartData[itemId][3] -= 1;

      if (this.cartData[itemId][3] <= 0) {
        delete this.cartData[itemId];
      }
    } else {
      throw new Error("No such item was found!");
    }

    this.setCartData();
    this.displayCartItems();
  }
  clearCart() {
    localStorage.removeItem(this.name);
    this.displayCartItems();
  }
  displayCartItems() {
    this.getCartData();
    if (Object.keys(this.cartData).length) {
      let htmlContent = "";
      for (const key in this.cartData) {
        if (Object.hasOwnProperty.call(this.cartData, key)) {
          const productData = this.cartData[key];
          const product = new _product_js__WEBPACK_IMPORTED_MODULE_0__.Product(
            key,
            productData[0],
            productData[1],
            productData[2] * productData[3],
            productData[3],
            productData[4]
          );
          htmlContent += product.renderCartProduct();
        }
        this.cartProductsList.innerHTML = htmlContent;
      }

      this.addCartHandlers();
      this.displayTotalPrice();
    } else {
      this.cartProductsList.innerHTML = `Nothing yet to buy...`;
      this.displayTotalPrice();
    }
  }
  addCartHandlers() {
    const plusItemButtons = this.cartProductsList.querySelectorAll(".btn-add");
    const minusItemButtons =
      this.cartProductsList.querySelectorAll(".btn-minus");

    plusItemButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.addItem(button.parentNode.parentNode);
      });
    });
    minusItemButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.removeItem(button.parentNode.parentNode);
      });
    });
  }

  displayTotalPrice() {
    if (Object.keys(this.cartData).length) {
      let totalPrice = 0;
      for (const key in this.cartData) {
        if (Object.hasOwnProperty.call(this.cartData, key)) {
          const product = this.cartData[key];
          totalPrice += parseFloat(product[2]) * parseFloat(product[3]);
        }
      }
      this.totalPriceLabel.innerHTML = `${totalPrice}${this.#currency}`;
    } else {
      this.totalPriceLabel.innerHTML = `0${this.#currency}`;
    }
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/category.js":
/*!********************************************!*\
  !*** ./src/scripts/js/modules/category.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
class Category {
  constructor(title, description, isDealsCategory = false) {
    this.title = title;
    this.description = description;
    this.isDealsCategory = isDealsCategory;
  }
  getTitleForProduct() {
    return `${this.title}`;
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/product.js":
/*!*******************************************!*\
  !*** ./src/scripts/js/modules/product.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Product: () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _cart_handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cart-handler.js */ "./src/scripts/js/cart-handler.js");


class Product {
  constructor(id, name, picture, price, amount, category) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.price = price;
    this.amount = amount;
    this.category = category;
  }
  renderProduct() {
    return `
    <div class="products__item card" data-product-id="${this.id}" data-aos="zoom-in-up" data-aos-duration="1000">
     <img class="products__item-picture" src="${this.picture}" alt="${this.name}">
      <div class="card-body">
        <h3 class="products__item-title card-title">${this.name}</h3>
        <p>Price: <span class="products__item-price">${this.price}</span>${_cart_handler_js__WEBPACK_IMPORTED_MODULE_0__.currency}</p>
        <p>Category: <span class="products__item-category">${this.category}</span></p>
        <button class="products__add-button btn btn-outline-primary">Add to Cart</button>
      </div>
    </div>`;
  }
  renderCartProduct() {
    return `
    <li class="header__cart-item" data-product-id="${this.id}">
      <img class="header__cart-item__picture" src="${this.picture}" alt="${this.name}">
      <h3 class="header__cart-item__title">${this.name}</h3>
      <div class="header__cart-item__controls">
          <button class="btn btn-minus">-</button>
          <input type="number" class="form-control amount-input" disabled="" value="${this.amount}" name="amountInput">
          <button class="btn btn-add">+</button> 
      </div>
      <span class="header__cart-item__price">${this.price}${_cart_handler_js__WEBPACK_IMPORTED_MODULE_0__.currency}</span>
    </li>`;
  }
}


/***/ }),

/***/ "./src/scripts/js/modules/products-loader.js":
/*!***************************************************!*\
  !*** ./src/scripts/js/modules/products-loader.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductsLoader: () => (/* binding */ ProductsLoader)
/* harmony export */ });
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.js */ "./src/scripts/js/modules/product.js");


class ProductsLoader {
  constructor(
    productsDataPath = "../data/products.json",
    productsCategory,
    showProducts,
    callback
  ) {
    this.productsDataPath = productsDataPath;
    this.productsCategory = productsCategory;
    this.showProducts = showProducts;
    this.callback = callback;
  }
  async loadProducts(amountToShow) {
    try {
      const response = await fetch(this.productsDataPath);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.loadedProducts = await response.json();
      this.displayProducts(amountToShow);
      this.callback();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  displayProducts(amountToShow) {
    let filteredProducts = [];
    if (this.productsCategory.isDealsCategory) {
      filteredProducts = this.loadedProducts;
    } else {
      console.log(this.loadedProducts);
      filteredProducts = this.loadedProducts.filter(
        (product) => product.category === this.productsCategory.title
      );
    }
    filteredProducts = filteredProducts.slice(0, amountToShow);

    const productListHTML = filteredProducts
      .map((product) => {
        const newProduct = new _product_js__WEBPACK_IMPORTED_MODULE_0__.Product(
          product.id,
          product.name,
          product.picture,
          product.price,
          1,
          product.category
        );
        return newProduct.renderProduct();
      })
      .join("");

    this.showProducts(
      productListHTML,
      this.productsCategory,
      this.productsCategory.isDealsCategory
    );
  }
}


/***/ }),

/***/ "./src/scripts/js/scroll-top.js":
/*!**************************************!*\
  !*** ./src/scripts/js/scroll-top.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const scrollTopModule = () => {
  const scrollTop = $(".scroll-top");
  const screenOffset = 100;

  $(document).ready(function () {
    $(window).on("scroll", function () {
      if (window.scrollY >= screenOffset) {
        scrollTop.addClass("active");
      } else {
        if (scrollTop.hasClass("active")) {
          scrollTop.toggleClass("active");
        }
      }
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollTopModule);


/***/ }),

/***/ "./src/scripts/js/site-loader.js":
/*!***************************************!*\
  !*** ./src/scripts/js/site-loader.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const siteLoaderModule = () => {
  $(document).ready(function () {
    $("body").addClass("loaded");
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siteLoaderModule);


/***/ }),

/***/ "./node_modules/jquery.maskedinput/package.json":
/*!******************************************************!*\
  !*** ./node_modules/jquery.maskedinput/package.json ***!
  \******************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"jquery.maskedinput","version":"1.4.1","author":"Josh Bush (digitalbush.com)","description":"jQuery Masked Input Plugin","devDependencies":{"grunt":"0.4.x","grunt-contrib-jasmine":"0.5.x","grunt-contrib-uglify":"0.2.x","grunt-contrib-watch":"0.5.x","grunt-nuget":"^0.1.4"},"scripts":{"test":"grunt test"},"main":"gruntfile.js","repository":{"type":"git","url":"git+https://github.com/excellalabs/jquery.maskedinput.git"},"keywords":["jQuery","Masked","Input","Plugin"],"license":"MIT","bugs":{"url":"https://github.com/excellalabs/jquery.maskedinput/issues"},"homepage":"https://github.com/excellalabs/jquery.maskedinput#readme"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_chat_bot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/chat-bot */ "./src/scripts/js/chat-bot.js");
/* harmony import */ var _js_cart_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/cart-handler.js */ "./src/scripts/js/cart-handler.js");
/* harmony import */ var _js_header_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/header.js */ "./src/scripts/js/header.js");
/* harmony import */ var _js_images_loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/images-loader.js */ "./src/scripts/js/images-loader.js");
/* harmony import */ var _js_scroll_top_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scroll-top.js */ "./src/scripts/js/scroll-top.js");
/* harmony import */ var _js_site_loader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/site-loader.js */ "./src/scripts/js/site-loader.js");
/* harmony import */ var _js_authentication_handler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/authentication-handler.js */ "./src/scripts/js/authentication-handler.js");
/* harmony import */ var _js_contact_form_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/contact-form.js */ "./src/scripts/js/contact-form.js");
/* harmony import */ var _js_contact_form_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_contact_form_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var jquery_maskedinput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery.maskedinput */ "./node_modules/jquery.maskedinput/gruntfile.js");
/* harmony import */ var jquery_maskedinput__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery_maskedinput__WEBPACK_IMPORTED_MODULE_8__);










AOS.init();

(0,_js_site_loader_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_js_chat_bot__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_js_header_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_js_images_loader_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_js_scroll_top_js__WEBPACK_IMPORTED_MODULE_4__["default"])();

_js_contact_form_js__WEBPACK_IMPORTED_MODULE_7___default()();

(0,_js_authentication_handler_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
(0,_js_cart_handler_js__WEBPACK_IMPORTED_MODULE_1__.cardHandler)();


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map