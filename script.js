function typeEffect(element, speed = 100) {
  const text = element.getAttribute("data-text");
  let i = 0;
  element.innerHTML = "";

  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

document.querySelectorAll(".animated-text").forEach((el) => {
  typeEffect(el, 50); // Kurangi speed untuk lebih cepat
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-bs-toggle='modal']").forEach((button) => {
    button.addEventListener("click", function (event) {
      let modal = document.querySelector("data-bs-target"); // Ganti dengan ID modal kamu
      let rect = this.getBoundingClientRect(); // Ambil posisi tombol yang ditekan

      modal.style.position = "absolute";
      modal.style.top = `${rect.top + window.scrollY}px`;
      modal.style.left = `${rect.left + window.scrollX}px`;
    });
  });
});

document
  .getElementById("moreInfoBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
