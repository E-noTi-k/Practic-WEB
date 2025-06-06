document.addEventListener('DOMContentLoaded', function() {
    // 1 Projects slider with mouse drag
    const sliderContainer = document.querySelector('.projects-slider-container');
    const slider = document.querySelector('.projects-slider');
    
    if (sliderContainer && slider) {
      let isDown = false;
      let startX;
      let scrollLeft;
      
      sliderContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderContainer.style.cursor = 'grabbing';
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        isDown = false;
        sliderContainer.style.cursor = 'grab';
      });
      
      sliderContainer.addEventListener('mouseup', () => {
        isDown = false;
        sliderContainer.style.cursor = 'grab';
      });
      
      sliderContainer.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2; 
        sliderContainer.scrollLeft = scrollLeft - walk;
      });
      
      let isScrolling;
      sliderContainer.addEventListener('scroll', () => {
        sliderContainer.style.cursor = 'grabbing';
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          sliderContainer.style.cursor = 'grab';
        }, 100);
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    // 2 Recommended section slider
    const carouselContainer = document.querySelector('.recommend-section .carousel-container');
    const carousel = document.querySelector('.recommend-section .carousel');
    const prevBtn = document.querySelector('.recommend-section .prev-btn');
    const nextBtn = document.querySelector('.recommend-section .next-btn');
    const cards = document.querySelectorAll('.recommend-section .card');
  
    if (carousel && prevBtn && nextBtn && cards.length > 0) {
      let cardWidth = cards[0].offsetWidth + 20;
      let maxVisibleCards = Math.max(1, Math.floor(carouselContainer.offsetWidth / cardWidth));
      let maxPosition = Math.min(0, -(cards.length - maxVisibleCards) * cardWidth);
      let currentPosition = 0;
  
      function updateCarousel() {
        carousel.style.transform = `translateX(${currentPosition}px)`;
  
        prevBtn.disabled = currentPosition >= 0;
        nextBtn.disabled = currentPosition <= maxPosition;
  
        prevBtn.classList.toggle('disabled', currentPosition >= 0);
        nextBtn.classList.toggle('disabled', currentPosition <= maxPosition);
      }
  
      prevBtn.addEventListener('click', function () {
        if (currentPosition < 0) {
          currentPosition += cardWidth * maxVisibleCards;
          if (currentPosition > 0) currentPosition = 0;
          updateCarousel();
        }
      });
  
      nextBtn.addEventListener('click', function () {
        if (currentPosition > maxPosition) {
          currentPosition -= cardWidth * maxVisibleCards;
          if (currentPosition < maxPosition) currentPosition = maxPosition;
          updateCarousel();
        }
      });
  
      function handleResize() {
        cardWidth = cards[0].offsetWidth + 20;
        maxVisibleCards = Math.max(1, Math.floor(carouselContainer.offsetWidth / cardWidth));
        maxPosition = Math.min(0, -(cards.length - maxVisibleCards) * cardWidth);
        if (currentPosition < maxPosition) currentPosition = maxPosition;
        if (currentPosition > 0) currentPosition = 0;
        updateCarousel();
      }
  
      updateCarousel();
      window.addEventListener('resize', handleResize);
  
      carouselContainer.addEventListener('wheel', function (e) {
        e.preventDefault();
      }, { passive: false });
    }
  });
  
// 3 Бургер
  document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarCollapse');
  
    if (navbarToggler && navbarCollapse) {
      navbarToggler.addEventListener('click', function(e) {
        const isOpen = navbarCollapse.classList.contains('show');
        if (isOpen) {
          navbarCollapse.classList.remove('show');
          this.setAttribute('aria-expanded', 'false');
        } else {
          navbarCollapse.classList.add('show');
          this.setAttribute('aria-expanded', 'true');
        }
      });
  
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
        });
      });
  
      document.addEventListener('click', function(e) {
        const isClickInsideMenu = navbarCollapse.contains(e.target);
        const isClickOnToggler = navbarToggler.contains(e.target);
  
        if (!isClickInsideMenu && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          navbarToggler.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // 4 developer slider
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.developer-slider');
    const slides = document.querySelectorAll('.developer-slide');
    let currentIndex = 0;
  
    function showNextSlide() {
      currentIndex++;
      if (currentIndex >= slides.length) {
        currentIndex = 0;
      }
      const offset = currentIndex * -100;
      slider.style.transform = `translateX(${offset}%)`;
    }
  
    setInterval(showNextSlide, 4000);
  });

  document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropdown-toggle');
      const items = dropdown.querySelectorAll('.dropdown-item');
  
      items.forEach(item => {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          const selectedText = this.textContent.trim();
          button.textContent = selectedText;
        });
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const allowedDomains = [
      'gmail.com',
      'mail.ru',
      'yandex.ru',
      'icloud.com',
      'bk.ru',
      'list.ru',
      'outlook.com'
    ];
  
    const emailInput = document.getElementById('newsletter-email');
    const submitBtn = document.getElementById('newsletter-submit');
    const errorMsg = document.getElementById('newsletter-error');
  
    function validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(email)) {
        return 'Введите корректный email.';
      }
  
      const domain = email.split('@')[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
        return 'Поддерживаются только gmail.com, mail.ru и др.';
      }
  
      return '';
    }
  
    submitBtn.addEventListener('click', function () {
      const email = emailInput.value.trim();
      const validationMessage = validateEmail(email);
  
      if (validationMessage) {
        errorMsg.textContent = validationMessage;
        errorMsg.style.display = 'block';
      } else {
        errorMsg.style.display = 'none';
  
        alert('Спасибо за подписку!');
        emailInput.value = '';
      }
    });
  });

  // 7 Якори
  document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  const scrollToBottomBtn = document.querySelector('.scroll-to-bottom');

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollToBottomBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
});

// 8 анимация
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// 9 форма для отправки
document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.quiz-step');
  const nextBtn = document.getElementById('quiz-next');
  const progress = document.querySelector('.quiz-progress');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('d-none', i !== index);
    });

    if (index < 8) {
      progress.textContent = `${index + 1} из 8`;
      nextBtn.textContent = 'Следующий вопрос';
    } else if (index === 8) {
      progress.textContent = `8 из 8`;
      nextBtn.textContent = 'Отправить заявку';
    } else {
      nextBtn.style.display = 'none';
      progress.style.display = 'none';
    }
  }

  nextBtn.addEventListener('click', function () {

    if (currentStep < 8) {
      const inputs = steps[currentStep].querySelectorAll('input[type="radio"]');
      const selected = [...inputs].some(i => i.checked);
      if (!selected) {
        alert('Пожалуйста, выберите вариант ответа.');
        return;
      }
    }

    if (currentStep === 8) {
      const name = document.getElementById('userName').value.trim();
      const contact = document.getElementById('userContact').value.trim();
      if (!name || !contact) {
        alert('Введите имя и контактные данные.');
        return;
      }

      console.log('Ответы отправлены');
    }

    currentStep++;
    showStep(currentStep);
  });

  showStep(currentStep);
});

// 10 Реклама
document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('promo-popup');
  const closeBtn = document.getElementById('close-popup');
  let popupShown = false;

  function showPopup() {
    if (!popupShown && popup) {
      popup.classList.add('d-flex');
      // используем setTimeout для плавной активации анимации
      setTimeout(() => popup.classList.add('show'), 10);
      popupShown = true;
    }
  }
  
  // Показываем через 10 секунд (для теста)
  setTimeout(showPopup, 10000);

  // Exit intent
  document.addEventListener('mouseout', function (e) {
    if (e.clientY < 10 && !popupShown) {
      showPopup();
    }
  });

  // Закрытие
closeBtn.addEventListener('click', () => {
  popup.classList.remove('show');
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('d-flex');
  }, 400); // таймер = длительности transition
});

});

// 11 Окно
setTimeout(() => {
  const notice = document.getElementById('floating-notice');
  if (notice) {
    notice.style.display = 'block';
    setTimeout(() => {
      notice.style.display = 'none';
    }, 6000);
  }
}, 10000);

// 12 Таймер акции
function startCountdown(duration, display) {
  let timer = duration;
  const interval = setInterval(() => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}`;
    if (--timer < 0) {
      clearInterval(interval);
      document.getElementById('promo-banner').style.display = 'none';
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('countdown-timer');
  if (display) startCountdown(300, display); // 5 минут
});

// 13 онлайн оператор
setTimeout(() => {
  const chatNotice = document.createElement('div');
  chatNotice.className = 'position-fixed bottom-0 start-0 bg-success text-white p-3 rounded-top shadow';
  chatNotice.style.zIndex = 9999;
  chatNotice.textContent = '💬 Алексей, консультант онлайн';
  document.body.appendChild(chatNotice);

  setTimeout(() => chatNotice.remove(), 8000); // убираем через 8 сек
}, 12000);

// 14 Анимация цифр
function animateValue(id, start, end, duration, suffix = '') {
  const el = document.getElementById(id);
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateValue('counter-commission', 0, 0, 1000, '%');
      animateValue('counter-mortgage', 0, 2.99, 1500, '%');
      animateValue('counter-founded', 0, 2010, 2000);
      animateValue('counter-repeat', 0, 2010, 2000)
      observer.disconnect();
    }
  }, { threshold: 0.4 });

  const section = document.querySelector('.about');
  if (section) observer.observe(section);
});

// Карта
document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('map').setView([25.2048, 55.2708], 12); // Координаты Дубая

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  L.marker([25.2048, 55.2708])
    .addTo(map)
    .bindPopup('Офис в Дубае<br>Мы здесь!')
    .openPopup();
});
