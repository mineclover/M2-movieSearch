import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';



import { naFilter} from './test.js';

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
        class : 'center-wrap-column',
        
      }, 
      [
        React.createElement(LoadingMovie),
        React.createElement(MovieList),
        
      ]
    )
  }
}

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
        class : 'list-wrap',
      }, 
      movieStore.movies.map(naFilter)
    )
  }
}

class LoadingMovie extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    const component = React.createElement('div', {
      class : 'list-loading',
    },
      {
        html : `
<div class='h-loader'>
  <svg viewBox="22 22 46 46">
    <circle cx="45" cy="45" r="20" stroke-width="6" stroke-dasharray="125" stroke-dashoffset="125px"></circle>
  </svg>
</div>`
    })
    return component;
  }
}