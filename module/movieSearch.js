import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';

// 검색 엔진 + 렌더링까지


export class MovieList extends React.Component {
  constructor() {
    super()
    movieStore.subscribe('movies', () => {
      this.update()
    })
  }
  render() {
    return React.createElement(
      'ul', 
      null, 
      movieStore.movies.map(movie => {
        return React.createElement('li', null, [
          React.createElement('img', { src: movie.Poster }),
          React.createElement('h3', null, movie.Title)
        ])
      })
    )
  }
}