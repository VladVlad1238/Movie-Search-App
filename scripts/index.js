const URL = 'https://www.omdbapi.com/?s=batman&apikey=ae86f325';
const API = 'ae86f325';

const BODY_OVERFLOW_FIXED = 'body_fixed';
const ERROR_MESSAGE_TEXT = 'This movie is not definded';

const barElNode = document.querySelector('.bar');
const bodyNode = document.querySelector('body');
const headerNode = document.querySelector('.header');

const formNode = document.getElementById('form');
const inputNode = document.getElementById('input');
const moviesElNode = document.getElementById('movies__list');
const movieCardNode = document.getElementById('movie__card-container');
const closeButtonNode = document.getElementById('movie__card-close-btn');

//функция горизонтального скролла
const updateBar = () => {
  let scrollPos = (window.scrollY / (bodyNode.scrollHeight - window.innerHeight)) * 100;
  barElNode.style.width = `${scrollPos}%`;
  requestAnimationFrame(updateBar);
};
updateBar();

//получаем данные из инпута
const inputValue = () => inputNode.value;

//обрываем submit, передаем данные из инпута, выводим список фильмов/информацию о фильме. Очищаем инпут
const getDataFromUser = (e) => {
  e.preventDefault();

  const inputNodeValue = inputValue();

  getMoviesList(inputNodeValue);
  clearInput();
};

//функция очистки инпута + фокус
const clearInput = () => {
  inputNode.value = "";
  inputNode.focus();
};

//делаем запрос на серве и получаем данные которые передаем в функцию вывода списка/отлавливаем ошибки
const getMoviesList = async (inputNodeValue) => {
  try {
    const url = `https://www.omdbapi.com/?s=${inputNodeValue}&apikey=${API}`;
    const resp = await fetch(url);
    const respData = await resp.json();
    showMoviesList(respData);
  } catch (error) {
    console.log(error);
  };
};

//функция отрисовки списка + асинхоронная функция замыкания которая получает айди фильма
const showMoviesList = (movies) => {
  moviesElNode.innerHTML = '';

  if (movies.Response === 'True') {
    movies.Search.forEach((movie) => {
      const movieEl = document.createElement('div');
      movieEl.setAttribute('id', movie.imdbID);
      movieEl.classList.add('movies__wrapper');
     
      movieEl.innerHTML = `
        <div class="movies__img-container">
          <img class="movies__img" src="${movie.Poster}" alt="${movie.Title}">
        </div>
          <div class="movies__content-container">
          <h2 class="movies__title">Name: <span>${movie.Title}</span></h2>
          <p class="movies__year">Year: <span>${movie.Year}</span></p>
          <p class="movies__type">Type: <span>${movie.Type}</span></p>
        </div>
      `
      movieEl.addEventListener('click', async () => await getMovieInfo(movie.imdbID));
      moviesElNode.appendChild(movieEl);
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = ERROR_MESSAGE_TEXT;
    moviesElNode.appendChild(errorMessage);
  };
};

//получаем от сервера данные и конкретном фильме при помощи айди/отлавливаем ошибки
const getMovieInfo = async (movieID) => {
  try {
    const url = `https://www.omdbapi.com/?i=${movieID}&apikey=ae86f325`;
    const resp = await fetch(url);
    const info = await resp.json();
    showMovieInfo(info);
  } catch (error) {
    console.log(error);
  };
};

//функция отрисовки конкретного фильма
const showMovieInfo = (movie) => {
  const movieCardEl = document.createElement('div');
  movieCardEl.classList.add('movie__card');

  movieCardEl.innerHTML = `
      <div class="inner-wrapper">
        <div class="movie__card-img">
          <img class="card__img" src="${movie.Poster}" alt="">
        </div>
        <div class="movie__card-content-container">
          <h2 class="movie__card-title">${movie.Title}</h2>
          <p class="movie__year">Year: <span>${movie.Year}</span></p>
          <p class="movie__rated">Rated: <span>${movie.Rated}</span></p>
          <p class="movie__released">Released: <span>${movie.Released}</span></p>
          <p class="movie__runtime">Runtime: <span>${movie.Runtime}</span></p>
          <p class="movie__genre">Genre: <span>${movie.Genre}</span></p>
          <p class="movie__director">Director: <span>${movie.Director}</span></p>
          <p class="movie__writer">Writer: <span>${movie.Writer}</span></p>
          <p class="movie__actors">Actors: <span>${movie.Actors}</span></p>
        </div>
      </div>
      <div class="movie__card-info">
        <p class="movie__text"><span>${movie.Plot}</span></p>
      </div>
      <button id="movie__card-close-btn" class="movie__card-close-btn type="button" data-action="close">
        <img src="img/close-circle-svgrepo-com (1).svg" alt="" class="movie__card-close-button-img">
      </button>
` 

  movieCardNode.appendChild(movieCardEl);
  openMovieCard();
};

//открываем карточку фильма
const openMovieCard = () => {
  movieCardNode.classList.add('movie__card-container--show');
  bodyNode.classList.add('body_fixed');
  headerNode.classList.add('header__hidden');
  moviesElNode.classList.add('movies__list-hidden');
};

//закрываем карточку фильма
const closeMovieCard = () => {
  bodyNode.classList.remove('body_fixed');
  movieCardNode.classList.remove('movie__card-container--show');
  headerNode.classList.remove('header__hidden');
  moviesElNode.classList.remove('movies__list-hidden');
};

//событие закрытия карточки фильма по клику на кнопку
bodyNode.addEventListener('click', (e) => {
  if(e.target.id === "movie__card-close-btn") {
    closeMovieCard();
  };
});

//событие для закрытия карточки фильма, если клик был за пределами карточки
window.addEventListener('click', (e) => {
  if(e.target === movieCardNode) {
    closeMovieCard();
  };
});

movieCardNode.addEventListener('click', openMovieCard);
formNode.addEventListener('submit', getDataFromUser);

