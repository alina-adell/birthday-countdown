// Установите здесь дату вашего события в московском времени (UTC+3)
const targetDate = new Date('2025-07-11T00:00:01+03:00'); // 11 июля 2025 года - 00:00:01 по московскому времени

function getWordForm(number, forms) {
    number = Math.abs(number) % 100;
    const n1 = number % 10;
    if (number > 10 && number < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 == 1) return forms[0];
    return forms[2];
}

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        // Событие наступило!
        showCelebration();
        return;
    }
    
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
    document.getElementById('celebration').style.display = 'flex';
    createFireworks();
    
    // Скрыть празднование через 10 секунд
    setTimeout(() => {
        document.getElementById('celebration').style.display = 'none';
    }, 10000);
}

function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)];
            document.getElementById('celebration').appendChild(firework);
            
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
    setInterval(updateCountdown, 1000);
    
    // Создаем сердечки каждые 2 секунды
    setInterval(createHeart, 2000);
    
    // Добавляем интерактивность при клике
    document.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 200);
        }
    });
});
