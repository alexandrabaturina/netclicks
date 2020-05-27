// config.js where API key is stored is added to .gitignore
const apiKey = apiconfig.API_KEY;

// ==== DAY 1 ====
// Work with menu

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

// // Change images on tv cards onmouseover
// // HOMEWORK FOR DAY 1. My option
// const tvCards = document.querySelectorAll('.tv-card__img')
// for (let i = 0; i < tvCards.length; i++) {
//     let originalImage = tvCards[i].src;
//     let newImage = tvCards[i].getAttribute("data-backdrop");
//     tvCards[i].addEventListener('mouseenter', event => {
//         tvCards[i].src = newImage;
//     });
//     tvCards[i].addEventListener('mouseout', event => {
//         tvCards[i].src = originalImage;
//     })
// };



// ==== DAY 2 ====
const tvShowsList = document.querySelector('.tv-shows__list');
const modalWindow = document.querySelector('.modal');

// Open modal window
tvShowsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modalWindow.classList.remove('hide');
    }
})

// Close modal window
modalWindow.addEventListener('click', event => {
    const target = event.target;
    const cross = target.closest('.cross');

    if (cross || target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modalWindow.classList.add('hide');
    }
});

// Change images on tv cards onmouseover
// Instructor's option using destructuring assignment in array
const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if (card) {
        const img = card.querySelector('.tv-card__img');
        if (img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);

// Get data from server
const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Failed to get data from ${url}`)
        }
    }

    getTestData = () => {
        return this.getData('test.json')
    }
}

// Render card
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

const renderCard = response => {
    console.log(response);
    // Clear list
    tvShowsList.textContent = '';
    response.results.forEach(item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
        } = item;

        // If no poster, render img/no-poster.jpg
        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        // If no backdrop, don't change poster
        const backdropIMG = backdrop ? IMG_URL + backdrop : posterIMG;

        //        Instructor's option for backdrop
        //        const backdropIMG = backdrop ? IMG_URL + backdrop : '';

        // If vote = 0, don't show span
        const voteElem = vote ? vote : '';
        const tvCardVoteClass = vote ? "tv-card__vote" : '';

        //        Instructor's option for span
        //        const voteElem = vote ? `<span class=${tvCardVoteClass}>${voteElem}</span>` : ''     
        //        Insert ${voteElem} instead of span in card.innerHTML

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
            <a href="#" class="tv-card">
            <span class=${tvCardVoteClass}>${voteElem}</span>
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${backdropIMG}"
                    alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;
        tvShowsList.append(card);
    });

};
new DBService().getTestData().then(renderCard);
