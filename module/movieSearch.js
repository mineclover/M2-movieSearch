import {React} from './simpleReact.js';
import { movieStore , searchForm } from './data.js';
import { post } from './test.js';



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

const fn = _.throttle( event=>{
  let scrollSpace = event.target.scrollHeight - event.target.clientHeight;
  searchForm.beforeTop = scrollSpace - 100;
  console.log("스크롤 중");
  if ( event.target.scrollTop === scrollSpace ) {
    searchForm.reset = true;
    post(searchForm.page + 1).then(anchor);
    
  };
},1000);



const anchor = () => {
  console.log("실행됨")
  console.log(searchForm.beforeTop);
  let target = document.querySelector("section.list-wrap");
  target.scrollTo(0,searchForm.beforeTop);
};



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
        //onload : resetObserve(),
        onscroll : fn,
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