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

const io = new IntersectionObserver((entry, observer)=>{
  console.log(entry[0].boundingClientRect.y);
  if (entry[0].boundingClientRect.y > 500 && entry[0].boundingClientRect.y < 2000) {
    searchForm.reset = true;
    post(searchForm.page + 1);
    io.disconnect(); // 옵저버 삭제
    resetObserve(); // 옵저버 생성
  }
  //나타날 때, 사라질 때 선언될 때 값이 옵저버에 저장되고 IntersectionObserver 콜백도 실행된다
	// 그러나 조건문을 걸어놨기 때문에 실행되진 않나?
  //entry 는 배열로 저장된다
  
},{threshold: 0});

function resetObserve(){
  if(io.entry){
    io.disconnect();
  };
  
  const lastEl = document.querySelector('.list-wrap')?.lastElementChild;
  console.log(lastEl);
  if ( lastEl !== undefined && lastEl !== null){
    io.observe(lastEl);
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
        onload : resetObserve(),
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