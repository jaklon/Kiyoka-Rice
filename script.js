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
