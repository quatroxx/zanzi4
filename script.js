function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  var body = document.querySelector('main');
  var hamburger = document.querySelector('.hamburger');

  menu.classList.toggle("show-menu");
  body.classList.toggle("blurred");
  hamburger.classList.toggle("active");
}


document.addEventListener('click', function(event) {
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-btn");
  const body = document.querySelector('main');
  const hamburger = document.querySelector('.hamburger'); // Bunu mutlaka ekle!

  if (
    menu.classList.contains("show-menu") &&
    !menu.contains(event.target) &&
    !toggle.contains(event.target) &&
    !(closeBtn && closeBtn.contains(event.target))
  ) {
    menu.classList.remove("show-menu");
    body.classList.remove("blurred");
    hamburger.classList.remove("active"); // İşte eksik olan bu satır!
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
// Lightbox açma
function openLightbox(src) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

// Lightbox kapama
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

