const URL = 'https://www.omdbapi.com/?s=batman&apikey=ae86f325';
const API = 'ae86f325';


const inputNode = document.querySelector('#input');
const formNode = document.querySelector('#form');
const moviesEl = document.getElementById('movies');
const movieCardNode = document.getElementById('movie__card-container');


const inputValue = () => inputNode.value;

const getDataFromUser = (e) => {
  e.preventDefault();

  const inputNodeValue = inputValue();
  
  getMovies(inputNodeValue);
  clearInput();
}

const clearInput = () => {
  inputNode.value = "";
  inputNode.focus();
};

const getMovies = async (inputNodeValue) => {
  try {
    const resp = await fetch(`https://www.omdbapi.com/?s=${inputNodeValue}&apikey=${API}`);
    const respData = await resp.json();
    showMovies(respData);
    console.log(respData)
  } catch (error) {
    console.log(error);
  };
};

const showMovies = (data) => {

  moviesEl.innerHTML = '';

  if(data.Response === 'True') {
    data.Search.forEach((movie) => {
      const movieEl = document.createElement('div');
     //movieEl.setAttribute('href', `html?movie.id${movie.imdbID}`);
     movieEl.setAttribute('id', movie.imdbID);
      movieEl.classList.add('movies__wrapper');
      movieEl.innerHTML =  `
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

      movieEl.addEventListener('click', () => showMovieInfo())
      moviesEl.appendChild(movieEl);
      
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'This movie is not definded';
    moviesEl.appendChild(errorMessage);
  }
  getMovieInfo()
};

const getMovieInfo = () => {
  const searchMovieInfo = moviesEl.document.querySelectorAll('.movies-wrapper');
  searchMovieInfo.forEach((movie) => {
    movie.addEventListener('click', async () =>{
      const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=ae86f325`;
      const resp = await fetch(`${url}`);
      const info = await resp.json();
      showMovieInfo(info);
    })
  })
}

const showMovieInfo = (movieInfo) => {
  const movieCardEl = document.createElement('div')
  movieCardEl.classList.add('movie__card-wrapper');
  movieCardEl.classList.add('movie__card-container--show');
  movieCardEl.innerHTML = `
  <div class="movie__card-wrapper">
  <div id="movie__card" class="movie__card">
      <div class="movie__card-img">
          <img class="card__img" src="${movieInfo.Poster}" alt="">
      </div>
      <div class="movie__card-content-container">
          <h2 class="movie__card-title">${movieInfo.Title}</h2>
          <p class="movie__year">Year: <span>${movieInfo.Year}</span></p>
          <p class="movie__rated">Rated: <span></span></p>
          <p class="movie__released">Released: <span></span></p>
          <p class="movie__runtime">Runtime: <span></span></p>
          <p class="movie__genre">Genre: <span></span></p>
          <p class="movie__director">Director: <span></span></p>
          <p class="movie__writer">Writer: <span></span></p>
          <p class="movie__actors">Actors: <span></span></p>
      </div>
      <div class="movie__card-info">
          <p class="movie__text"><span></span></p>
      </div>
      <button id="close-btn" class="movie__card-close-btn">
          <img src="/img/close-circle-svgrepo-com (1).svg" alt="" class="close__button-img">
      </button>
  </div>
</div>`
movieCardNode.appendChild(movieCardEl)
}


formNode.addEventListener('submit', getDataFromUser);
