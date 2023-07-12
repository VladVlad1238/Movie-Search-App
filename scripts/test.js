
const url = 'https://www.omdbapi.com/?s=fast&apikey=ae86f325';


const fetchAsyncMovies = async () => {
  console.log('Fetch movies will start....')
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log('Data:', data) 
  } catch (e) {
    console.error(e);
  };
};
fetchAsyncMovies();