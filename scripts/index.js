const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const movieListsNode = document.querySelector('.js-lists');

const params = new URLSearchParams(location.search);

const id = params.get('id');


/*fetch(`https://www.omdbapi.com/?s=fast&apikey=ae86f325`, {
  method: 'GET'
})
  .then(response => response.json())
  .then((res) => {
    
    
  })*/

const fetchHandler = () => {

    fetch('https://www.omdbapi.com/?s=batman&apikey=ae86f325', {
      method: 'GET'
    })

    .then(response => response.json())

    .then((res) => {
    const getBySearch = res;
    
    console.log(getBySearch)
    movieListsNode.innerHTML = `<li>${getBySearch}</li>`
    });
};
fetchHandler()
buttonNode.addEventListener('click', () => {
    fetchHandler()
});



/*fetch('https://www.omdbapi.com/?s=batman&apikey=ae86f325', {
  method: 'GET'
})

.then(response => response.json())
.then((res) => {
  const getMovie = res;
  console.log(getMovie)
})*/