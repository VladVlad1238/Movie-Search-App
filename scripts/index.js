const URL = 'https://www.omdbapi.com/?s=batman&apikey=ae86f325';
const API = 'ae86f325';


const inputNode = document.querySelector('#input');
const formNode = document.querySelector('#form');

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
  } catch (error) {
    console.log(error);
  };
};

const showMovies = (data) => {
  const moviesEl = document.getElementById('movies');
  moviesEl.innerHTML = '';

  if(data.Response === "True") {
    data.Search.forEach((movie) => {
      const movieEl = document.createElement('a');
      movieEl.setAttribute('href', `movie.id${movie.imdbID}`);
      movieEl.classList.add('movies__wrapper');
      movieEl.setAttribute('id', movie.imdbID);
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
      moviesEl.appendChild(movieEl);
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'This movie is not definded';
    moviesEl.appendChild(errorMessage);
  }
};

formNode.addEventListener('submit', getDataFromUser);