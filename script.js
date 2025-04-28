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
  const hamburger = document.querySelector('.hamburger');

  if (
    menu.classList.contains("show-menu") &&
    !menu.contains(event.target) &&
    !toggle.contains(event.target) &&
    !(closeBtn && closeBtn.contains(event.target))
  ) {
    menu.classList.remove("show-menu");
    body.classList.remove("blurred");
    hamburger.classList.remove("active");
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('visible');

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
  checkFadeIn();
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
      }, 500); // fade-out süresi
    }
  });
});

// Favori (kalp) ikonu doldurma
function toggleFavorite(icon) {
  const heart = icon.querySelector('.heart');
  heart.classList.toggle('filled');
}
// Sağ butona tıklanınca bir sonraki görsele geç
function slideNext(button) {
  const slider = button.parentElement.querySelector('.slider');
  const slides = slider.children;
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset < slides.length - 1) {
    currentOffset++;
    const nextSlide = slides[currentOffset];
    slider.style.transform = `translateX(-${nextSlide.offsetLeft}px)`;
    slider.setAttribute('data-offset', currentOffset);
  }
}
// Sol butona tıklanınca bir önceki görsele dön
function slidePrev(button) {
  const slider = button.parentElement.querySelector('.slider');
  const slides = slider.children;
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset > 0) {
    currentOffset--;
    const prevSlide = slides[currentOffset];
    slider.style.transform = `translateX(-${prevSlide.offsetLeft}px)`;
    slider.setAttribute('data-offset', currentOffset);
  }
}
// Sayfa yüklendiğinde slider'ların genişliğini ayarla
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(function(slider) {
    const slideCount = slider.children.length;
    slider.style.width = `${slideCount * 100}%`;
  });
});
