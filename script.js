/* ========================================
   ПЕРЕМЕННЫЕ ДЛЯ КОНФИГУРАЦИИ
   ======================================== */

// TODO: Заменить эти значения на реальные данные
const CONFIG = {
    startDate: '15 июня',           // Дата старта ближайшего потока
    paymentUrl: 'https://vk.me/danilovaelal', // Ссылка на диалог в VK
    tariffs: {
        solo: {
            price: 5000,            // TODO: Обновить цену
            url: 'https://vk.me/danilovaelal' // Ссылка на диалог в VK
        },
        group: {
            price: 12000,           // TODO: Обновить цену
            url: 'https://vk.me/danilovaelal' // Ссылка на диалог в VK
        },
        individual: {
            price: 25000,           // TODO: Обновить цену
            url: 'https://vk.me/danilovaelal' // Ссылка на диалог в VK
        }
    },
    author: {
        name: 'Елена Данилова',
        book: 'Почему после 40 не поздно. И есть ли жизнь после монастыря?'
    }
};

/* ========================================
   ФУНКЦИЯ ПРОКРУТКИ К ТАРИФАМ
   ======================================== */

function scrollToPricing() {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ========================================
   ОБРАБОТЧИКИ КНОПОК
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Все кнопки теперь ведут на внешние ссылки
    // Инициализация других интерактивных элементов
    initializeAnimations();
    initializeHoverEffects();
});

/* ========================================
   АНИМАЦИИ ПРИ ПРОКРУТКЕ
   ======================================== */

function initializeAnimations() {
    // Наблюдатель для элементов при их входе в viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Применить наблюдателя к элементам
    const elements = document.querySelectorAll('.pain-card, .solution-item, .format-card, .stage, .pricing-card, .result-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ========================================
   HOVER ЭФФЕКТЫ
   ======================================== */

function initializeHoverEffects() {
    // Эффект при наведении на карточки
    const cards = document.querySelectorAll('.pain-card, .solution-item, .format-card, .stage, .pricing-card, .who-item, .not-who-item, .result-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

/* ========================================
   УТИЛИТЫ
   ======================================== */

// Функция для логирования (для отладки)
function logEvent(eventName, data = {}) {
    console.log(`[${eventName}]`, data);
}

// Функция для обновления цены (если она будет динамической)
function updatePrice(tariff, newPrice) {
    CONFIG.tariffs[tariff].price = newPrice;
    console.log(`Цена тарифа "${tariff}" обновлена на ${newPrice} ₽`);
}

// Функция для обновления даты старта
function updateStartDate(newDate) {
    CONFIG.startDate = newDate;
    const dateElements = document.querySelectorAll('.final-cta-text strong');
    dateElements.forEach(el => {
        el.textContent = newDate;
    });
    console.log(`Дата старта обновлена на ${newDate}`);
}

/* ========================================
   TRACKING И АНАЛИТИКА (заготовка)
   ======================================== */

// Отслеживание кликов на кнопки (для метрики)
function trackButtonClick(buttonText) {
    logEvent('button_click', { text: buttonText });
    // TODO: Добавить интеграцию с сервисом аналитики (Google Analytics, Яндекс.Метрика и т.д.)
}

// Отслеживание просмотра раздела
function trackSectionView(sectionName) {
    logEvent('section_view', { section: sectionName });
    // TODO: Добавить интеграцию с сервисом аналитики
}

/* ========================================
   ЭКСПОРТ ФУНКЦИЙ ДЛЯ ИСПОЛЬЗОВАНИЯ
   ======================================== */

// Сделать функции доступными глобально
window.scrollToPricing = scrollToPricing;
window.trackButtonClick = trackButtonClick;
window.trackSectionView = trackSectionView;
window.updatePrice = updatePrice;
window.updateStartDate = updateStartDate;
window.CONFIG = CONFIG;
