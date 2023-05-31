import addtocart, { renderCountCart } from "./addtocart.js";
import { sizeType } from "./item";
import responsiveNav from "./responsiveNav.js";
interface BannerType {
  id: number;
  img: string;
  headerContent: string;
  mainContent: string;
  content: string;
}
interface ProductType {
  id: number;
  idLoai: number;
  name: string;
  img: string[];
  price: number;
  size?: sizeType;
  colors: string[];
  date: string;
}
interface ProductType2 extends ProductType {
  amount: number;
  sold: number;
  totalSold: number;
}
const urlBanners = "http://localhost:3000/banners";
const urlProducts = "http://localhost:3000/products";
async function loadData() {
  const banners = await (await fetch(urlBanners)).json();
  const products = await (await fetch(urlProducts)).json();
  document
    .querySelectorAll(".spinner-border")
    .forEach((el) =>
      el?.parentNode?.removeChild(
        document.querySelector(".spinner-border") as HTMLElement
      )
    );
  const loadIndicators: string[] = [];
  const loadBanners: string[] = [];
  Array.from(banners, (banner: BannerType, index) => {
    if (index == 0) {
      loadIndicators.push(
        `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${
          index + 1
        }"></button>`
      );
      loadBanners.push(`<div class="carousel-item active" data-bs-interval="5000">
                    <img src="asset/img/${banner.img}"  class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <div class="slide__text">
                            <h6>${banner.headerContent}</h6>
                            <h2>${banner.mainContent}</h2>
                            <p>${banner.content}</p>
                            <a href="shop.html" class="btn btn-dark py-2 px-3">SHOP NOW <span class="arrow_right"><i class="fa-solid fa-arrow-right"></i></span></a>
                        </div>
                    </div>
                  </div>`);
    } else {
      loadIndicators.push(
        `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" aria-label="Slide ${
          index + 1
        }"></button>`
      );
      loadBanners.push(`<div class="carousel-item" data-bs-interval="5000">
                    <img src="asset/img/${banner.img}"  class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <div class="slide__text">
                            <h6>${banner.headerContent}</h6>
                            <h2>${banner.mainContent}</h2>
                            <p>${banner.content}</p>
                            <a href="#" class="btn btn-dark py-2 px-3">SHOP NOW <span class="arrow_right"><i class="fa-solid fa-arrow-right"></i></span></a>
                        </div>
                    </div>
                  </div>`);
    }
  });
  (document.querySelector("#slide") as HTMLElement).innerHTML =
    loadBanners.join("");
  (document.querySelector("#indicators") as HTMLElement).innerHTML =
    loadIndicators.join("");
  //loadBestSellerProducts
  const totalSold = Array.from(products, (item: ProductType2) => {
    if (item.size) {
      item.totalSold = countProductsSold(item.size);
    } else {
      item.totalSold = item.sold;
    }
    return item;
  });
  products.sort((a: ProductType2, b: ProductType2) => {
    return b.totalSold - a.totalSold;
  });
  let loadItemFeatured = [];
  for (const [index, value] of products.entries()) {
    if (index < 8) {
      loadItemFeatured.push(`<div class="col-lg-3 col-md-4 col-6 pb-1">
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
                              </div>`);
    }
  }
  (document.querySelector("#bestsellers") as HTMLElement).innerHTML =
    loadItemFeatured.join("");
  products.sort((a: ProductType2, b: ProductType2) => {
    const date1: Date = new Date(a.date);
    const date2: Date = new Date(b.date);
    return +date2 - +date1;
  });
  let html = "";
  for (const [index, value] of products.entries()) {
    if (index < 8) {
      html = `<div class="col-lg-3 col-md-4 col-6 pb-1">
                    <div class="product-item mb-4" data-idItem=${value.id}>
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="asset/img/${value.img[0]}" alt="">
                            <div class="product-action position-absolute d-flex align-items-center justify-content-center">
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
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
        document.querySelector("#newarrivals") as HTMLElement
      ).insertAdjacentHTML("beforeend", html);
    }
  }
  document.querySelectorAll(".btn-cart").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const click = ((e.target as HTMLElement) || null)?.closest(
        ".product-item"
      );
      const idItem = click?.getAttribute("data-idItem");
      if (idItem) {
        const item = products.find((el: ProductType2) => el.id === +idItem);
        const { id, name, img, colors, price } = item;
        addtocart(id, name, img[0], colors[0], price);
      }
    })
  );
  let cart = JSON.parse(localStorage.getItem("cart") || "");
  renderCountCart(cart);
  responsiveNav();
}
function countProductsSold(product: Object): number {
  let totalSold = 0;
  for (const quantitySold of Object.entries(product)) {
    totalSold += quantitySold[1].sold;
  }
  return totalSold;
}
loadData();
export { ProductType, ProductType2 };
