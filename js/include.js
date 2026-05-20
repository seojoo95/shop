import { headerContents } from "./header.js";
import { footerContents } from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("header").innerHTML = headerContents();
  document.querySelector("footer").innerHTML = footerContents();

  document.dispatchEvent(new Event("includeLoaded"));
});
