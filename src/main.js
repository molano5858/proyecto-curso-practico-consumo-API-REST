//vamos a crear la api-key en otro archivo / luego vamos a adicionar ese archivo en el git ignore para que no se suba a github (esto solo se hace porque el profesor no quiere mostrar su API KEY)

const API_URL = "https://api.themoviedb.org/3";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
}); //estamos creando una instancia de axios

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    const trendingContainer = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );
    trendingContainer.appendChild(movieContainer);
  });
}

async function getCategoriesPreview() {
  const { data } = await api(`/genre/movie/list`);
  // const data = await rest.json(); ESTA PARTE NO ES NECESARIA CON AXIOS YA QUE NOS LO DEVUELVE "PARSEADO"
  const genres = data.genres;

  genres.forEach((genre) => {
    const categoryContainer = document.createElement("div");
    const categoryName = document.createElement("h3");
    const categoriesPreviewContainer = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );
    categoryContainer.classList.add("category-container");
    categoryName.setAttribute("id", `id` + genre.id);
    categoryName.classList.add("category-title");
    categoryName.innerHTML = genre.name;
    categoryContainer.appendChild(categoryName);
    categoriesPreviewContainer.appendChild(categoryContainer);
  });
}

getTrendingMoviesPreview();
getCategoriesPreview();
