import { renderCountCart } from "./addtocart.js";
import addtocart from "./addtocart.js";
import { ProductType2 } from "./index";
import fetchCategories from "./loadCategories.js";
import responsiveNav from "./responsiveNav.js";

async function loadData() {
  let url = `http://localhost:3000/products`;
  const urlCategories = `http://localhost:3000/categories`;
  responsiveNav();
  let filterOption: string = "_sort=price&_order=asc";
  await fetchCategories(urlCategories);
  await fetchData(url + "?" + filterOption);
  const button = document.querySelector(".nice-select") as HTMLElement;
  const list = document.querySelector(".list") as HTMLElement;
  let valueFilter: number = 1;
  button.addEventListener("click", (e) => {
    const event = e.target as HTMLInputElement;
    list.classList.toggle("show");
    if (event.tagName != "BUTTON" && event.tagName != "SPAN") {
      const list = document.querySelector(".current") as HTMLElement;
      if (event.value != undefined) {
        valueFilter = +event.value;
        if (event.value == "2") {
          list.textContent = `High To Low`;
          filterOption = "_sort=price&_order=desc";
        } else {
          filterOption = "_sort=price&_order=asc";
          list.textContent = `Low To High`;
        }
      }
      console.log(url + (url.includes("?") ? "&" : "?") + filterOption);

      fetchData(url + (url.includes("?") ? "&" : "?") + filterOption);
    }
  });
  const filterByCate: NodeListOf<HTMLElement> =
    document.querySelectorAll(".categories");
  filterByCate.forEach((el) => {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      const number = el.getAttribute("data-idLoai");
      url = `http://localhost:3000/products?idLoai=${number}`;
      await fetchData(url);
    });
  });
}
loadData();
async function fetchData(path: string) {
  try {
    const res = await fetch(path);
    const products: ProductType2[] = await res.json();
    let html: string = "";
    for (const [index, value] of products.entries()) {
      html += `<div class="col-lg-4 col-md-6 col-6 pb-1">
                        <div class="product-item mb-4" data-idItem=${value.id}>
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" src="asset/img/${value.img[0]}" alt="">
                                <div class="product-action position-absolute d-flex align-items-center justify-content-center">
                                    <a class="btn btn-outline-dark btn-square btn-cart" href="#"><i class="fa fa-shopping-cart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="fs-6 text-uppercase text-decoration-none product-name" href="detail.html?${value.id}">${value.name}</a>
                                <div class="d-flex align-items-center justify-content-center mt-2">
                                    <h5>${value.price}</h5><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                                </div>
                                <div class="d-flex align-items-center justify-content-center mb-1">
                                    <small class="fa fa-star text-warning mr-1"></small>
                                    <small class="fa fa-star text-warning mr-1"></small>
                                    <small class="fa fa-star text-warning mr-1"></small>
                                    <small class="far fa-star text-warning mr-1"></small>
                                    <small class="far fa-star text-warning mr-1"></small>
                                    <small>(99)</small>
                                </div>
                            </div>
                        </div>
                    </div>`;
      (
        document.querySelector("#shop__product__item") as HTMLElement
      ).innerHTML = html;
    }
    document.querySelectorAll(".btn-cart").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const click = ((e.target as HTMLElement) || null)?.closest(
          ".product-item"
        );
        const idItem = click?.getAttribute("data-idItem");
        if (idItem) {
          const item = products.find((el: ProductType2) => el.id === +idItem)!;
          const { id, name, img, colors, price } = item;
          addtocart(id, name, img[0], colors[0], price);
        }
      })
    );
    let cart = JSON.parse(localStorage.getItem("cart") || "");
    renderCountCart(cart);
  } catch (error) {
    // Handle fetch or JSON parsing errors
    console.error(error);
  }
}
