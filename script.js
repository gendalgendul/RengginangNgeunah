/* ============================================================
   KONFIGURASI: ubah nilai di sini saja, semua tombol ikut berubah
   ============================================================ */
const CONFIG = {
  // GANTI: nomor WhatsApp format internasional, tanpa "+", spasi, atau tanda hubung
  whatsappNumber: "6285211289633",
  // GANTI: link dan username Instagram
  instagramUrl: "https://www.instagram.com/GANTI_USERNAME_INSTAGRAM",
  // GANTI: teks pesan otomatis (variant kosong = pesan umum)
  message: (variant) =>
    variant
      ? `Halo, saya mau pesan rengginang varian ${variant}.`
      : "Halo, saya mau pesan rengginang.",
};

// Tombol WhatsApp
document.querySelectorAll("[data-wa]").forEach((el) => {
  const text = encodeURIComponent(CONFIG.message(el.dataset.variant));
  el.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});

// Link Instagram
document.querySelectorAll("[data-instagram]").forEach((el) => {
  el.href = CONFIG.instagramUrl;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});

// Tahun di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
};
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Fade-in lembut saat scroll
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("is-visible"));
}