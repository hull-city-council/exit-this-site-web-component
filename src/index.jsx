import r2wc from "@r2wc/react-to-web-component";
import LoadExitThisSite from "./App";

const exitThisSite = r2wc(LoadExitThisSite, { props: { url: "string" } });
const skipLinkList = document.querySelector(".list--skip-links"),
  addToSkipList = document.createElement("li"),
  newLink = document.createElement("a");
addToSkipList.className = "list__item";

Object.assign(newLink, {
  href: "https://bbc.co.uk/weather",
  textContent: "Exit this site",
  className: "list__link",
});

addToSkipList.appendChild(newLink);
skipLinkList.appendChild(addToSkipList);
customElements.define("exit-this-site", exitThisSite);
