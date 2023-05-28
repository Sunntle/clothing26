const addtocart = (id, name, image, color = "Black", price, quantity = 1, size = "M") => {
    let cart = JSON.parse(localStorage.getItem("cart") || "");
    if (cart == null) {
        cart = [];
        cart.push({ id, name, image, color, price, quantity, size });
    }
    else {
        let item = cart.find((item) => item.id === id);
        if (item && item.color === color && item.size === size) {
            item.quantity
                ? (item.quantity = +item.quantity + +quantity)
                : item.quantity;
        }
        else {
            cart.push({ id, name, image, color, price, quantity, size });
        }
    }
    renderCountCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
};
const renderCountCart = (cart) => {
    const numberCart = document.querySelector(".countProduct");
    numberCart.textContent = cart
        .reduce((acc, cur) => acc + +cur.quantity, 0)
        .toString();
};
export { renderCountCart };
export default addtocart;
