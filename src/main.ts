//coutdown sale off
const timeSaleOff = new Date("August 26, 2023");
setInterval((): void => {
  const timeNow = new Date().getTime();
  const time = +timeSaleOff - timeNow;
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const second = Math.floor((time / 1000) % 60);
  (document.querySelector(".days") as HTMLElement).textContent =
    days.toString();
  (document.querySelector(".hours") as HTMLElement).textContent =
    hours.toString();
  (document.querySelector(".minutes") as HTMLElement).textContent =
    minutes.toString();
  (document.querySelector(".second") as HTMLElement).textContent =
    second.toString();
}, 1000);
//tab
const tabs = document.querySelectorAll(".tab-item") as NodeListOf<HTMLElement>;
const contents = document.querySelectorAll(
  ".tab-pane"
) as NodeListOf<HTMLElement>;
const lines = document.querySelector(".line") as HTMLElement;
const tab = document.querySelector(".tab-item.active") as HTMLElement;
lines.style.left = tab.offsetLeft + "px";
lines.style.width = tab.offsetWidth + "px";
tabs.forEach((tab, index) => {
  const content = contents[index];
  tab.onclick = function () {
    const activeTab = this as HTMLElement;
    (
      document.querySelector(".tab-item.active") as HTMLElement
    ).classList.remove("active");
    (
      document.querySelector(".tab-pane.active") as HTMLElement
    ).classList.remove("active");
    lines.style.left = activeTab.offsetLeft + "px";
    lines.style.width = activeTab.offsetWidth + "px";
    activeTab.classList.add("active");
    content.classList.add("active");
  };
});
