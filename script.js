function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show-menu");
}
document.addEventListener('click', function(event) {
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-btn");

  // Eğer menü açıksa ve tıklanan yer menünün içinde DEĞİLSE ve hamburger/çarpı değilse
  if (
    menu.classList.contains("show-menu") &&
    !menu.contains(event.target) &&
    !toggle.contains(event.target) &&
    !(closeBtn && closeBtn.contains(event.target))
  ) {
    menu.classList.remove("show-menu");
  }
});
