import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';

export class MovieSearch extends React.Component {
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