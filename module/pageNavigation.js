import {React} from './simpleReact.js';
import { searchForm } from './data.js';
import { naFilter, post} from './test.js';

// 검색 엔진 + 렌더링까지

export class pageNavBox extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'nav', 
      {
        class : 'nav-wrap',
        
      }, 
      [
        
        React.createElement(StartNumber),
        React.createElement(PageNumber),
        //React.createElement(PageState)
      ]
    )
  }
}


class PageNumber extends React.Component {
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
        class : '.center-wrap-column glass',
        
      }, 
      [
        ...previous2page(searchForm.page).map(pageButton),
        React.createElement(CursorNumber),
        ...page2Next(searchForm.page).map(pageButton),
      ]
    )
  }
}
class PageState extends React.Component {
  constructor() {
    super()
    searchForm.subscribe('totalResult', () => {
      this.update()
    })

  }
  render() {
    return React.createElement(
      'nav', 
      {
        class : 'center-wrap-column',
        
      }, 
      [
        React.createElement('div', {class : ''}, `전체 결과 수 : ${searchForm.totalResult}`),
        React.createElement('div', {class : ''}, `최대 페이지 수 : ${Math.ceil(searchForm.totalResult / 10)}`),
        
      ]
    )
  }
}



const previous2page = page => {
  return page > 5 ? first2page(page) : zero2page(page);
}



const page2Next = page => {
  const temp = [];
  const max = Math.ceil(searchForm.totalResult / 10);
  let plus = max < page + 5 ? max - page : 5;
  for ( let i = page + 1 ; i <= page + plus ; i+= 1){
    temp.push(`${i}`);
  }

  return temp;
}

const zero2page = page => {
  const temp = [];
  for ( let i = 1 ; i < page ; i+= 1){
    temp.push(`${i}`);
  }
  return temp;
}

const first2page = page => {
  let temp = ["1<"];
  for ( let i = page - 4 ; i < page ; i+= 1){
    temp.push(`${i}`);
  }
  return temp;
}

const pageButton = num => {
  return React.createElement(
    'span', 
    {
      class : 'number',
      onclick : ()=> {

        searchForm.startPage = Number.parseInt(num,10);
        post(Number.parseInt(num,10));

      }
    }, 
    `${num}`,
  )
}

class StartNumber extends React.Component {
  constructor() {
    super()
    searchForm.subscribe('startPage', () => {
      this.update()
    })
  }
  render() {
    return React.createElement(
      'div', 
      {
        class : 'start-wrap neumophism',
        tabindex : 6,
        onfocus : event => { 
          let temp = event.target.querySelector(".start-input");
          temp.classList.add("focus");
          temp.focus();
        },
        
      }, 
      [
        `start page : ${searchForm.startPage}`,
        React.createElement(StartNumberInput)
      ]
    )
  }
}

class StartNumberInput extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'input', 
      {
        class : 'start-input',
        placeholder : "입력",

        onchange : event => {
          searchForm.startPage = event.target.value;
          searchForm.page = event.target.value;
          event.target.classList.remove("focus");
          
        },
        onblur : event => {
          setTimeout(event.target.classList.remove("focus"));
        },

      }, 
      [
        `start page : ${searchForm.startPage}`,
      ]
    )
  }
}






class CursorNumber extends React.Component {
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