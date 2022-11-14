import {React} from './simpleReact.js';
import { searchForm } from './data.js';
import { naFilter} from './test.js';

// 검색 엔진 + 렌더링까지

export class pageNavBox extends React.Component {
  constructor() {
    super()
    searchForm.subscribe('page', () => {
      this.update()
    })
  }
  render() {
    return React.createElement(
      'nav', 
      {
        class : 'nav-wrap',
        
      }, 
      [
        React.createElement(pageNumber)
      ]
    )
  }
}

export class pageNumber extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'nav', 
      {
        class : 'number',
        
      }, 
      [
        ...previous2page(searchForm.page),
        React.createElement(cursorNumber),
        ...page2Next(searchForm.page)
      ]
    )
  }
}

const previous2page = page => {
  return page > 5 ? first2page(page) : zero2page(page);
}

const page2Next = page => {
  let temp = [];
  for ( let i = page + 1 ; i < page + 5 ; i+= 1){
    temp.push(`뒤${i}`);
  }
  return temp;
}

const zero2page = page => {
  let temp = [];
  for ( let i = 0 ; i < page ; i+= 1){
    temp.push(`앞${i}`);
  }
  return temp;
}

const first2page = page => {
  let temp = ["1..."];
  for ( let i = page - 4 ; i < page ; i+= 1){
    temp.push(`앞${i}`);
  }
  return temp;
}

export class cursorNumber extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'span', 
      {
        class : 'cursor-number',
        
      }, 
      [
        `${searchForm.page}`,
      ]
    )
  }
}