// Menjalankan semua skrip setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  
  // --- FUNGSI EFEK KETIK ---
  function typeEffect(element, speed = 50) {
    const text = element.getAttribute("data-text");
    if (!text) return; // Keluar jika tidak ada data-text
    let i = 0;
    element.innerHTML = ""; // Kosongkan elemen sebelum memulai

    const interval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }

  // --- FUNGSI UNTUK MENAMPILKAN INFO ---
  // Kode ini tidak diubah
  function showInfo(title, event) {
    const instructions = {
      "Tahukah Kamu ?":
        "Beras porang adalah pilihan cerdas bagi kamu yang peduli kesehatan. \nDibanding beras putih biasa, beras porang punya sejumlah keunggulan yang mengagumkan! \n\n悼 Lebih Rendah Kalori & Karbohidrat\n唱 Ramah untuk Penderita Diabetes\n嵯 Bikin Kenyang Lebih Lama\n諺 Tanpa Pengawet & Gluten-Free",
      "Beras Porang VS Beras Biasa":
        "",
    };
    document
      .querySelectorAll(".tip-card")
      .forEach((card) => card.classList.remove("active"));
    if (event) {
      event.target.closest(".tip-card").classList.add("active");
    } else {
      const firstCard = document.querySelector(".tip-card");
      if (firstCard) first-card.classList.add("active");
    }
    const content = instructions[title] || "Informasi belum tersedia.";
    document.querySelector(".instructions-text").innerHTML =
      "<pre>" + content + "</pre>";
  }

  // --- PENGATURAN TOMBOL WHATSAPP ---
  // Kode ini tidak diubah
  const phoneNumber = "6281298954323";
  const message =
    "Halo, saya tertarik dengan produk Kiyoka Rice. Bisa minta informasi lebih lanjut?";
  const whatsappButton = document.getElementById("whatsapp-button");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  whatsappButton.href = whatsappUrl;

  
  // --- BAGIAN BARU: ANIMASI SCROLL DENGAN GSAP ---
  function initScrollAnimations() {
    // Daftarkan plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animasi untuk bagian "About" yang lebih menarik
    const aboutSection = document.getElementById('about');
    if(aboutSection) {
        // Animasikan judulnya dulu
        gsap.to("#about .section-title-alt", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%", // Mulai animasi saat 80% bagian atas elemen masuk viewport
            }
        });

        // Animasikan setiap bubble chat satu per satu
        const chatBubbles = gsap.utils.toArray('.chat-bubble-wrapper');
        chatBubbles.forEach((bubble, index) => {
            gsap.to(bubble, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.3, // Beri jeda agar muncul satu per satu
                ease: "power1.out",
                scrollTrigger: {
                    trigger: bubble,
                    start: "top 90%",
                }
            });
        });
    }

    // 2. Animasi sederhana untuk section lainnya agar ada motion saat scroll
    const otherSections = ['#product', '#why'];
    otherSections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });
        }
    });
  }
  // --- END BAGIAN BARU ---


  // --- INISIALISASI DAN EVENT LISTENERS ---
  
  // 1. Jalankan efek ketik
  document.querySelectorAll(".animated-text").forEach((el) => typeEffect(el));
  
  // 2. Tampilkan info default (jika ada)
  if (document.querySelector(".tip-card")) {
      showInfo("Tahukah Kamu ?");
  }

  // 3. Tambahkan event listener untuk kartu info
  document.querySelectorAll(".tip-card").forEach((card) => {
    card.addEventListener("click", function (event) {
      const title = this.querySelector(".card-title").textContent;
      showInfo(title, event);
    });
  });

  // 4. Jalankan fungsi animasi scroll
  initScrollAnimations();

});