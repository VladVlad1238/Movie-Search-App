const URL = 'https://www.omdbapi.com/?s=batman&apikey=ae86f325';
const API = 'ae86f325';

const BODY_OVERFLOW_FIXED = 'body_fixed';

const barEl = document.querySelector('.bar');
const bodyNode = document.querySelector('body');
const headerNode = document.querySelector('.header');

const formNode = document.getElementById('form');
const inputNode = document.getElementById('input');
const moviesEl = document.getElementById('movies');
const movieCardNode = document.getElementById('movie__card-container');
const closeButtonNode = document.getElementById('close-btn');

const updateBar = () => {
  let scrollPos = (window.scrollY / (bodyNode.scrollHeight - window.innerHeight)) * 100;
  barEl.style.width = `${scrollPos}%`;
  requestAnimationFrame(updateBar);
};
updateBar();

const inputValue = () => inputNode.value;

const getDataFromUser = (e) => {
  e.preventDefault();

  const inputNodeValue = inputValue();

  getMovies(inputNodeValue);
  clearInput();
};

const clearInput = () => {
  inputNode.value = "";
  inputNode.focus();
};

const getMovies = async (inputNodeValue) => {
  try {
    const resp = await fetch(`https://www.omdbapi.com/?s=${inputNodeValue}&apikey=${API}`);
    const respData = await resp.json();
    showMovies(respData);
    console.log(respData);
  } catch (error) {
    console.log(error);
  };
};

const showMovies = (data) => {

  moviesEl.innerHTML = '';

  if (data.Response === 'True') {
    data.Search.forEach((movie) => {
      const movieEl = document.createElement('div');
      movieEl.setAttribute('id', movie.imdbID);
      movieEl.classList.add('movies__wrapper');
      movieEl.innerHTML = `
        <div class="movies__img-container">
          <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img">
          </div>
          <div class="movies__content-container">
            <h2 class="movies__title">Name: <span>${movie.Title}</span></h2>
            <p class="movies__year">Year: <span>${movie.Year}</span></p>
            <p class="movies__type">Type: <span>${movie.Type}</span></p>
          </div>
        </div>
      `
      movieEl.addEventListener('click', async () => await getMovieInfo(movie.imdbID));
      moviesEl.appendChild(movieEl);
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'This movie is not definded';
    moviesEl.appendChild(errorMessage);
  };
};

const getMovieInfo = async (movieID) => {
  try {
    const url = `https://www.omdbapi.com/?i=${movieID}&apikey=ae86f325`;
    const resp = await fetch(`${url}`);
    const info = await resp.json();
    showMovieInfo(info);
  } catch (error) {
    console.log(error);
  };
};

const showMovieInfo = (data) => {
  const movieCardEl = document.createElement('div');
  movieCardEl.classList.add('movie__card');

  movieCardEl.innerHTML = `
      <div class="inner-wrapper">
        <div class="movie__card-img">
          <img class="card__img" src="${data.Poster}" alt="">
        </div>
        <div class="movie__card-content-container">
          <h2 class="movie__card-title">${data.Title}</h2>
          <p class="movie__year">Year: <span>${data.Year}</span></p>
          <p class="movie__rated">Rated: <span>${data.Rated}</span></p>
          <p class="movie__released">Released: <span>${data.Released}</span></p>
          <p class="movie__runtime">Runtime: <span>${data.Runtime}</span></p>
          <p class="movie__genre">Genre: <span>${data.Genre}</span></p>
          <p class="movie__director">Director: <span>${data.Director}</span></p>
          <p class="movie__writer">Writer: <span>${data.Writer}</span></p>
          <p class="movie__actors">Actors: <span>${data.Actors}</span></p>
        </div>
      </div>
      <div class="movie__card-info">
        <p class="movie__text"><span>${data.Plot}</span></p>
      </div>
      <button id="close-btn" class="movie__card-close-btn type="button" data-action="close">
        <img src="img/close-circle-svgrepo-com (1).svg" alt="" class="close__button-img">
      </button>
` 

  movieCardNode.appendChild(movieCardEl);
  movieCardHandler();
};

const movieCardHandler = () => {
  movieCardNode.classList.add('movie__card-container--show');
  bodyNode.classList.add('body_fixed');
  headerNode.classList.add('header__hidden');
  moviesEl.classList.add('movie__list-hidden');
};

const closeModal = () => {
  bodyNode.classList.remove('body_fixed');
  movieCardNode.classList.remove('movie__card-container--show');
  headerNode.classList.remove('header__hidden');
  moviesEl.classList.remove('movie__list-hidden');
};

bodyNode.addEventListener('click', (e) => {
  if(e.target.id === "close-btn") {
    closeModal();
  };
});

window.addEventListener('click', (e) => {
  if(e.target === movieCardNode) {
    closeModal();
  };
});

movieCardNode.addEventListener('click', movieCardHandler);
formNode.addEventListener('submit', getDataFromUser);


//переделать имена переменных и событий 