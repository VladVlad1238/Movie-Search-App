const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const movieListsNode = document.querySelector('.js-lists');

const params = new URLSearchParams(location.search);

const id = params.get('id');

const fetchHandler = () => {

    fetch('https://www.omdbapi.com/?s=batman&apikey=ae86f325')

    .then(response => response.json())

    .then((res) => {

        if(res.status < 200 && res.status > 400) {

            return;

        }

    const getMovie = res.s;
    movieListsNode.innerHTML = `<li>${getMovie}</li>`
    });

};

buttonNode.addEventListener('click', () => {
    fetchHandler()
});