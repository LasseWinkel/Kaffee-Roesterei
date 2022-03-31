import shop from "./shop";
import product from "./product";
import Slider from "./slider";
import contactForm from "./contactForm";
import smallproductImageFile from "/Images/Startseite/smallCoffeeType.png";

document.addEventListener("DOMContentLoaded", function (event) {
  const currentPath = window.location.pathname;

  navigation();
  shoppingCartCountFunction();

  if (currentPath === "/Shop/index.html") {
    shop();
  } else if (currentPath === "/product/index.html") {
    product();
  } else if (currentPath === "/Startseite/index.html") {
    new Slider({ transitionTime: 3000 });
  } else if (currentPath === "/Kontakt/index.html") {
    contactForm();
  }
});

const baseNav = document.querySelector(".nav");

if (baseNav.id === "black") {
} else {
  window.onscroll = function () {
    //Beim Scrollen wird die ursprüngliche Navigationsleiste durch die schwarze ersetzt
    if (document.documentElement.scrollTop > 0) {
      baseNav.classList.add("blackNav");
    } else {
      baseNav.classList.remove("blackNav");
    }
  };
}

function navigation() {
  const burgerMenu = document.querySelector(".burgerMenu");
  const startLogo = document.querySelector(".logo");
  const shoppingBag = document.querySelector(".shoppingBag");
  const mobileMenu = document.querySelector(".mobileMenu");
  console.log("nav");
  burgerMenu.addEventListener("click", function () {
    console.log("menu");
    mobileMenu.classList.add("showMobileMenu"); //...öffne das mobileMenu
    document.body.classList.add("fixBody"); //...und unterbinde das Scrollen.
  });
  startLogo.addEventListener("click", function () {
    location.href = "/Startseite/index.html"; //springe zur Startseite.
  });
  shoppingBag.addEventListener("click", function () {
    // createOverlay();
  });

  let closeMobileMenu = document.querySelector(".closeMobileMenu"); //Bei Klicken
  closeMobileMenu.addEventListener("click", function () {
    //...des Schließen-Buttons
    mobileMenu.classList.remove("showMobileMenu"); //...schließe das mobileMenu
    document.body.classList.remove("fixBody"); //...und erlaube das Scrollen wieder.
  });
}

///////////////////////////////
// ITEM COUNT IN SHOPPING CART

const shoppingCartCount = document.querySelectorAll(".shoppingCartCount");
console.log(shoppingCartCount);
let shoppingCartCountNumber = parseInt(
  document.querySelector(".shoppingCartCount").textContent
);

function shoppingCartCountFunction() {
  if (window.localStorage.key(0) === null) {
    shoppingCartCountNumber = 0;
  }
  for (let i = 0; window.localStorage.key(i) !== null; i++) {
    shoppingCartCountNumber = i + 1;
    // console.log(shoppingCartCountNumber);
  }
  shoppingCartCount.forEach((counter) => {
    counter.textContent = shoppingCartCountNumber;
  });
  // console.log(shoppingCartCountNumber);
  return shoppingCartCountNumber;
}

//////////////
// BUTTONS TO THE SHOP

const shopButtons = document.querySelectorAll(".shopButton");

shopButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.href = "/Shop/index.html";
  });
});

////////////////////////////////
// OVERLAY

const navigateToShoppingCart = document.querySelectorAll(
  ".navigateToShoppingCart"
);

navigateToShoppingCart.forEach((navigator) => {
  navigator.addEventListener("click", createOverlay);
});

function createOverlay() {
  console.log(shoppingCartCountNumber);
  shoppingCartCountFunction();
  console.log(shoppingCartCountNumber);
  let overlay = `
  <div class="overlay">
  <div class="overlayContent">

<nav id="black" class="nav blackNav">
  <button class="logo"></button>
  <div class="hidden">
    <a class="link-dasCafe {{cafe}}" href="/dasCafe/index.html">das Café</a>
    <a
      class="link-herkunft {{herkunft}}"
      href="/dieHerkunft/index.html"
    >Herkunft</a>
    <a class="link-shop {{shop}}" href="/Shop/index.html">Shop</a>
    <button class="shoppingBag">
     <span class="shoppingCartCount">${shoppingCartCountNumber}</span>
    </button>
  </div>
  <button class="burgerMenu"><span class="shoppingCartCount">${shoppingCartCountNumber}</span></button>
</nav>



<div id="mobileMenu" class="mobileMenu">
  <button class="closeMobileMenu"></button>
  <h3><a class="link-DasCafe" href="/dasCafe/index.html">das Café</a></h3>
  <h3><a class="link-Herkunft" href="/dieHerkunft/index.html">Herkunft</a></h3>
  <h3> <a class="link-Shop" href="/Shop/index.html">Shop</a>
  <span class="shoppingCartCount">${shoppingCartCountNumber}</span>
  </h3>
</div>





  <div class="overlayHeader">
  <h2>Warenkorb</h2>
  <a class="closeOverlay">Warenkorb schließen</a>
  </div>
  <div class="overlayAllProductsContainer"></div>
  <div class="displayedSum"></div>


<footer class="footer"><img src="/Images/Startseite/Logo_white.svg" alt="Coffee Bean" />
<div class="content">
  <div>
    <h3 class="title">Rustica</h3>
    <p class="subtitle">Café & Rösterei</p>
  </div>
  <div class="textrow1">
    <p>
      Komm uns besuchen!
      <br />
      Fraunhoferstr. 13, Kiel
    </p>
    <p>
      Mo – Fr 8–18 Uhr
      <br />
      Sa 11–18 Uhr
    </p>
  </div>
  <div class="textrow2">
    <p>
      <a href="/Impressum/index.html">Impressum</a>
      <br />
      <a href="/Kontakt/index.html">Datenschutz</a>
    </p>
    <p>
      <a href="/dasCafe/index.html">Café</a>
      <br />
      <a href="/Shop/index.html">Shop</a>
      <br />
      <a href="/dieHerkunft/index.html">Herkunft</a>
    </p>
  </div>
</div>
</footer>


  </div>
  </div>`;

  document.body.innerHTML += overlay;

  overlay = document.querySelector(".overlay");
  const closeOverlay = document.querySelector(".closeOverlay");
  const overlayAllProductsContainer = document.querySelector(
    ".overlayAllProductsContainer"
  );
  const displayedSum = document.querySelector(".displayedSum");
  const shippingCost = 390;

  overlayAllProductsContainer.innerHTML = "";
  let i = 0;
  let sum = 0;
  overlay.classList.add("overlayShown");
  document.body.classList.add("fixBody");

  closeOverlay.addEventListener("click", () => {
    overlay.classList.remove("overlayShown");
    document.body.classList.remove("fixBody");
  });

  if (localStorage.key(i) === null) {
    displayedSum.innerHTML = `<h2>Bestellübersicht</h2>
      <div class="sum">Zwischensumme: ${sum}ct</div>
      <hr class="line">
      <div class="overallSum">Gesamtbretag: ${sum}ct</div>`;
  }
  while (localStorage.key(i) !== null) {
    const key = localStorage.key(i);
    const productfromLocalStorage = JSON.parse(localStorage.getItem(`${key}`));
    console.log("Product from Local Storage", productfromLocalStorage);

    const overlayProductContainer = document.createElement("div");
    const overlayProductContent = `
        <div class="product ${key}">
      <img class="product-img" src="${smallproductImageFile}">
      <div class="flex-container">
      <a class="product-title" href="/product/index.html?id=${
        productfromLocalStorage.id
      }">${productfromLocalStorage.productName}</a>
      <div class="product-size">${productfromLocalStorage.size}</div>
      <div class="product-price">${
        Math.floor(productfromLocalStorage.price / 100) +
        "," +
        (productfromLocalStorage.price % 100)
      }€</div>
      <div class="removeShoppingCartItem">
      </div>
      </div>
      </div>`;
    overlayProductContainer.innerHTML = overlayProductContent;
    overlayProductContainer.classList.add("overlayProductContainer");
    overlayAllProductsContainer.appendChild(overlayProductContainer);
    sum += productfromLocalStorage.price;
    let overallSum =
      Math.floor((sum + shippingCost) / 100) +
      "," +
      ((sum + shippingCost) % 100);
    displayedSum.innerHTML = `<h2>Bestellübersicht</h2>
      <div class="sum">Zwischensumme: ${
        Math.floor(sum / 100) + "," + (sum % 100)
      }€</div>
      <div class="shippingCost">Versandkosten: ${
        Math.floor(shippingCost / 100) + "," + (shippingCost % 100)
      }€</div>
      <hr class="line">
      <div class="overallSum">Gesamtbretag: ${overallSum}€</div>
      <button class="button buttonPay">bezahlen</button>`;
    i += 1;
  }

  document.querySelectorAll(".removeShoppingCartItem").forEach((removeIcon) => {
    removeIcon.addEventListener("click", (e) => {
      let item = e.currentTarget.parentElement.parentElement;
      console.log(
        "This item has been removed from Local Storage: ",
        item.classList[1]
      );
      localStorage.removeItem(item.classList[1]);
      overlayAllProductsContainer.removeChild(item.parentElement);
      document.querySelectorAll(".shoppingCartCount").forEach((counter) => {
        counter.innerHTML -= 1;
        // shoppingCartCountNumber - 1;
      });
      createOverlay();
    });
  });
}
