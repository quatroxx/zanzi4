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
  var sliders = document.querySelectorAll('.slider');

  function checkFadeIn() {
    var triggerBottom = window.innerHeight * 0.9;
    fadeElems.forEach(function(elem) {
      const box = elem.getBoundingClientRect();
      if (box.top < triggerBottom) {
        elem.classList.add('visible');
      }
    });
  }

  // --- YENİ: Slider genişliğini içerdiği resim sayısına göre ayarla ---
  sliders.forEach(function(slider) {
    const slideCount = slider.children.length;
    slider.style.width = `${slideCount * 100}%`;
  });

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

// Ürün kartlarında sağ-sol kaydırma
function slideNext(button) {
  const slider = button.parentElement.querySelector('.slider');
  const totalSlides = slider.children.length;
  const currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset < totalSlides - 1) {
    slider.style.transform = `translateX(-${(currentOffset + 1) * 100}%)`;
    slider.setAttribute('data-offset', currentOffset + 1);
  }
}

function slidePrev(button) {
  const slider = button.parentElement.querySelector('.slider');
  const currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset > 0) {
    slider.style.transform = `translateX(-${(currentOffset - 1) * 100}%)`;
    slider.setAttribute('data-offset', currentOffset - 1);
  }
}
