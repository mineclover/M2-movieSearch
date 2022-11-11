import {React} from './simpleReact.js';

const bottomStore = new React.Store({
  Title: 'Frozen',
  Year: '2013',
  Rated: 'PG',
  Released: '27 Nov 2013',
  Runtime: '102 min',
  Genre: 'Animation, Adventure, Comedy',
  Director: 'Chris Buck, Jennifer Lee',
  Writer: 'Jennifer Lee, Hans Christian Andersen, Chris Buck',
  Actors: 'Kristen Bell, Idina Menzel, Jonathan Groff',
  Plot: 'When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather co...',
  Language: 'English, Norwegian',
  Country: 'United States',
  Awards: 'Won 2 Oscars. 82 wins & 60 nominations total',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database, Value: 7.4/10 '},
    { Source: 'Rotten Tomatoes, Value: 90% '},
    { Source: 'Metacritic, Value: 75/100 '}
  ],
  Metascore: '75',
  imdbRating: '7.4',
  imdbVotes: '620,489',
  imdbID: 'tt2294629',
  Type: 'movie',
  DVD: '18 Mar 2014',
  BoxOffice: '$400,953,009',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True'
  
})


const sampleStore = new React.Store({
  count: 0,
  message: '',
  keyword : '',
  link: ''
})
const movieStore = new React.Store({
  movies: []
})

const searchForm = new React.Store({
  year : 'All',
  page : 1,
  type : "",
  pageUnit : 10,
  inputText : ""
})



const transmission = (movie) => {
  bottomStore.Title = movie.Title;
  bottomStore.Year = movie.Year;
  bottomStore.Rated = movie.Rated;
  bottomStore.Released = movie.Released;
  bottomStore.Runtime = movie.Runtime;
  bottomStore.Genre = movie.Genre;
  bottomStore.Director = movie.Director;
  bottomStore.Writer = movie.Writer;
  bottomStore.Actors = movie.Actors;
  bottomStore.Plot = movie.Plot;
  bottomStore.Language = movie.Language;
  bottomStore.Country = movie.Country;
  bottomStore.Awards = movie.Awards;
  bottomStore.Poster = movie.Poster;
  bottomStore.Ratings = movie.Ratings;
  bottomStore.Metascore = movie.Metascore;
  bottomStore.imdbRating = movie.imdbRating;
  bottomStore.imdbVotes = movie.imdbVotes;
  bottomStore.imdbID = movie.imdbID;
  bottomStore.Type = movie.Type;
  bottomStore.DVD = movie.DVD;
  bottomStore.BoxOffice = movie.BoxOffice;
  bottomStore.Production = movie.Production;
  bottomStore.Website = movie.Website;
  bottomStore.Response = movie.Response;
}




export {sampleStore , movieStore , bottomStore , transmission , searchForm}