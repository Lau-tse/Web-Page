// Cambia aquí tu correo
const EMAIL = "tu@correo.com";

document.getElementById("year").textContent = new Date().getFullYear();

// Filtros del portafolio
const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");
buttons.forEach(btn => btn.addEventListener("click", () => {
  buttons.forEach(b => b.setAttribute("aria-pressed", b === btn));
  const f = btn.dataset.filter;
  cards.forEach(c => { c.hidden = f !== "all" && c.dataset.cat !== f; });
}));

// Reproductor
const player = document.getElementById("player");
const frame = player.querySelector(".frame");
cards.forEach(card => card.querySelector(".play").addEventListener("click", () => {
  const src = card.dataset.video;
  frame.innerHTML = "";
  if (src) {
    const f = document.createElement("iframe");
    f.src = src;
    f.title = card.querySelector("h3").textContent;
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.allowFullscreen = true;
    frame.appendChild(f);
  } else {
    frame.textContent = "Aquí irá este video. Pega su enlace de embed en data-video.";
  }
  player.showModal();
}));
player.querySelector(".close").addEventListener("click", () => { player.close(); frame.innerHTML = ""; });
player.addEventListener("close", () => { frame.innerHTML = ""; });
player.addEventListener("click", e => { if (e.target === player) player.close(); });

// Formulario: abre el correo con los datos (sin servidor)
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const body = `Nombre: ${d.get("nombre")}\nEmpresa: ${d.get("empresa")}\nProducto: ${d.get("producto")}\nTipo de colaboración: ${d.get("tipo")}`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Colaboración con " + d.get("nombre"))}&body=${encodeURIComponent(body)}`;
});
