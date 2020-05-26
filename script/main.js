// Day 1 – Work with menu

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

// Open/close menu
hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');

});

// Close menu on click outside of left menu
document.addEventListener('click', event => {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
})

// Drop-down menu
leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

// Change images on tv cards onmouseover
const tvCards = document.querySelectorAll('.tv-card__img')
for (let i = 0; i < tvCards.length; i++) {
    let originalImage = tvCards[i].src;
    let newImage = tvCards[i].getAttribute("data-backdrop");
    tvCards[i].addEventListener('mouseenter', event => {
        tvCards[i].src = newImage;
    });
    tvCards[i].addEventListener('mouseout', event => {
        tvCards[i].src = originalImage;
    })
}

// ====== Day 2======
const tvShowsList = document.querySelector('.tv-shows__list');
const modalWindow = document.querySelector('.modal');

// Open modal window
tvShowsList.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modalWindow.classList.remove('hide');
    }
})