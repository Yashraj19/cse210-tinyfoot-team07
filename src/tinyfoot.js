class TinyfootFootnote extends HTMLElement {
  // current active popup
  static #activePopup = null;

  // template used to create footnote elements
  static #template = document.getElementById("tinyfoot-template");

  // whether the button will be numbered
  static numeric = false;

  // whether the popup will show in the bottom
  static bottom = false;

  static {
    window.addEventListener("click", () => {
      // click on other parts to close the popup
      if (TinyfootFootnote.#activePopup != null) {
        TinyfootFootnote.#activePopup.classList.remove("active");
        TinyfootFootnote.#activePopup = null;
      }
    });
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.appendChild(TinyfootFootnote.#template.content.cloneNode(true));

    const button = root.getElementById("tinyfoot-button");
    const popup = root.getElementById("tinyfoot-popup");
    button.addEventListener("click", this.onClick.bind(this));
    if (TinyfootFootnote.numeric) {
      button.classList.add("numeric");
    }
    popup.addEventListener("click", (event) => event.stopPropagation());
    if (TinyfootFootnote.bottom) {
      popup.classList.add("buttom");
    }
  }

  onClick(event) {
    event.stopPropagation();
    const thisPopup = this.shadowRoot.getElementById("tinyfoot-popup");

    if (TinyfootFootnote.#activePopup === thisPopup) {
      // click on the same button to close the popup
      TinyfootFootnote.#activePopup = null;
      thisPopup.classList.remove("active");
      return;
    }

    if (TinyfootFootnote.#activePopup !== null) {
      TinyfootFootnote.#activePopup.classList.remove("active");
    }
    thisPopup.classList.add("active");
    TinyfootFootnote.#activePopup = thisPopup;

    // prevent the popup from overflowing
    if (thisPopup.classList.contains("bottom")) {
      return;
    }
    for (const c of ["left-edge", "right-edge", "bottom-edge"]) {
      thisPopup.classList.remove(c);
    }
    const rect = thisPopup.getBoundingClientRect();
    if (rect.left < 0) {
      thisPopup.classList.add("left-edge");
    } else if (rect.left + rect.width > window.innerWidth) {
      thisPopup.classList.add("right-edge");
    } else if (rect.y + rect.height > window.innerHeight) {
      thisPopup.classList.add("bottom-edge");
    }
  }
}

export default function (options) {
  TinyfootFootnote.numeric = Boolean(options?.numeric);
  TinyfootFootnote.bottom = Boolean(options?.bottom);
  customElements.define("tinyfoot-footnote", TinyfootFootnote);
}
