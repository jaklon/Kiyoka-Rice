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
  function showInfo(title, event) {
    const instructions = {
      "Tahukah Kamu ?":
        "Beras porang adalah pilihan cerdas bagi kamu yang peduli kesehatan. \nDibanding beras putih biasa, beras porang punya sejumlah keunggulan yang mengagumkan! \n\n📉 Lebih Rendah Kalori & Karbohidrat\n🏥 Ramah untuk Penderita Diabetes\n🍵 Bikin Kenyang Lebih Lama\n🌿 Tanpa Pengawet & Gluten-Free",
      "Beras Porang VS Beras Biasa":
        "",
    };

    // Hapus kelas 'active' dari semua kartu
    document
      .querySelectorAll(".tip-card")
      .forEach((card) => card.classList.remove("active"));

    // Jika fungsi ini dipicu oleh klik, tambahkan kelas 'active' ke kartu yang diklik
    if (event) {
      // event.target bisa jadi <h5>, jadi kita cari parent .tip-card terdekat
      event.target.closest(".tip-card").classList.add("active");
    } else {
      // Jika tidak ada event (misal saat load), aktifkan kartu pertama
      const firstCard = document.querySelector(".tip-card");
      if (firstCard) firstCard.classList.add("active");
    }

    const content = instructions[title] || "Informasi belum tersedia.";
    document.querySelector(".instructions-text").innerHTML =
      "<pre>" + content + "</pre>";
  }

  // --- PENGATURAN TOMBOL WHATSAPP ---
  const phoneNumber = "6281298954323"; // Ganti dengan nomor Anda
  const message =
    "Halo, saya tertarik dengan produk Kiyoka Rice. Bisa minta informasi lebih lanjut?";

  const whatsappButton = document.getElementById("whatsapp-button");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  whatsappButton.href = whatsappUrl;

  // --- INISIALISASI DAN EVENT LISTENERS ---

  // 1. Jalankan efek ketik pada semua elemen yang memiliki kelas .animated-text
  document.querySelectorAll(".animated-text").forEach((el) => typeEffect(el));

  // 2. Tampilkan info default saat halaman pertama kali dimuat
  showInfo("Tahukah Kamu ?");

  // 3. Tambahkan event listener untuk setiap kartu info
  document.querySelectorAll(".tip-card").forEach((card) => {
    card.addEventListener("click", function (event) {
      // Ambil judul dari dalam kartu yang diklik
      const title = this.querySelector(".card-title").textContent;
      showInfo(title, event);
    });
  });
});
