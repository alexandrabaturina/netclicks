const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

// Protect API with .gitignore
const API_KEY = apiconfig.API_KEY;
const API_ENDPOINT = 'https://api.themoviedb.org/3';


// Consts for menu
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

// Preloader
const tvShows = document.querySelector('.tv-shows');
const loading = document.createElement('div');
loading.classList.add('loading');
// Preloader for modal window
const preloader = document.querySelector('.preloader');

// Consts for modal window
const tvShowsList = document.querySelector('.tv-shows__list');
const modalWindow = document.querySelector('.modal');
const tvCardImg = document.querySelector('.tv-card__img');
const modalTitle = document.querySelector('.modal__title');
const genresList = document.querySelector('.genres-list');
const rating = document.querySelector('.rating');
const description = document.querySelector('.description');
const modalLink = document.querySelector('.modal__link');

// Consts for search
const searchForm = document.querySelector('.search__form');
const searchFormInput = document.querySelector('.search__form-input');

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
        return this.getData('test.json');
    }

    getTestCard = () => {
        return this.getData('card.json');
    }

    getSearchResult = (query) => {
        return this.getData(`${API_ENDPOINT}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`);
    }

    getTvShow = (id) => {
        return this.getData(`${API_ENDPOINT}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
    }
}

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
    event.preventDefault();
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


// Open modal window
tvShowsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {

        // Instructor's option for preloader
        // preloader.style.display = 'block';

        // Show preloader while waiting for modal window to download
        tvShows.append(loading);

        // Fill in modal window
        new DBService().getTvShow(card.id)
            .then(response => {
                console.log(response);
                tvCardImg.src = IMG_URL + response.poster_path;
                tvCardImg.alt = response.name;
                modalTitle.textContent = response.name;

                // Clear genres list
                genresList.textContent = '';

                for (const item of response.genres) {
                    genresList.innerHTML += `<li>${item.name}</li>`;
                };

                // Alternative way to change genresList.innerHTML
                // genresList.innerHTML = response.genres.reduce((acc, item) => {
                //     return `${acc}<li>${item.name}</li>`
                // }, '')

                rating.textContent = response.vote_average;
                description.textContent = response.overview;
                modalLink.href = response.homepage;
            })
            .then(() => {
                document.body.style.overflow = 'hidden';
                modalWindow.classList.remove('hide');
                loading.remove();
            })

        // Instructor's option for preloader
        // .then (() => {
        //    preloader.style.display = '';
        // })
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


// Render card
const renderCard = response => {
    // Clear list
    tvShowsList.textContent = '';

    // Handle situations when movies are not found
    const searchResultHeader = document.querySelector('.tv-shows__head');
    const notFoundExists = searchResultHeader.querySelector('h2');
    if (notFoundExists) {
        searchResultHeader.removeChild(notFoundExists);
    }

    if (!response.total_results) {

        const notFound = document.createElement('h2');
        notFound.innerText = "По Вашему запросу ничего не найдено";
        searchResultHeader.append(notFound);
        return
    }

    // Render cards for found movies
    response.results.forEach(item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
        } = item;

        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg'; // If no poster, render img/no-poster.jpg
        const backdropIMG = backdrop ? IMG_URL + backdrop : posterIMG; // If no backdrop, don't change poster
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : ''; // // If vote = 0, don't show span

        const card = document.createElement('li');
        card.idTV = id;
        card.classList.add('tv-shows__item');
        card.innerHTML = `
            <a href="#" id=${id} class="tv-card">
                ${voteElem}
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${backdropIMG}"
                    alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;
        loading.remove()
        tvShowsList.append(card);
    });
};

// Handle search form
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    // Remove spaces at the beginning and at the end of query
    const value = searchFormInput.value.trim();
    if (value) {
        tvShowsList.append(loading);
        new DBService().getSearchResult(value).then(renderCard);
    }
    // Clear search form after sendingrequest
    searchFormInput.value = '';
});
