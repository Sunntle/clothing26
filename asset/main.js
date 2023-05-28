"use strict";
const timeSaleOff = new Date("August 26, 2023");
setInterval(() => {
    const timeNow = new Date().getTime();
    const time = +timeSaleOff - timeNow;
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const second = Math.floor((time / 1000) % 60);
    document.querySelector(".days").textContent =
        days.toString();
    document.querySelector(".hours").textContent =
        hours.toString();
    document.querySelector(".minutes").textContent =
        minutes.toString();
    document.querySelector(".second").textContent =
        second.toString();
}, 1000);
const tabs = document.querySelectorAll(".tab-item");
const contents = document.querySelectorAll(".tab-pane");
const lines = document.querySelector(".line");
const tab = document.querySelector(".tab-item.active");
lines.style.left = tab.offsetLeft + "px";
lines.style.width = tab.offsetWidth + "px";
tabs.forEach((tab, index) => {
    const content = contents[index];
    tab.onclick = function () {
        const activeTab = this;
        document.querySelector(".tab-item.active").classList.remove("active");
        document.querySelector(".tab-pane.active").classList.remove("active");
        lines.style.left = activeTab.offsetLeft + "px";
        lines.style.width = activeTab.offsetWidth + "px";
        activeTab.classList.add("active");
        content.classList.add("active");
    };
});
