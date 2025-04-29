// Mobil Menü Aç/Kapa
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const body = document.querySelector('main');
  const hamburger = document.querySelector('.hamburger');

  menu.classList.toggle("show-menu");
  body.classList.toggle("blurred");
  hamburger.classList.toggle("active");
}

// Mobile Menü Dış Tıklama ile Kapat
document.addEventListener('click', function(event) {
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-btn");
  const body = document.querySelector('main');

  if (
    menu.classList.contains("show-menu") &&
    !menu.contains(event.target) &&
    !toggle.contains(event.target) &&
    !(closeBtn && closeBtn.contains(event.target))
  ) {
    menu.classList.remove("show-menu");
    body.classList.remove("blurred");
    toggle.classList.remove("active");
  }
});

// Sayfa Yüklenince Fade-in ve Dotları Oluştur
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('visible');

  const fadeElems = document.querySelectorAll('.fade-in');
  function checkFadeIn() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeElems.forEach(function (elem) {
      const box = elem.getBoundingClientRect();
      if (box.top < triggerBottom) {
        elem.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  checkFadeIn();

  // Dotları oluştur
  document.querySelectorAll('.slider-container').forEach(sliderContainer => {
    console.log("Slider bulundu:", sliderContainer); // debug
    createDots(sliderContainer);
  });
});

// Sayfa geri gelince yeniden fade-in uygula
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    document.body.classList.add('visible');
  }
});

// Linke tıklayınca fade-out
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
      e.preventDefault();
      document.body.classList.remove('visible');
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  });
});

// Favori kalp toggle
function toggleFavorite(icon) {
  const heart = icon.querySelector('.heart');
  heart.classList.toggle('filled');
}

// Slider ileri
function slideNext(button) {
  const sliderContainer = button.parentElement;
  const slider = sliderContainer.querySelector('.slider');
  const totalSlides = slider.children.length;
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset < totalSlides - 1) {
    currentOffset++;
    slider.style.transform = `translateX(-${currentOffset * 100}%)`;
    slider.setAttribute('data-offset', currentOffset);
    updateDots(sliderContainer);
  }
}

// Slider geri
function slidePrev(button) {
  const sliderContainer = button.parentElement;
  const slider = sliderContainer.querySelector('.slider');
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset > 0) {
    currentOffset--;
    slider.style.transform = `translateX(-${currentOffset * 100}%)`;
    slider.setAttribute('data-offset', currentOffset);
    updateDots(sliderContainer);
  }
}

// Swipe (mobil parmakla kaydırma)
document.querySelectorAll('.slider-container').forEach(container => {
  let startX = 0;
  let endX = 0;

  container.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchmove', function (e) {
    endX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', function () {
    const distance = endX - startX;
    if (distance > 50) {
      slidePrev(container.querySelector('.prev'));
    } else if (distance < -50) {
      slideNext(container.querySelector('.next'));
    }
    startX = 0;
    endX = 0;
  });
});

// Dotları oluştur
function createDots(sliderContainer) {
  const slider = sliderContainer.querySelector('.slider');
  const dotsContainer = sliderContainer.querySelector('.dots');

  if (!slider || !dotsContainer) {
    console.warn("Dot container bulunamadı:", sliderContainer);
    return;
  }

  const slideCount = slider.children.length;
  dotsContainer.innerHTML = '';

  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }

  console.log("Dotlar oluşturuldu:", dotsContainer.innerHTML);
}

// Aktif dotu güncelle
function updateDots(sliderContainer) {
  const slider = sliderContainer.querySelector('.slider');
  const dots = sliderContainer.querySelectorAll('.dot');
  const currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  dots.forEach((dot, index) => {
    if (index === currentOffset) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}
