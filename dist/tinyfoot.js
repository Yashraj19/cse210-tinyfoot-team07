let t = null;
const e = await fetch("../dist/template.html")
  .then((t) => t.text())
  .then((t) =>
    new DOMParser().parseFromString(t, "text/html").querySelector("template"),
  );
customElements.define(
  "tinyfoot-footnote",
  class extends HTMLElement {
    constructor() {
      super();
      const t = this.attachShadow({ mode: "open" });
      t.appendChild(e.content.cloneNode(!0)),
        t
          .getElementById("tinyfoot-button")
          .addEventListener("click", this.t.bind(this)),
        t
          .getElementById("tinyfoot-popup")
          .addEventListener("click", (t) => t.stopPropagation());
    }
    t(e) {
      const o = this.shadowRoot.getElementById("tinyfoot-popup");
      if (t === o) (t = null), o.classList.remove("active");
      else {
        null !== t && t.classList.remove("active"),
          o.classList.add("active"),
          (t = o);
        for (const e of ["left-edge", "right-edge", "bottom-edge"])
          t.classList.remove(e);
        const e = o.getBoundingClientRect();
        e.left < 0
          ? o.classList.add("left-edge")
          : e.left + e.width > window.innerWidth
            ? o.classList.add("right-edge")
            : e.y + e.height > window.innerHeight &&
              o.classList.add("bottom-edge");
      }
      e.stopPropagation();
    }
  },
),
  window.addEventListener("click", () => {
    null != t && (t.classList.remove("active"), (t = null));
  });
