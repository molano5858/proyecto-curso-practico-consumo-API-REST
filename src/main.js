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

  createMovies(movies, trendingMoviesPreviewList);
  // trendingMoviesPreviewList.innerHTML = "";

  // movies.forEach((movie) => {
  //   const movieContainer = document.createElement("div");
  //   movieContainer.classList.add("movie-container");
  //   const movieImg = document.createElement("img");
  //   movieImg.classList.add("movie-img");
  //   movieImg.setAttribute("alt", movie.title);
  //   movieImg.setAttribute(
  //     "src",
  //     `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  //   );

  //   movieContainer.appendChild(movieImg);
  //   trendingMoviesPreviewList.appendChild(movieContainer);
  // });
}

async function getCategoriesPreview() {
  const { data } = await api(`/genre/movie/list`);
  // const data = await rest.json(); ESTA PARTE NO ES NECESARIA CON AXIOS YA QUE NOS LO DEVUELVE "PARSEADO"
  const genres = data.genres;

  categoriesPreviewList.innerHTML = "";

  genres.forEach((genre) => {
    const categoryContainer = document.createElement("div");
    const categoryName = document.createElement("h3");
    categoryContainer.classList.add("category-container");
    categoryName.setAttribute("id", `id` + genre.id);
    categoryName.classList.add("category-title");
    categoryName.innerHTML = genre.name;
    categoryContainer.appendChild(categoryName);
    categoriesPreviewList.appendChild(categoryContainer);
    categoryName.addEventListener("click", () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    });
  });
}

async function getMoviesByCategories(id) {
  const { data } = await api("/discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  createMovies(movies, genericSection);

  //EL SIGUIENTE CODIGO COMO SE REPITE EN UN PAR DE FUNCIONES lo vamos a abstraer en otra funcion que se llama createMovies()
  // genericSection.innerHTML = "";
  // movies.forEach((movie) => {
  //   const movieContainer = document.createElement("div");
  //   movieContainer.classList.add("movie-container");
  //   const movieImg = document.createElement("img");
  //   movieImg.classList.add("movie-img");
  //   movieImg.setAttribute("alt", movie.title);
  //   movieImg.setAttribute(
  //     "src",
  //     `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  //   );

  //   movieContainer.appendChild(movieImg);
  //   genericSection.appendChild(movieContainer);
  // });
}

//hay un codigo que se repite entonces lo vamos a abstraer en una funcion

function createMovies(movies, container) {
  // movies es el array de peliculas y container es el container padre al cual le vamos a hacer todo el appendChild de los elemento html

  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";
  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getMoviesBySearch(searchValue) {
  const { data } = await api("/search/movie", {
    params: {
      query: searchValue,
    },
  });

  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);

  const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  headerSection.style.background = `
  linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%
  ),
  
  url(${movieImgUrl})`;
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  const { data } = await api(`/movie/${id}/recommendations`);
  const realtedMovies = data.results;

  createMovies(realtedMovies, relatedMoviesContainer);
}

// getTrendingMoviesPreview();
// getCategoriesPreview();Estas dos funciones las vamos a ejecutar solo cuando estemos en la pagina home, sea que las voy ejecutar solo en archivo navigation en la funcion homePage()
