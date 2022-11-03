import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';

// 검색 엔진 + 렌더링까지

export class MovieListWrap extends React.Component {
  constructor() {
    super()
    movieStore.subscribe('movies', () => {
      this.update()
    })
  }
  render() {
    return React.createElement(
      'main', 
      {
        class : 'center-wrap-column'
      }, 
      [
        React.createElement(MovieList)
      ]
    )
  }
}
document.getElementById
class MovieList extends React.Component {
  constructor() {
    super()
    movieStore.subscribe('movies', () => {
      this.update()
    })
  }
  render() {
    return React.createElement(
      'section', 
      {
        class : 'list-wrap'
      }, 
      movieStore.movies.map(movie => {
        return React.createElement('article', {
          'data-id' : movie.Title
        },
        [
          React.createElement('img', { src: movie.Poster }),
          React.createElement('h3', null, movie.Title)
        ])
      })
    )
  }
}