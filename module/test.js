import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';


// 테스트 사이드
async function getMovies(title, year = "", page = 1,type = "") {
  const s = `&s=${title}`;
  const y = `&y=${year}`;
  const p = `&page=${page}`;
  const t = `&type=${type}`;
  console.log(`https://omdbapi.com/?apikey=7035c60c${s}${y}${p}${t}`);
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c${s}${y}${p}${t}`);
  console.log(await fetch(`https://omdbapi.com/?apikey=7035c60c${s}${y}${p}${t}`));

  const json = await res.json();
  console.log('json');
  console.log(json);
  console.log(json.Response);
  if (json.Response === "True") {
    const { Search: movies, totalResults } = json;
    return {
      movies,
      totalResults,
    };
  }
  return json.Error;
}


async function deepInfo(id) {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  );
  const json = await res.json();
  if (json.Response === "True") {
    return json;
  }
  return json.Error;
}




(async()=> {

  // const a = await getMovies('Fazoni i Fore 2');
  const a = await getMovies('For');
  const b = await getMovies('ㄱㄴㄷ');
  console.log("test a : "+a);
  console.log("test : "+b);
  console.log(a);
  console.log(b);

  const id = await a.movies[0].imdbID;
  
  const c = await deepInfo(id);
  console.log(c);

  
  movieStore.movies = a.movies;

})();

// 검색을 하면 기존 기록을 갱신한다


// 아래로 스크롤 하면 기존 기록에 추가로 검색을 한다

// 검색 


// movieStore.movies.map(movie => {
//   return React.createElement('article', {
//     'data-id' : movie.imdbID
//   },
//   [
//     React.createElement('img', { src: movie.Poster }),
//     React.createElement('h3', null, movie.Title)
//   ])
// })


// 대체 미이미지 셋
// 대충 이렇다는 느낌만
const dumi = {
  Year: "Unknown",
  "Rated": "PG",
  "Released": "27 Nov 2013",
  "Runtime": "102 min",
  "Genre": "Animation, Adventure, Comedy",
  "Director": "Unknown",
  "Writer": "Unknown",
  "Actors": "Unknown",
  "Plot": "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather co...",
  "Language": "English, Norwegian",
  "Country": "United States",
  "Awards": "",
  "Poster": "./img/no.png",
  "Ratings": [
    { "Source": "Internet Movie Database", "Value": "0/10" },
    { "Source": "Rotten Tomatoes", "Value": "0%" },
    { "Source": "Metacritic", "Value": "0/100" }
  ],
  "imdbRating": "0.0",
  "imdbVotes": "0.0",
  "imdbID": "tt2294629",
  "Type": "movie",
  "DVD": "18 Mar 2014",
  "BoxOffice": "$400,953,009",
  "Production": "N/A",
  "Website": "N/A"
}


const naFilter = mv => {

  const poster = mv.Poster === "N/A" ? dumi.Poster : mv.Poster ;

  return React.createElement('article', {
    'data-id' : mv.imdbID,
    class : "center-wrap-column"
  },
  [
    React.createElement('img', { 
      src: poster,
      class : "simple"
    }),
    React.createElement('h3', null, mv.Title)
  ])
}

export {naFilter, dumi};