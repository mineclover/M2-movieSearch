import {React} from './simpleReact.js';
import {sampleStore , movieStore ,transmission, bottomStore , searchForm } from './data.js';


// 테스트 사이드
export async function getMovies(title) {
  const s = `&s=${title}`;
  const y = `&y=${searchForm.year}`;
  const p = `&page=${searchForm.page}`;
  const t = `&type=${searchForm.type}`;
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
  console.log(await deepInfo('tt0059578'));

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




const naFilter = mv => {

  const poster = mv.Poster;

  return React.createElement('article', {
    'data-id' : mv.imdbID,
    alt : `영화 선택 : ${mv.Title}`,
    class : "center-wrap-column",
    onclick: getID
  },
  [
    React.createElement('img', { 
      src: poster,
      class : "simple",
      alt : `${mv.Title}의 포스터`,
      onerror: event => {
        event.target.src = "./img/no.png"
      },
      onclick: () => {
        document.querySelector('.bottom-loading').style.display = 'flex';
      }
      
    }),
    React.createElement('span', {
      class : "title",
      alt : `영화 제목 : ${mv.Title}`
    }, mv.Title),
    React.createElement('div', {
      class : `${mv.Type}`
    },[
      `${mv.Type}`
    ])
  ])
}

// article 
const getID = async e => { 
  removeSelect();
  e = e.target
  if (e.tagName !== 'ARTICLE') e = e.parentElement;
  console.log(e.dataset.id);
  e.classList.add('select');
  const id = e.dataset.id;

  // movies 의 기존 데이터에 데이터를 추가한다
  // 기존 데이터에 추가하는 이유는 기존 데이터를 유지하면서 새로운 데이터를 추가하기 위해서이다

  movieStore.movies.forEach(async movie => {
    if (movie.imdbID === id) {
      console.log(movie);
      movie = await deepInfo(id);
      transmission(movie);
    }
  });
  
};


const removeSelect = ()=> {
  document.querySelectorAll('section.list-wrap article').forEach( el => { el.classList.remove('select') } );
  // 화살표 함수를 중괄호로 묶으면 리턴 값 없다
  // All 로 해야 리스트로 반환
}


export {naFilter};