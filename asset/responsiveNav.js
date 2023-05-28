export default () => {
    const showNav = document.querySelector(".showNav");
    const navsub = document.querySelectorAll(".navsub");
    showNav.addEventListener("click", (e) => {
        e.preventDefault();
        navsub.forEach((el) => {
            el.classList.toggle("d-none");
        });
    });
};
