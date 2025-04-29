// Mobil Menü Aç/Kapa Fonksiyonu
function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  var body = document.querySelector('main');
  var hamburger = document.querySelector('.hamburger');

  menu.classList.toggle("show-menu");
  body.classList.toggle("blurred");
  hamburger.classList.toggle("active");
}

// Sayfada Fade-in için ve Mobile Menu'yu Dışarı Tıklayınca Kapatmak için
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

// Sayfa Yüklenince Fade-in Efekti
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('visible');

  const fadeElems = document.querySelectorAll('.fade-in');
  fadeElems.forEach(function(elem) {
    const box = elem.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.9) {
      elem.classList.add('visible');
    }
  });

  // Tüm slider-container'lar için dotları oluştur
  document.querySelectorAll('.slider-container').forEach(sliderContainer => {
    createDots(sliderContainer);
  });
});

  window.addEventListener('scroll', checkFadeIn);
  checkFadeIn();
});

// Linklere Tıklanınca Sayfa Fade-out ile Gitmesi
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith("#") && !href.startsWith('javascript')) {
      e.preventDefault();
      document.body.classList.remove('visible');
      setTimeout(() => {
        window.location.href = href;
      }, 500); // Fade-out süresi
    }
  });
});

// Favori (Kalp) İkonu Toggle
function toggleFavorite(icon) {
  const heart = icon.querySelector('.heart');
  heart.classList.toggle('filled');
}

// Sağ Butona Basınca İleri Kaydırma
function slideNext(button) {
  const sliderContainer = button.parentElement;
  const slider = sliderContainer.querySelector('.slider');
  const totalSlides = slider.children.length;
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset < totalSlides - 1) {
    currentOffset++;
    slider.style.transform = `translateX(-${currentOffset * 100}%)`;
    slider.setAttribute('data-offset', currentOffset);
    updateDots(sliderContainer); // DOTU GÜNCELLE
  }
}


// Sol Butona Basınca Geri Kaydırma
function slidePrev(button) {
  const sliderContainer = button.parentElement;
  const slider = sliderContainer.querySelector('.slider');
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset > 0) {
    currentOffset--;
    slider.style.transform = `translateX(-${currentOffset * 100}%)`;
    slider.setAttribute('data-offset', currentOffset);
    updateDots(sliderContainer); // DOTU GÜNCELLE
  }
}
// Sayfa Yeniden Yüklendiğinde (Back tuşuyla) Fade-in Efektini Koru
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    document.body.classList.add('visible');
  }
});
// Swipe (Parmakla Kaydırma) Fonksiyonları
document.querySelectorAll('.slider-container').forEach(container => {
  let startX = 0;
  let endX = 0;

  container.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchmove', function(e) {
    endX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', function(e) {
    const distance = endX - startX;
    if (distance > 50) {
      // Sağa kaydırdıysa -> önceki slide
      slidePrev(container.querySelector('.prev'));
    } else if (distance < -50) {
      // Sola kaydırdıysa -> sonraki slide
      slideNext(container.querySelector('.next'));
    }
    // Başlangıç değerlerini sıfırla
    startX = 0;
    endX = 0;
  });
});
// DOTLARI OLUŞTUR
function createDots(sliderContainer) {
  const slider = sliderContainer.querySelector('.slider');
  const dotsContainer = sliderContainer.querySelector('.dots');
  const slideCount = slider.children.length;
  dotsContainer.innerHTML = '';

  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
}

// AKTİF DOTU GÜNCELLE
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
