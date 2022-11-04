import {sampleStore , movieStore } from './module/data.js';

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
