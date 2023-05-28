import { LoaiType } from "./allProduct";
const url = `http://localhost:3000/categories`;
async function fetchCategories(url: string) {
  await fetch(url)
    .then((response) => response.json())
    .then((categories: LoaiType[]) => {
      let html = "";
      categories.forEach((category) => {
        html = `<div class="accordion-body"><a href="#" class="text-muted text-decoration-none categories" data-idLoai=${category.id}>${category.name}</a></div>`;
        (
          document.querySelector("#flush-collapseOne") as HTMLElement
        ).insertAdjacentHTML("beforeend", html);
      });
    });
}
export default fetchCategories;
