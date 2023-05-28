import addtocart from "./addtocart.js";
import { renderCountCart } from "./addtocart.js";
import { ProductType2 } from "./index";
import responsiveNav from "./responsiveNav.js";
const link = window.location.search;
const urlProduct = link.slice(1);
const url = `http://localhost:3000/products/${urlProduct}`;
fetch(url)
  .then((response) => response.json())
  .then((product: ProductType2) => {
    responsiveNav();
    if (product !== null) {
      let imgItem: string[] = [],
        sizeItem: string[] = [],
        colorItem: string[] = [];
      for (let [index, img] of product.img.entries()) {
        if (index === 0)
          imgItem.push(`<div class="carousel-item active" data-bs-interval="5000">
                <img class="d-block w-100" src="asset/img/${img}" alt="Image">
                </div>`);
        else
          imgItem.push(`<div class="carousel-item">
                <img class="d-block w-100" src="asset/img/${img}" alt="Image">
                </div>`);
      }
      (document.querySelector("#img-product") as HTMLElement).innerHTML =
        imgItem.join("");
      //name
      const productName = document.createElement("h3");
      productName.classList.add("product-name");
      productName.textContent = `${product.name}`;
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        productName
      );
      //rate
      const rateStar = document.createElement("div");
      rateStar.classList.add("d-flex", "mb-3");
      rateStar.innerHTML = `<div class="rate mr-2">
            <small class="fas fa-star"></small>
            <small class="fas fa-star"></small>
            <small class="fas fa-star"></small>
            <small class="fas fa-star-half-alt"></small>
            <small class="far fa-star"></small>
            </div>
            <small class="pt-1">(99 Reviews)</small>`;
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        rateStar
      );
      //price
      const productPrice = document.createElement("h3");
      productPrice.classList.add("font-weight-semi-bold", "mb-4");
      productPrice.textContent = `${product.price}`;
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        productPrice
      );
      //amount
      const productAvailable = document.createElement("h6");
      productAvailable.classList.add("mb-4", "text-muted");
      let totalSold = 0;
      if (product.size) {
        for (const quantitySold of Object.entries(product.size)) {
          totalSold += quantitySold[1].amount;
        }
      } else {
        totalSold = product.amount;
      }
      productAvailable.innerHTML = `<span class="productAvailable text-dark">${totalSold}</span> sản phẩm có sẵn`;
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        productAvailable
      );
      // description
      const productDescription = document.createElement("p");
      productDescription.classList.add("mb-4");
      productDescription.textContent =
        "Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no seaNonumy";
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        productDescription
      );
      //size
      if (product.size) {
        const divSize = document.createElement("div");
        divSize.classList.add("d-flex", "mb-3");
        const strongSize = document.createElement("strong");
        strongSize.textContent = `Sizes:`;
        strongSize.classList.add("text-dark", "mr-3");
        const formSize = document.createElement("form");
        formSize.id = "formSize";
        (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
          divSize
        );
        divSize.appendChild(strongSize);
        divSize.appendChild(formSize);
        const sizes = Object.keys(product.size);
        for (const size of sizes) {
          sizeItem.push(`<div class="custom-control custom-radio d-inline-flex ms-2">
                                <input type="radio" class="custom-control-input" id="size-${size}" name="size" value="${size}">
                                <label class="mx-2" for="size-${size}">${size}</label>
                                </div>`);
        }
      }
      //color
      const divColor = document.createElement("div");
      divColor.classList.add("d-flex", "mb-4");
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        divColor
      );
      const strongColor = document.createElement("strong");
      strongColor.textContent = `Colors:`;
      strongColor.classList.add("text-dark", "mr-3");
      divColor.appendChild(strongColor);
      const formColor = document.createElement("form");
      formColor.id = "formColor";
      divColor.appendChild(formColor);
      for (const color of product.colors) {
        colorItem.push(`<div class="custom-control custom-radio d-inline-flex ms-2">
                        <input type="radio" class="custom-control-input" id="color-${color}" name="color" value="${color}">
                        <label class="mx-2" for="color-${color}">${color}</label>
                    </div>`);
      }
      //quantity
      const divCount = document.createElement("div");
      divCount.classList.add("d-flex", "align-items-center", "mb-4", "pt-2");
      const quantity = document.createElement("div");
      quantity.classList.add("input-group", "quantity", "mr-3");
      quantity.style.width = "130px";
      quantity.innerHTML = `<div class="input-group-btn">
                                    <button class="btn btn-sm text-muted btn-minus" >
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control form-control-sm mx-1  border-0 text-center" value="1">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm text-muted btn-plus">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>`;
      //add to cart btn
      const buttonAdd = document.createElement("button");
      buttonAdd.id = "shopping-cart";
      buttonAdd.classList.add("btn", "px-3", "text-light");
      buttonAdd.style.backgroundColor = `var(--primary-color)`;
      buttonAdd.innerHTML = `<i class="fa fa-shopping-cart mr-1"></i> Add To Cart`;
      divCount.appendChild(quantity);
      divCount.appendChild(buttonAdd);
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        divCount
      );
      const divShare = document.createElement("div");
      divShare.classList.add("d-flex", "pt-2");
      divShare.innerHTML = `<strong class="text-dark mr-2">Share on:</strong>
            <div class="d-inline-flex ms-2">
                <a class="text-dark px-2" href="">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="text-dark px-2" href="">
                    <i class="fab fa-twitter"></i>
                </a>
                <a class="text-dark px-2" href="">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a class="text-dark px-2" href="">
                    <i class="fab fa-pinterest"></i>
                </a>
            </div>`;
      (document.querySelector("#detailsProduct") as HTMLElement).appendChild(
        divShare
      );

      if (document.querySelector("#formSize"))
        (document.querySelector("#formSize") as HTMLElement).innerHTML =
          sizeItem.join("");
      (document.querySelector("#formColor") as HTMLElement).innerHTML =
        colorItem.join("");
      //in ra so luong san pham theo size
      const amoutProduct = document.querySelector(
        ".productAvailable"
      ) as HTMLElement;
      if (product.size) {
        const sizes = Object.keys(product.size);
        for (const size of sizes) {
          const sizeNew = document.querySelector(
            `#size-${size}`
          ) as HTMLInputElement;
          sizeNew.onclick = function (e) {
            if ((e.target as HTMLInputElement)?.checked) {
              const sizeObj = product.size;
              if (sizeObj) {
                const entries = Object.entries(sizeObj);
                for (const [key, value] of entries) {
                  if (key === size) {
                    const amount = value.amount ?? 0;
                    amoutProduct.textContent =
                      amount === 0 ? "Hết hàng" : `${amount}`;
                  }
                }
              }
            }
          };
        }
      }
      //quantity btn
      document.querySelectorAll(".quantity button").forEach((el) =>
        el.addEventListener("click", function (e) {
          const event = (e.target as HTMLElement) || null;
          const button =
            event.tagName === "BUTTON" ? event : event.parentElement;
          if (button) {
            let oldValue =
              button?.parentElement?.parentElement?.querySelector("input");
            let newVal = 0;
            if (oldValue) {
              if (button?.classList.contains("btn-plus")) {
                newVal = +oldValue.value + 1;
              } else {
                if (+oldValue.value > 1) {
                  newVal = +oldValue.value - 1;
                } else {
                  newVal = 1;
                }
              }
              oldValue.value = newVal.toString();
            }
          }
        })
      );

      const colorClicked: NodeListOf<Element> =
        document.getElementsByName("color");
      let colorItemClicked: string,
        sizeItemClicked: string = "";
      colorClicked.forEach((color) => {
        color.addEventListener("input", function (e) {
          colorItemClicked = (e.target as HTMLInputElement).value;
        });
      });
      if (product.size) {
        const sizeClicked: NodeListOf<HTMLElement> =
          document.getElementsByName("size");
        sizeClicked.forEach((size) => {
          size.addEventListener("input", function (e) {
            sizeItemClicked = (e.target as HTMLInputElement).value;
          });
        });
        if (!sizeItemClicked)
          sizeItemClicked = (sizeClicked[0] as HTMLInputElement).value;
      }
      //addtocart
      const btnAddToCart = document.querySelector(
        "#shopping-cart"
      ) as HTMLElement;
      btnAddToCart.addEventListener("click", (e) => {
        const { id, name, img, price } = product;
        const quantityItem = (
          document.querySelector(".quantity input") as HTMLInputElement
        ).value;
        if (!colorItemClicked) colorItemClicked = "Black";
        if (!sizeItemClicked) sizeItemClicked = "M";
        addtocart(
          id,
          name,
          img[0],
          colorItemClicked,
          price,
          +quantityItem,
          sizeItemClicked
        );
        // console.log(id, name, img[0], colorItemClicked, price, +quantityItem, sizeItemClicked);
      });
      let cart = JSON.parse(localStorage.getItem("cart") || "");
      renderCountCart(cart);
    } else {
      const content = document.querySelector(".wrap") as HTMLElement;
      (document.querySelector("body") as HTMLElement).removeChild(content);
      const error = document.createElement("h2");
      error.textContent = "Không tìm thấy trang";
      error.classList.add("text-center", "mt-5", "py-5");
      (document.querySelector(".error") as HTMLElement).prepend(error);
    }
  });
