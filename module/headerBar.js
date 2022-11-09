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
        onclick : searchFoucs
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

const searchFoucs = e => { 

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
      onchange: async event => {
        let { movies } = await getMovies(event.target.value);
        movieStore.movies = movies;
      },
      class : 'search-input'
      
    })
  }
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
            class : "search-option"

          },
          [10,20,30].map( num => {
            return React.createElement('option',{class: 'item', value: `${num}` , alt : `${num}`},`${num}`)
          }),
        ),
        React.createElement('label',{class: 'search-option-label', for:"search-count" , alt : `검색 결과 수`},'페이지 수')
        

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
            
            class : "search-option"

          },
          ["movie", "series", "episode"].map( name => {
            return React.createElement('option',{class: 'item', value: `${name}` , alt : `${name}`},`${name}`)
          }),
        ),
        React.createElement('label',{class: 'search-option-label', alt : `영화 타입`},'영화 타입')
        

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
            
            class : "search-option"

          },
          years().map( name => {
            return React.createElement('option',{class: 'item', value: `${name}` , alt : `${name}`},`${name}`)
          }),
        ),
        React.createElement('label',{class: 'search-option-label', alt : `개봉연도 선택`},'개봉연도 선택')
        

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
            
            class : "search-option"

          },
          '임시 텍스트',
        ),
        React.createElement('label',{class: 'search-option-label', alt : `개봉연도 선택`},'개봉연도 선택')
        

      ]
    )
  }
}



