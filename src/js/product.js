import products from "./products.json";
import productImageFile from "../Images/Startseite/largeCoffeeType.png";
import { categoryIcons } from "./icons";

///////////////////////////////
// ITEM COUNT IN SHOPPING CART
const shoppingCartCount = document.querySelectorAll(".shoppingCartCount");
let shoppingCartCountNumber = parseInt(
  document.querySelector(".shoppingCartCount").textContent
);

const product = () => {
  createProductElement();
};

function createProductElement() {
  const productSection = document.querySelector(".product-section");
  const productContainer = document.createElement("div");

  const urlParams = new URLSearchParams(window.location.search);
  // console.log("urlParams", new URLSearchParams(window.location.search));
  const id = Number(urlParams.get("id"));
  // console.log("current id", id);

  const product = products.filter((currentProduct) => {
    // console.log(currentProduct.id, id);
    return currentProduct.id === id;
  })[0];
  // console.log("product", product);

  const { categories } = product;

  const productsHtml = `
    <div class="product">
    <img class="product-img" src="${productImageFile}">
    <a class="product-title" href="/product/index.html?id=${product.id}">${
    product.productName
  }</a>
    <div class="product-price">${
      Math.floor(product.variants[0].price / 100) +
      "," +
      (product.variants[0].price % 100)
    }€ - ${
    Math.floor(product.variants[2].price / 100) +
    "," +
    (product.variants[2].price % 100)
  }€</div>


     <div class="product-categories">
   ${categories
     .map(
       (category) => `
            <div>
              <img src="${categoryIcons[category]}">
            </div>`
     )
     .join("")}
 </div>
   
    </div>
    `;

  productContainer.innerHTML = productsHtml;

  productSection.appendChild(productContainer);

  const description = document.querySelector(".description");

  description.innerHTML += `${product.description}`;

  const addToShoppingCartButton = document.querySelector(".addToShoppingCart");
  const selectProductSize = document.querySelector(".selectProductSize");

  addToShoppingCartButton.addEventListener("click", () => {
    if (selectProductSize.value === "small") {
      product.price = product.variants[0].price;
      product.size = "500g";
      addToLocalStorage("small");
    } else if (selectProductSize.value === "medium") {
      product.price = product.variants[1].price;
      product.size = "1kg";
      addToLocalStorage("medium");
    } else if (selectProductSize.value === "large") {
      product.price = product.variants[2].price;
      product.size = "5kg";
      addToLocalStorage("large");
    }
  });
  function addToLocalStorage(size) {
    console.log(
      `${
        product.productName + "," + size
      }-Kaffee wurde dem Warenkorb hinzugefügt: `,
      product
    );
    window.localStorage.setItem(
      `${product.productName + "," + size}`,
      JSON.stringify(product)
    );
    for (let i = 0; window.localStorage.key(i) !== null; i++) {
      shoppingCartCountNumber = i + 1;
      console.log(shoppingCartCountNumber);
    }
    shoppingCartCount.forEach((counter) => {
      counter.textContent = shoppingCartCountNumber;
      counter.classList.remove("animationDoubleSize");
      counter.classList.add("animationDoubleSize");
    });
  }
}

export default product;
