var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "http://localhost:3000/products";
const urlLoai = "http://localhost:3000/categories";
function loadProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield (yield fetch(url)).json();
        const categories = yield (yield fetch(urlLoai)).json();
        const content = document.querySelector("tbody");
        let html = "";
        products.forEach((el) => {
            var _a;
            html = `<tr>
        <td class="align-middle text-center">${el.name}</td>
        <td class="align-middle text-center">${el.price}</td>
        <td class="text-center"><img class="img-fluid bg-transparent"  style="max-width: 100px" src="../asset/img/${el.img[0]}"></td>
        <td class="align-middle text-center">${(_a = categories.find((element) => element.id === el.idLoai)) === null || _a === void 0 ? void 0 : _a.name}</td>
        <td class="align-middle text-center">${el.date}</td>
        <td class="align-middle text-center"><a class="btn btn-success" href="/admin/detailItem.html?${el.id}">Cập nhật</a>
        <a class="btn btn-danger deleteItem"  data-value="${el.id}">Xoa</a>
        </tr>`;
            content.insertAdjacentHTML("beforeend", html);
        });
        const btnDeleteAll = document.querySelectorAll(".deleteItem");
        btnDeleteAll === null || btnDeleteAll === void 0 ? void 0 : btnDeleteAll.forEach((btnDelete) => {
            btnDelete.addEventListener("click", (e) => {
                const dataValue = btnDelete.getAttribute("data-value");
                const url = `http://localhost:3000/products/${dataValue}`;
                fetch(url, {
                    method: "DELETE",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
            });
        });
    });
}
loadProduct();
export {};
