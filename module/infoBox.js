import {sampleStore , movieStore , bottomStore} from './data.js';
import {React} from './simpleReact.js';

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
      onclick: event => {
        console.log('눌림')
      },
    },
    [
      `Hello?!`,
      React.createElement(boxLayer),
      React.createElement(Loading),
  ])
  }
}
class boxLayer extends React.Component {
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
      class : 'run-time',
      
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


class rightTop extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('section', {
      class : 'right-top',
    }, [React.createElement(infoTitle),React.createElement(infoYear)])
  }
}


class infoTitle extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'title',
    }, [`${bottomStore.Title}`,React.createElement(leftTime)])
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
    }, [React.createElement(infoPlot)])
  }
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
