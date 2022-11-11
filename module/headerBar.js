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
      ]
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


const post = async () => {
  let { movies } = await getMovies(searchForm.inputText);
  movieStore.movies = movies;
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
        React.createElement('div',{class: 'search-option-label', for:"search-count" , alt : `검색 결과 수`},'페이지 수')
        

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
          ["movie", "series", "episode"].map( name => {
            return React.createElement('option',{class: 'item', value: `${name}` , alt : `${name}`},`${name}`)
          }),
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
          years().map( name => {
            return React.createElement('option',{class: 'item', value: `${name}` , alt : `${name}`},`${name}`)
          }),
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


