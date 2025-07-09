// Установите здесь дату вашего события в московском времени (UTC+3)
const targetDate = new Date('2025-07-11T00:00:01+03:00'); // 11 июля 2025 года - 00:00:01 по московскому времени
// const now = new Date();
// const targetDate = new Date(now.getTime() + 5 * 1000); // через 30 секунд от текущего времени

function getWordForm(number, forms) {
    number = Math.abs(number) % 100;
    const n1 = number % 10;
    if (number > 10 && number < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 == 1) return forms[0];
    return forms[2];
}

let celebrationWasShown = false;
let allowShowCelebrationByClick = false;

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;
    const container = document.querySelector('.container');
    const msg = document.getElementById('birthday-message');
    // Если наступила ровно целевая дата (разница <= 0, но не прошло более 1 минуты)
    if (difference <= 0 && difference > -60000) {
        // Автоматически показываем поздравление и останавливаем таймер
        if (!celebrationWasShown) {
            if (container) container.style.display = 'none';
            if (msg) msg.style.display = 'flex';
            showCelebration();
            celebrationWasShown = true;
            allowShowCelebrationByClick = false;
            if (window._countdownInterval) {
                clearInterval(window._countdownInterval);
                window._countdownInterval = null;
            }
        }
        return;
    }
    // Если дата уже прошла (разница меньше -1 минуты)
    if (difference <= -60000) {
        if (container) container.style.display = '';
        if (msg) msg.style.display = 'none';
        celebrationWasShown = false;
        allowShowCelebrationByClick = true;
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('#days + .time-label').textContent = getWordForm(0, ['День', 'Дня', 'Дней']);
        document.querySelector('#hours + .time-label').textContent = getWordForm(0, ['Час', 'Часа', 'Часов']);
        document.querySelector('#minutes + .time-label').textContent = getWordForm(0, ['Минута', 'Минуты', 'Минут']);
        document.querySelector('#seconds + .time-label').textContent = getWordForm(0, ['Секунда', 'Секунды', 'Секунд']);
        return;
    }
    // Таймер идет — поздравление скрыто, таймер видим
    if (container) container.style.display = '';
    if (msg) msg.style.display = 'none';
    celebrationWasShown = false;
    allowShowCelebrationByClick = false;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    document.querySelector('#days + .time-label').textContent = getWordForm(days, ['День', 'Дня', 'Дней']);
    document.querySelector('#hours + .time-label').textContent = getWordForm(hours, ['Час', 'Часа', 'Часов']);
    document.querySelector('#minutes + .time-label').textContent = getWordForm(minutes, ['Минута', 'Минуты', 'Минут']);
    document.querySelector('#seconds + .time-label').textContent = getWordForm(seconds, ['Секунда', 'Секунды', 'Секунд']);
}

function showCelebration() {
    // Показ поздравления и запуск фейерверка
    createFireworksInMessage();
}

// Новая функция для фейерверка в поздравлении
function createFireworksInMessage() {
    const msg = document.getElementById('birthday-message');
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.position = 'absolute';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)];
            msg.appendChild(firework);
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.getElementById('hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем таймер каждую секунду
    updateCountdown();
    window._countdownInterval = setInterval(updateCountdown, 1000);
    
    // Создаем сердечки каждые 2 секунды
    setInterval(createHeart, 2000);
    
    // Добавляем интерактивность при клике
    document.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 200);
        }
        // Новая логика: если дата уже прошла, показываем поздравление по клику
        if (allowShowCelebrationByClick) {
            const container = document.querySelector('.container');
            const msg = document.getElementById('birthday-message');
            if (container) container.style.display = 'none';
            if (msg) msg.style.display = 'flex';
            showCelebration();
            // Останавливаем обновление таймера после показа поздравления
            if (window._countdownInterval) {
                clearInterval(window._countdownInterval);
                window._countdownInterval = null;
            }
        }
    });

    // Flip по клику на карточку
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            card.classList.toggle('flipped');
            // Автоматически возвращать обратно через 3 секунды
            setTimeout(() => card.classList.remove('flipped'), 3000);
        });
    });
});

// === Видео по кнопке "ХОЧУ БОЛЬШЕ" ===
const videoModal = document.getElementById('video-modal');
const videoIframe = document.getElementById('video-iframe');
const videoClose = document.querySelector('.video-modal-close');
const videoBackdrop = document.querySelector('.video-modal-backdrop');
const moreBtn = document.querySelector('.more-btn.heart-btn-bottom');

// Ссылка на Google Drive видео (ID: 1bOkm0JAomhxvzL7YPZXWIax2pmWqiBn3)
const GOOGLE_DRIVE_VIDEO_URL = 'https://drive.google.com/file/d/1bOkm0JAomhxvzL7YPZXWIax2pmWqiBn3/preview';

function openVideoModal() {
  if (videoModal && videoIframe) {
    videoModal.classList.add('show');
    videoModal.style.display = 'flex';
    videoIframe.src = GOOGLE_DRIVE_VIDEO_URL;
  }
}
function closeVideoModal() {
  if (videoModal && videoIframe) {
    videoModal.classList.remove('show');
    videoModal.style.display = 'none';
    videoIframe.src = '';
  }
}
if (moreBtn) {
  moreBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    openVideoModal();
  });
}
if (videoClose) {
  videoClose.addEventListener('click', function(e) {
    e.stopPropagation();
    closeVideoModal();
  });
}
if (videoBackdrop) {
  videoBackdrop.addEventListener('click', function() {
    closeVideoModal();
  });
}
// ESC для закрытия
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeVideoModal();
});
