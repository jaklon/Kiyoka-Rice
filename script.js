document.addEventListener("DOMContentLoaded", function () {
  /**
   * Fungsi untuk animasi elemen saat scroll menggunakan Intersection Observer.
   * Ini akan menambahkan kelas 'active' pada elemen dengan kelas '.reveal'
   * ketika elemen tersebut masuk ke dalam viewport.
   */
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1, // Elemen dianggap terlihat jika 10% areanya masuk viewport
      }
    );

    reveals.forEach((reveal) => {
      revealObserver.observe(reveal);
    });
  }

  /**
   * Fungsi untuk animasi section utama menggunakan GSAP dan ScrollTrigger.
   * Ini akan memberikan efek fade-in dan slide-up pada section tertentu.
   */
  function initGsapAnimations() {
    // Pastikan GSAP dan ScrollTrigger sudah dimuat
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.error("GSAP or ScrollTrigger is not loaded.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Targetkan section yang ingin dianimasikan
    const animatedSections = ["#product", "#ulasan"];

    animatedSections.forEach((selector) => {
      const section = document.querySelector(selector);
      if (section) {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // Animasi dimulai saat bagian atas section 85% masuk viewport
          },
        });
      }
    });
  }

  /**
   * Fungsi untuk mengatur link pada tombol WhatsApp.
   */
  function setupWhatsAppButton() {
    const whatsappButton = document.getElementById("whatsapp-button");
    if (whatsappButton) {
      const phoneNumber = "6285770102000"; // Ganti dengan nomor Anda
      const message =
        "Halo, saya tertarik dengan produk Kiyoka Rice. Bisa minta informasi lebih lanjut?";
      const encodedMessage = encodeURIComponent(message);
      whatsappButton.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
  }

  // ======================================================
  // --- INISIALISASI SEMUA FUNGSI ---
  // ======================================================

  revealOnScroll(); // Jalankan animasi untuk elemen '.reveal'
  initGsapAnimations(); // Jalankan animasi untuk section utama
  setupWhatsAppButton(); // Atur tombol WhatsApp
});

document.addEventListener("DOMContentLoaded", function () {
  // Fungsi-fungsi lain...
  revealOnScroll();
  initGsapAnimations();
  setupWhatsAppButton();
  adjustBrandTextVertical(); // <<< Panggil di sini

  window.addEventListener("resize", adjustBrandTextVertical); // Update kalau di-resize
});

function adjustBrandTextVertical() {
  const brandText = document.getElementById("brandText");
  if (!brandText) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile && !brandText.classList.contains("vertical-ready")) {
    const temp = document.createElement("div");
    temp.innerHTML = brandText.innerHTML;

    let newHTML = "";

    temp.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        newHTML += node.textContent
          .split("")
          .map((c) => `<span class="vert-char">${c}</span>`)
          .join("");
      } else if (
        node.nodeType === 1 &&
        node.classList.contains("sehat")
      ) {
        newHTML += node.textContent
          .split("")
          .map((c) => `<span class="vert-char sehat">${c}</span>`)
          .join("");
      }
    });

    brandText.innerHTML = newHTML;
    brandText.classList.add("vertical-ready");

    // Style posisi lebih rapi ke kiri
    brandText.style.position = "absolute";
    brandText.style.left = "24px"; // <-- ini bikin gak mepet kiri
    brandText.style.top = "50%";
    brandText.style.transform = "translateY(-50%)";
    brandText.style.fontSize = "1.8rem";
    brandText.style.lineHeight = "1.3";
    brandText.style.textAlign = "left";
    brandText.style.color = "white";
  }
}


