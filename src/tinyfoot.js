let activePopup = null;
const template = await fetch("../dist/template.html")
  .then((s) => s.text())
  .then((t) =>
    new DOMParser().parseFromString(t, "text/html").querySelector("template"),
  );

customElements.define(
  "tinyfoot-footnote",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.appendChild(template.content.cloneNode(true));
      root
        .getElementById("tinyfoot-button")
        .addEventListener("click", this.onClick.bind(this));
    }

    onClick() {
      const thisPopup = this.shadowRoot.getElementById("tinyfoot-popup");
      if (activePopup === thisPopup) {
        activePopup = null;
        thisPopup.classList.remove("active");
        return;
      }

      if (activePopup !== null) {
        activePopup.classList.remove("active");
      }
      thisPopup.classList.add("active");
      activePopup = thisPopup;
    }
  },
);
