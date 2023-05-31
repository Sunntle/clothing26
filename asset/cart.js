import { renderCountCart } from "./addtocart.js";
import responsiveNav from "./responsiveNav.js";
const renderCart = () => {
    responsiveNav();
    const cart = JSON.parse(localStorage.getItem("cart") || "");
    const cartElement = document.querySelector("#cart");
    const html = cart.map((el) => `<tr id="${el.id}">
        <td class="align-middle"><img src="asset/img/${el.image}" alt="" class="img-fluid" style="width: 70px"></td>
        <td class="align-middle"><strong>${el.name} - ${el.size} - ${el.color}</strong></td>
        <td class="align-middle"><strong>${el.price}</strong></td>
        <td class="align-middle" >
            <div class="input-group quantity mx-auto" style="width: 100px;">
                <div class="input-group-btn">
                    <button class="btn btn-sm text-muted btn-minus">
                    <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" class="form-control form-control-sm mx-1  border-0 text-center" value="${el.quantity}">
                <div class="input-group-btn">
                    <button class="btn btn-sm text-muted btn-plus">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </td>
        <td class="align-middle text-center "><strong class="total">${el.price * el.quantity}</strong></td>
        <td class="align-middle text-center"><button class="btn btn-delete"><i class="fa fa-times text-danger"></i></button></td>
        </tr>`);
    cartElement.innerHTML = html.join("");
    const total = Array.from(document.querySelectorAll(".total")).reduce((acc, cur) => acc + +(cur.textContent || 0), 0);
    const ship = +total > 500000 ? 0 : 30000;
    const subtotal = document.querySelector(".Subtotal");
    const shipping = document.querySelector(".Shipping");
    const sum = document.querySelector(".Sum");
    subtotal.textContent = total.toString();
    shipping.textContent = ship.toString();
    sum.textContent = (total + ship).toString();
    const btnDelete = document.querySelectorAll(".btn-delete");
    btnDelete.forEach((el) => {
        el.addEventListener("click", (e) => {
            var _a;
            const event = e.target || null;
            const btnRemove = event.closest("button");
            const idProduct = btnRemove ? (_a = btnRemove.closest("tr")) === null || _a === void 0 ? void 0 : _a.id : null;
            if (idProduct) {
                cart.splice(cart.findIndex((el) => el.id === +idProduct), 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        });
    });
    const quantity = document.querySelectorAll(".quantity button");
    quantity.forEach((el) => el.addEventListener("click", function (e) {
        var _a, _b, _c;
        const event = e.target || null;
        const button = event.tagName === "BUTTON" ? event : event.parentElement;
        const idProduct = (_a = button === null || button === void 0 ? void 0 : button.closest("tr")) === null || _a === void 0 ? void 0 : _a.id;
        if (button) {
            let oldValue = (_c = (_b = button === null || button === void 0 ? void 0 : button.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector("input");
            let newVal = 0;
            if (oldValue) {
                if (button === null || button === void 0 ? void 0 : button.classList.contains("btn-plus")) {
                    newVal = +oldValue.value + 1;
                }
                else {
                    if (+oldValue.value > 1) {
                        newVal = +oldValue.value - 1;
                    }
                    else {
                        newVal = 1;
                    }
                }
                oldValue.value = newVal.toString();
            }
            if (idProduct) {
                let item = cart.find((el) => el.id === +idProduct);
                item.quantity = newVal;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }
    }));
    renderCountCart(cart);
};
renderCart();
