import { ProductType2 } from "./index";
interface MenuLv2 {
  id: number;
  name: string;
  amount?: number;
}
interface LoaiType {
  id: number;
  name: string;
  img: string;
  show: number;
  child?: [{ id: number; name: string }];
}
const url = "http://localhost:3000/products";
const urlLoai = "http://localhost:3000/categories";
async function loadProduct() {
  const products: ProductType2[] = await (await fetch(url)).json();
  const categories: LoaiType[] = await (await fetch(urlLoai)).json();
  const content = document.querySelector("tbody") as HTMLElement;
  let html: string = "";
  products.forEach((el) => {
    html = `<tr>
        <td class="align-middle text-center">${el.name}</td>
        <td class="align-middle text-center">${el.price}</td>
        <td class="text-center"><img class="img-fluid bg-transparent"  style="max-width: 100px" src="../asset/img/${
          el.img[0]
        }"></td>
        <td class="align-middle text-center">${
          categories.find((element) => element.id === el.idLoai)?.name
        }</td>
        <td class="align-middle text-center">${el.date}</td>
        <td class="align-middle text-center"><a class="btn btn-success" href="/admin/detailItem.html?${
          el.id
        }">Cập nhật</a>
        <a class="btn btn-danger deleteItem"  data-value="${el.id}">Xoa</a>
        </tr>`;
    content.insertAdjacentHTML("beforeend", html);
  });
  const btnDeleteAll: NodeListOf<HTMLElement> =
    document.querySelectorAll(".deleteItem");
  btnDeleteAll?.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (e) => {
      const dataValue = btnDelete.getAttribute("data-value");
      const url = `http://localhost:3000/products/${dataValue}`;
      fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
    });
  });
}
loadProduct();
export { LoaiType, MenuLv2 };
