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
      }
    },
    [`Hello?!`,
    React.createElement(boxLayer)   
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

class left extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'left center-wrap-column',
    }, [ 
      React.createElement(leftImg),
      React.createElement(leftTime)
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
    }, [React.createElement(rightTop) , React.createElement(rightBottom) ])
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
    }, `${bottomStore.Title}`)
  }
}

class infoYear extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'Year',
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
      class : 'Plot',
    },`${bottomStore.Plot}`)
  }
}
