var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = `http://localhost:3000/categories`;
function fetchCategories(url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(url)
            .then((response) => response.json())
            .then((categories) => {
            let html = "";
            categories.forEach((category) => {
                html = `<div class="accordion-body"><a href="#" class="text-muted text-decoration-none categories" data-idLoai=${category.id}>${category.name}</a></div>`;
                document.querySelector("#flush-collapseOne").insertAdjacentHTML("beforeend", html);
            });
        });
    });
}
export default fetchCategories;
