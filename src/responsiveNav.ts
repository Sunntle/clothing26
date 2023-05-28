export default () => {
  const showNav = document.querySelector(".showNav") as HTMLElement;
  const navsub: NodeListOf<HTMLElement> = document.querySelectorAll(".navsub");
  showNav.addEventListener("click", (e) => {
    e.preventDefault();
    navsub.forEach((el) => {
      el.classList.toggle("d-none");
    });
  });
};
