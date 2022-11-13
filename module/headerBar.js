import {React} from './simpleReact.js';
import { movieStore , searchForm } from './data.js';
import {getMovies} from './test.js';




export class HeaderArea extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'header',
      {
        class : 'center-wrap-column',
      },
      [
        React.createElement(SearchBox),
        React.createElement(SearchBar),
        React.createElement(typeBar),
        React.createElement(YearBar),
        React.createElement(sumitButton),
        React.createElement(ErrorMsgBox),
      ]
    )
  }
}

export class ErrorMsgBox extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'section',
      {
        class : 'error-box',
      },
      "error"
    )
  }
}



export class SearchBox extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'div',
      {
        class : 'search-box',
      },
      [
        React.createElement(MovieSearch),
        
      ]
    )
  }
}



class MovieSearch extends React.Component {
  constructor() {
    super()
  }
  

  render() {
    return React.createElement('input', {
      placeholder: '영화 제목을 검색하세요.',
      onchange : e =>  {  searchForm.inputText = e.target.value; post() },
      class : 'search-input'
      
    })
  }
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

  document.querySelector('.list-loading').style.display = "flex"
  let temp = [];

  for (let i = 0 ; i < searchForm.pageUnit / 10 ; i += 1) {
    let gate = await searchControl(searchForm.page + i)
    if(gate["Error"]){
      console.log("에러있음");
      errorMsg(gate.Error);
      gate = undefined;
    }
    temp.push(gate); 
  }

  searchForm.page += Math.floor(searchForm.pageUnit / 10);
  console.log("...temp");
  console.log(temp.flat());
  //movieStore.movies = await Promise.all(...temp);
  movieStore.movies = temp.flat();
  console.log(movieStore.movies);
  document.querySelector('.list-loading').style.display = "none"
}

const errorMsg = (msg) => {
  document.querySelector("section.error-box").innerHTML = `Error : ${msg}`;
  document.querySelector("section.error-box").classList.add("active");
  
  console.log(msg);
  setTimeout(()=>{
    document.querySelector("section.error-box").classList.add("delect");
    
    setTimeout(()=>{
      document.querySelector("section.error-box").classList.remove("active");
      document.querySelector("section.error-box").classList.remove("delect");
    },3000);

  },3000);
}




class SearchBar extends React.Component {
  constructor() {
    super()
  }
  render() { 
    return React.createElement(
      'div',
      {class : 'search-option-box page'},
      [
        React.createElement(
          'select', 
          {
            name : "search-count",
            class : "search-option",
            onchange : e =>  {  searchForm.pageUnit = e.target.value }

          },
          [10,20,30].map( num => {
            return React.createElement('option',{class: 'item', value: `${num}` , alt : `${num}`},`${num}`)
          }),
        ),
        React.createElement('div',{class: 'search-option-label', for:"search-count" , alt : `검색 당 페이지 수`},' 검색 당 페이지 수')
        

      ]
    )
  }
}

class typeBar extends React.Component {
  constructor() {
    super()
  }
  render() { 
    return React.createElement(
      'div',
      {class : 'search-option-box'},
      [
        React.createElement(
          'select', 
          {
            class : "search-option",
            onchange : e =>  {  searchForm.type = e.target.value }

          },
          [
            React.createElement('option',{class: 'item', value: `` , alt : `ALL`},`ALL`),
          ...["movie", "series", "episode"].map( name => {
            return React.createElement('option',{class: 'item', value: `${name}` , alt : `${name}`},`${name}`)
          })
          ],
        ),
        React.createElement('div',{class: 'search-option-label', alt : `영화 타입`},'영화 타입')
        

      ]
    )
  }
}

const years = ()=>{
  let temp = [];
  let now = new Date();	// 현재 날짜 및 시간
  let year = now.getFullYear();	// 연도
  console.log(year);
  for (let i = year ; i > 1985 ; i--){
    temp.push(i);
  }
  return temp;
}
console.log(years());


class YearBar extends React.Component {
  constructor() {
    super()
  }
  render() { 
    return React.createElement(
      'div',
      {class : 'search-option-box'},
      [
        React.createElement(
          'select', 
          {
            
            class : "search-option",
            onchange : e =>  {  searchForm.year = e.target.value }

          },
          [React.createElement('option',{class: 'item', value: `` , alt : `ALL`},`ALL`),
          ...years().map( name => {
            return React.createElement('option',{class: 'item', value: `${name}` , alt : `${name}`},`${name}`)
          })],
        ),
        React.createElement('div',{class: 'search-option-label', alt : `개봉연도 선택`},'개봉연도 선택')
        

      ]
    )
  }
}

class sumitButton extends React.Component {
  constructor() {
    super()
  }
  render() { 
    return React.createElement(
      'div',
      {class : 'search-option-box'},
      [
        React.createElement(
          'div', 
          {
            
            class : "search-sumit",
            onchange : post,
          },
          '검색',
        ),
        React.createElement('div',{class: 'search-option-label', alt : `검색`},'검색')
        

      ]
    )
  }
}



