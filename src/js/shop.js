import products from "./products.json";
import productImageFile from "../Images/Startseite/smallCoffeeType.png";
import { categoryIcons } from "./icons";

///////////////////////////////
// ITEM COUNT IN SHOPPING CART
const shoppingCartCount = document.querySelectorAll(".shoppingCartCount");
let shoppingCartCountNumber = parseInt(
  document.querySelector(".shoppingCartCount").textContent
);

const shop = () => {
  createProductElements();
};

function createProductElements() {
  const productSection = document.querySelector(".section_Products");
  const productContainer = document.createElement("div");

  const productsHtml = products
    .map((product) => {
      // const productElement = document.createElement("div");
      // productElement.classList.add("product");
      // const productImage = document.createElement("img");
      // productImage.classList.add("product-img");
      // productImage.setAttribute("src", productImageFile);
      // const productTitle = document.createElement("div");
      // productTitle.classList.add("product-title");
      // const productTitleText = document.createTextNode(product.productName);
      // productTitle.appendChild(productTitleText);
      // const productPrice = document.createElement("div");
      // productPrice.classList.add("product-price");
      // const productPriceText = document.createTextNode(product.price);
      // productPrice.appendChild(productPriceText);
      // productElement.appendChild(productImage);
      // productElement.appendChild(productTitle);
      // productElement.appendChild(productPrice);
      // productContainer.appendChild(productElement);

      const { categories } = product;

      return `
    <div class="product ${product.id}">
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
              <img src='${categoryIcons[category]}'>
            </div>`
     )
     .join("")}
 </div>

 <select
    name="select"
    class="selectProductSize selectProductSize${product.id}"
  >
    <option value="small">500g</option>
    <option value="medium">1kg</option>
    <option value="large">5kg</option>
  </select>
 
      
 <button class="button addToShoppingCart">quick add+</button>

    </div>
    `;
    })
    .join("");

  // <div class="selectProductSize">
  //   <span class="small">500g</span>
  //   <span class="medium">1kg</span>
  //   <span class="large">5kg</span>
  // </div>;

  // console.log(productsHtml);

  productContainer.innerHTML = productsHtml;

  productSection.appendChild(productContainer);

  //////////////////////////////////
  // BUTTONS ADDING TO LOCAL STORAGE

  const addToShoppingCartButton =
    document.querySelectorAll(".addToShoppingCart");

  addToShoppingCartButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.currentTarget.parentElement.classList[1];

      const product = products[id];

      const selectProductSize = document.querySelector(
        `.selectProductSize${id}`
      );

      if (selectProductSize.value === "small") {
        product.price = product.variants[0].price;
        product.size = "500g";
        addToLocalStorage(product, "small");
      } else if (selectProductSize.value === "medium") {
        product.price = product.variants[1].price;
        product.size = "1kg";
        addToLocalStorage(product, "medium");
      } else if (selectProductSize.value === "large") {
        product.price = product.variants[2].price;
        product.size = "5kg";
        addToLocalStorage(product, "large");
      }
    });
  });
  function addToLocalStorage(product, size) {
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
export default shop;
