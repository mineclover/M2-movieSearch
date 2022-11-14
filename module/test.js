import {React} from './simpleReact.js';
import {sampleStore , movieStore ,transmission, bottomStore , searchForm } from './data.js';



// 테스트 사이드
export async function getMovies(title,page=1) {
  const s = `&s=${title}`;
  const y = `&y=${searchForm.year}`;
  const p = `&page=${page}`;
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
    searchForm.totalResult = totalResults;

    return {
      movies
    };
  }
  return json;
}










async function searchControl(key) {
  const res = await getMovies(searchForm.inputText , key);
  console.log('얍');
  console.log(res);
  let keyList = Object.keys(res);
  if (keyList.includes("Error")) {
    console.log("에러");
    return res;
  }
  else{
    console.log('맞게 돌려보냄');
    console.log(res);
    return res.movies;
  }  
}

const post = async (toggle) => {
  console.log("toggle");
  console.log(typeof toggle);
  if(typeof toggle != 'object' && toggle !== undefined){
    searchForm.page = toggle;
  }

  document.querySelector('.list-loading').style.display = "flex"
  let temp = [];

  for (let i = 0 ; i < searchForm.pageUnit / 10 ; i += 1) {
    temp.push(await searchControl(searchForm.page + i)); 
    if(temp[i]["Error"]){
      console.log("에러있음");
      errorMsg(temp[i].Error);
    }
    
  }

  searchForm.page += Math.floor(searchForm.pageUnit / 10) - 1;
  console.log("...temp");
  console.log(temp.flat());
  //movieStore.movies = await Promise.all(...temp);
  if ( searchForm.reset === true ) {
    movieStore.movies = [...movieStore.movies, ...temp.flat()];
    searchForm.reset = false;
  }
  else {
    movieStore.movies = temp.flat();
  }
  document.querySelector('.list-loading').style.display = "none"
}


let Timeout01, Timeout02;
const errorMsg = (msg) => {
  clearTimeout(Timeout01);
  clearTimeout(Timeout02);
  document.querySelector("section.error-box").classList.remove("delect");
  document.querySelector("section.error-box").classList.remove("active");
  document.querySelector("section.error-box").innerHTML = `Error : ${msg}`;
  document.querySelector("section.error-box").classList.add("active");
  
  console.log(msg);
  Timeout01 = setTimeout(()=>{
    document.querySelector("section.error-box").classList.add("delect");
    
    Timeout02 = setTimeout(()=>{
      document.querySelector("section.error-box").classList.remove("active");
      document.querySelector("section.error-box").classList.remove("delect");
    },3000);
  },3000);
}




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
      },
      onload:e => {
        //console.log(e.target);
        e.target.style.display = "block";
      },
    }),
    React.createElement('span', {
      class : "title",
      alt : `영화 제목 : ${mv.Title}`
    }, mv.Title),
    React.createElement('div', {
      class : `${mv.Type}`
    },[
      //`${mv.Type}`
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
    if (id == "undefined") {
      errorMsg("영화 정보가 없습니다");
    };
    if (movie.imdbID === id) {
      console.log(movie);
      movie = await deepInfo(id);
      transmission(movie);
    }
  });
  
};
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



const removeSelect = ()=> {
  document.querySelectorAll('section.list-wrap article').forEach( el => { el.classList.remove('select') } );
  // 선택된 영화 해제하는 기능
  // 화살표 함수를 중괄호로 묶으면 리턴 값 없다
  // All 로 해야 리스트로 반환
}


export {naFilter , post , errorMsg , searchControl };