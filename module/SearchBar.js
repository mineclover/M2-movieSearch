import {React} from './simpleReact.js';
import { movieStore } from './data.js';
import {getMovies} from './test.js';

// 검색창 

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


class MovieSearchs extends React.Component {
  constructor() {
    super()
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

class SearchBar extends React.Component {
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
          onchange: event => { sampleStore.count = event.target.value }
        }
      )
    )
  }

}

