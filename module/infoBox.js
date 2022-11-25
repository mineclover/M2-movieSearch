import {sampleStore , movieStore , bottomStore} from './data.js';
import {React} from './simpleReact.js';
import { pageNavBox } from './pageNavigation.js';
// 상세 페이지


export class infoBox extends React.Component {
  constructor(props) {
    super(props)
    bottomStore.subscribe('imdbID', () => {
      this.update()
    })
  }
  render() {
    return React.createElement('section', {
      class : 'info-box center-wrap-column',
    },
    [
      React.createElement(pageNavBox),

      React.createElement(BoxLayer),
      React.createElement(Loading),
  ])
  }
}




class BoxLayer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'center-wrap-column',
    }, [React.createElement(left) , React.createElement(right) ])
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    const component = React.createElement('div', {
      class : 'bottom-loading',
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

class left extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'left center-wrap-column',
    }, [ 
      React.createElement(leftImg),
      
    ])
  }
}
class leftImg extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('img', {
      class : 'infoImg',
      onerror: event => {
        event.target.src = "./img/no.png"
      },
      onload : () => {
        document.querySelector('.bottom-loading').style.display = 'none'
      },
      src : `${bottomStore.Poster}`
    })
  }
}

class leftTime extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'tag',
      
    }, `${bottomStore.Runtime}`)
  }
}



class right extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'right center-wrap-column',
    }, [React.createElement(rightTop) , React.createElement(rightBottom)])
  }
}

const titleList = [["Genre", "장르"],["Actors" , "출연진"]];
class rightTop extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('section', {
      class : 'right-top',
    }, [React.createElement(infoTitle),...titleList.map(optionTag),React.createElement(infoYear)])
  }
}


class infoTitle extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'title',
    }, [`${bottomStore.Title}`])
  }
}

class infoYear extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'year',
    }, `${bottomStore.Year}`)
  }
}


class rightBottom extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('section', {
      class : 'right-bottom',
    }, [...optionList.map(optionTag), React.createElement(infoPlot)])
  }
}

const optionList = [["Released" , "출시일"] , ["Runtime", "영상 시간"] , ["Language", "언어"] , ["BoxOffice", "박스 오피스"]];

const optionTag = name => { 
  return React.createElement('div', {
    class : 'tag',
    ALT : `${name[1]}`
  },[`${name[1]} : `, bottomStore[`${name[0]}`]]);
}


class infoPlot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'plot',
    },`${bottomStore.Plot}`)
  }
}
