import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';

// 검색창 

export class HeaderArea extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'header',
      {
        class : 'center-wrap-column'
      },
      [
        React.createElement(SearchBox)
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
        class : 'check'
      },
      [
        React.createElement(MovieSearch)]
    )
  }
}



class MovieSearch extends React.Component {
  constructor() {
    super()
  }
  async getMovies(title) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}`)
    
  
    const { Search } = await res.json()
    console.log(res);
    movieStore.movies = Search
  }
  render() {
    return React.createElement('input', {
      placeholder: '영화 제목을 검색하세요.',
      onchange: event => {
        this.getMovies(event.target.value)
      },
      class : ''
      
    })
  }
}


class MovieSearchs extends React.Component {
  constructor() {
    super()
  }
  async getMovies(title) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}`)
    const { Search } = await res.json()
    movieStore.movies = Search
  }
  render() {
    return React.createElement('input', {
      placeholder: '영화 제목을 검색하세요.',
      onchange: event => {
        this.getMovies(event.target.value)
      }
    })
  }
}

export class SearchBar extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'input', 
        {
          placeholder: '검색어를 입력하세요!',
          onchange: event => { sampleStore.message = event.target.value }
        }
      )
    )
  }

}

