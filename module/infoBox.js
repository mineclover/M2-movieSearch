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
    }, `Hello?!`)
  }
}
class right extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('div', {
      class : 'right center-wrap-column',
    }, [React.createElement(rightSection) , React.createElement(rightSection) ])
  }
}


class rightSection extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('section', {
      class : 'simple-top',
    }, `simple top`)
  }
}

class infoTitle extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement('h1', {
      class : 'title',
    }, `Hello?!`)
  }
}