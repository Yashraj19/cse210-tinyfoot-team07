let t=null;const o=await fetch("../dist/template.html").then((t=>t.text())).then((t=>(new DOMParser).parseFromString(t,"text/html").querySelector("template")));customElements.define("tinyfoot-footnote",class extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.appendChild(o.content.cloneNode(!0)),t.getElementById("tinyfoot-button").addEventListener("click",this.t.bind(this)),t.getElementById("tinyfoot-popup").addEventListener("click",(t=>t.stopPropagation()))}t(o){const e=this.shadowRoot.getElementById("tinyfoot-popup");t===e?(t=null,e.classList.remove("active")):(null!==t&&t.classList.remove("active"),e.classList.add("active"),t=e),o.stopPropagation()}}),window.addEventListener("click",(()=>{null!=t&&(t.classList.remove("active"),t=null)}));