import {React} from './module/simpleReact.js';
import {HelloMessage} from './module/Hello.js';
import {MovieSearch,MovieList} from './module/test.js';
import {sampleStore , movieStore } from './module/data.js';

// 스토어 정의!

// Simple React Library!

// 컴포넌트 정의!

class Anchor extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'a',
        {
          href: 'https://google.com',
          target: '_blank',
          onclick: event => {
            event.preventDefault()
          }
        },
        '구글로 이동'
      )
    )
  }
}
class Btn extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return React.createElement(
      'button',
      {
        'onclick.once': () => {
          sampleStore.count += 2
        }
      },
      '증가2'
    )
  }
}



class CountUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red'
    }
    sampleStore.subscribe('count', () => {
      if (sampleStore.count > 3) {
        this.setState({
          color: 'blue'
        })
      }
      this.update()
    })
  }
  render() {
    return React.createElement(
      'div',
      { style: `color: ${this.state.color};` }, 
      [
        React.createElement(
          'h1',
          null,
          sampleStore.count
        ),
        React.createElement(
          'button',
          { onclick: () => sampleStore.count += 1 },
          '증가1'
        )
      ]
    )
  }
}







class App extends React.Component {
  constructor(props) {
    super(props)
    sampleStore.message = 'A'
  }
  render() {
    return React.createElement(
      'div',
      {
        class : 'main'
      },
      [
        `${this.props.message} App!`,
        React.createElement(
          'div',
          null,
          React.createElement(
            'input', 
            {
              placeholder: '검색어를 입력하세요!',
              onchange: event => { sampleStore.message = event.target.value }
            }
          )
        ),
        React.createElement(HelloMessage),
        React.createElement(CountUp),
        React.createElement(Btn),
        React.createElement(Anchor),
        React.createElement(MovieSearch),
        React.createElement(MovieList)
      ]
    )
  }
}



// 애플리케이션 렌더링
// <div id="root"></div>
const root = React.createRoot(document.querySelector('#root'))
root.render(React.createElement(App, { message: 'Simple React' }))




