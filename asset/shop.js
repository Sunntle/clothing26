var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderCountCart } from "./addtocart.js";
import addtocart from "./addtocart.js";
import fetchCategories from "./loadCategories.js";
import responsiveNav from "./responsiveNav.js";
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `http://localhost:3000/products`;
        const urlCategories = `http://localhost:3000/categories`;
        responsiveNav();
        let filterOption = "_sort=price&_order=asc";
        yield fetchCategories(urlCategories);
        yield fetchData(url + "?" + filterOption);
        const button = document.querySelector(".nice-select");
        const list = document.querySelector(".list");
        let valueFilter = 1;
        button.addEventListener("click", (e) => {
            const event = e.target;
            list.classList.toggle("show");
            if (event.tagName != "BUTTON" && event.tagName != "SPAN") {
                const list = document.querySelector(".current");
                if (event.value != undefined) {
                    valueFilter = +event.value;
                    if (event.value == "2") {
                        list.textContent = `High To Low`;
                        filterOption = "_sort=price&_order=desc";
                    }
                    else {
                        filterOption = "_sort=price&_order=asc";
                        list.textContent = `Low To High`;
                    }
                }
                console.log(url + (url.includes("?") ? "&" : "?") + filterOption);
                fetchData(url + (url.includes("?") ? "&" : "?") + filterOption);
            }
        });
        const filterByCate = document.querySelectorAll(".categories");
        filterByCate.forEach((el) => {
            el.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const number = el.getAttribute("data-idLoai");
                url = `http://localhost:3000/products?idLoai=${number}`;
                yield fetchData(url);
            }));
        });
    });
}
loadData();
function fetchData(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(path);
            const products = yield res.json();
            let html = "";
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
                document.querySelector("#shop__product__item").innerHTML = html;
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
