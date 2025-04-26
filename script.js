function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  var body = document.querySelector('main');
  menu.classList.toggle("show-menu");
  body.classList.toggle("blurred");
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
document.addEventListener('DOMContentLoaded', function() {
  var fadeElems = document.querySelectorAll('.fade-in');

  function checkFadeIn() {
    var triggerBottom = window.innerHeight * 0.9;

    fadeElems.forEach(function(elem) {
      const box = elem.getBoundingClientRect();
      if (box.top < triggerBottom) {
        elem.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  checkFadeIn(); // Sayfa yüklenirken kontrol et
});
// Sayfa açılırken yumuşak fade-in
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('visible');
});

// Linklere tıklayınca fade-out geçiş efekti
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith("#") === false && !href.startsWith('javascript')) {
      e.preventDefault();
      document.body.classList.remove('visible');
      setTimeout(() => {
        window.location.href = href;
      }, 500); // fade-out süresiyle eşleşmeli
    }
  });
});

