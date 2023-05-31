var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import addtocart, { renderCountCart } from "./addtocart.js";
import responsiveNav from "./responsiveNav.js";
const urlBanners = "http://localhost:3000/banners";
const urlProducts = "http://localhost:3000/products";
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const banners = yield (yield fetch(urlBanners)).json();
        const products = yield (yield fetch(urlProducts)).json();
        document
            .querySelectorAll(".spinner-border")
            .forEach((el) => {
            var _a;
            return (_a = el === null || el === void 0 ? void 0 : el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(document.querySelector(".spinner-border"));
        });
        const loadIndicators = [];
        const loadBanners = [];
        Array.from(banners, (banner, index) => {
            if (index == 0) {
                loadIndicators.push(`<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index + 1}"></button>`);
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
            }
            else {
                loadIndicators.push(`<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>`);
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
        document.querySelector("#slide").innerHTML =
            loadBanners.join("");
        document.querySelector("#indicators").innerHTML =
            loadIndicators.join("");
        const totalSold = Array.from(products, (item) => {
            if (item.size) {
                item.totalSold = countProductsSold(item.size);
            }
            else {
                item.totalSold = item.sold;
            }
            return item;
        });
        products.sort((a, b) => {
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
        document.querySelector("#bestsellers").innerHTML =
            loadItemFeatured.join("");
        products.sort((a, b) => {
            const date1 = new Date(a.date);
            const date2 = new Date(b.date);
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
                document.querySelector("#newarrivals").insertAdjacentHTML("beforeend", html);
            }
        }
        document.querySelectorAll(".btn-cart").forEach((el) => el.addEventListener("click", (e) => {
            var _a;
            e.preventDefault();
            const click = (_a = (e.target || null)) === null || _a === void 0 ? void 0 : _a.closest(".product-item");
            const idItem = click === null || click === void 0 ? void 0 : click.getAttribute("data-idItem");
            if (idItem) {
                const item = products.find((el) => el.id === +idItem);
                const { id, name, img, colors, price } = item;
                addtocart(id, name, img[0], colors[0], price);
            }
        }));
        let cart = JSON.parse(localStorage.getItem("cart") || "");
        renderCountCart(cart);
        responsiveNav();
    });
}
function countProductsSold(product) {
    let totalSold = 0;
    for (const quantitySold of Object.entries(product)) {
        totalSold += quantitySold[1].sold;
    }
    return totalSold;
}
loadData();
