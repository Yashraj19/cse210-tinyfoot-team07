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
      root.getElementById("tinyfoot-popup").addEventListener("click", event => event.stopPropagation());
    }

    onClick(event) {
      const thisPopup = this.shadowRoot.getElementById("tinyfoot-popup");
      if (activePopup === thisPopup) {
        activePopup = null;
        thisPopup.classList.remove("active");
      } else {
        if (activePopup !== null) {
          activePopup.classList.remove("active");
        }
        thisPopup.classList.add("active");
        activePopup = thisPopup;
      }

      event.stopPropagation();
    }
  },
);

window.addEventListener("click", () => {
  if (activePopup != null) {
    activePopup.classList.remove("active");
    activePopup = null;
  }
});
