interface obj {
  id: number;
  name: string;
  image: string;
  color: string;
  price: number;
  quantity: number;
  size: string;
}
const addtocart = (
  id: number,
  name: string,
  image: string,
  color = "Black",
  price: number,
  quantity = 1,
  size = "M"
) => {
  let cart: obj[] = JSON.parse(localStorage.getItem("cart") || "");
  if (cart == null) {
    cart = [];
    cart.push({ id, name, image, color, price, quantity, size });
  } else {
    let item: obj | undefined = cart.find((item) => item.id === id);
    if (item && item.color === color && item.size === size) {
      item.quantity
        ? (item.quantity = +item.quantity + +quantity)
        : item.quantity;
    } else {
      cart.push({ id, name, image, color, price, quantity, size });
    }
  }
  renderCountCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};
const renderCountCart = (cart: obj[]) => {
  const numberCart = document.querySelector(".countProduct") as HTMLElement;
  numberCart.textContent = cart
    .reduce((acc, cur) => acc + +cur.quantity, 0)
    .toString();
};
export { renderCountCart, obj };
export default addtocart;
