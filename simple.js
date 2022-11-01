// Simple React Library!
const React = {
  createRoot: root => ({
    render: el => root.append(el)
  }),
  createElement(type, props, childNodes) {
    let el
    
    // 컴포넌트인 경우!
    if (typeof type === 'function') { // 컴포넌트 클래스 확인!
      const component = new type(props)
      el = component.render()
      component.el = el

    // 일반 요소인 경우!
    } else {
      el = document.createElement(type)
      if (props) {
        Object.keys(props).forEach(key => {
          // 이벤트 적용
          if (key.startsWith('on')) {
            const events = key.replace('on', '').toLowerCase()
            const [eventName, ...modifiers] = events.split('.')
            const options = modifiers.reduce((acc, cur) => {
              acc[cur] = true
              return acc
            }, {})
            el.addEventListener(eventName, props[key], options)
            return
          }
          // 속성 적용!
          el.setAttribute(key, props[key])
        })
      }
    }
  
    // 자식 요소가 포함된 경우!
    if (childNodes !== null && childNodes !== undefined) {
      Array.isArray(childNodes)
        ? el.append(...childNodes)
        : el.append(childNodes)

        console.log(el, typeof el);
    }
  
    return el
  },
  
  Component: class {
    constructor(props) {
      this.el = null
      this.props = props || {}
      this.state = {}
    }
    setState(state) {
      Object.assign(this.state, state) // 변경하나? 
      this.update()
    }
    update() {
      const parentEl = this.el.parentElement
      const newEl = this.render()
      parentEl.insertBefore(newEl, this.el)
      this.el.remove()
      this.el = newEl
    }
    render() {
      return //정의된 위치의 렌더러가 사용된다
    }
  },
  Store: class {
    constructor(state) {
      this.observers = {}
      this._initState(state)
    }
    _initState(state) {
      for (const key in state) {
        Object.defineProperty(this, key, {
          get: () => state[key],
          set: val => {
            state[key] = val
            this.observers[key]?.forEach(observer => observer(val))
          }
        })
      }
    }
    subscribe(key, fn) {
      Array.isArray(this.observers[key])
        ? this.observers[key].push(fn) // observers[key]가 배열이면 push
        : this.observers[key] = [fn] // observers[key]가 배열이 아니면, 직접 배열로 만들어줌
    }
  }
}


// 스토어 정의!
const sampleStore = new React.Store({
  count: 0,
  message: ''
})
const movieStore = new React.Store({
  movies: []
})


// 컴포넌트 정의!
class MovieSearch extends React.Component {
  constructor() {
    super()
  }
  async getMovies(title) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}`)
    const { Search } = await res.json()
    movieStore.movies = Search
  }
  render() {
    return React.createElement('input', {
      placeholder: '영화 제목을 검색하세요.',
      onchange: event => {
        this.getMovies(event.target.value)
      }
    })
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
      'ul', 
      null, 
      movieStore.movies.map(movie => {
        return React.createElement('li', null, [
          React.createElement('img', { src: movie.Poster }),
          React.createElement('h3', null, movie.Title)
        ])
      })
    )
  }
}
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



class HelloMessage extends React.Component {
  constructor(props) {
    super(props)
    sampleStore.subscribe('message', () => {
      this.update()
    })
  }
  render() {
    return React.createElement('h1', {
      onclick: event => {
        console.log(event.target)
      }
    }, `Hello ${sampleStore.message}?!`)
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




const objectName = {
  ClassName : class {
    constructor(props){
      this.propertyOne = '아무거나 사용할 것을 선언하거나';
      this.prop = props ?? 123; //'배열이면 인덱스, 객체면 키';
      const prototypeMethod = function(){ console.log('메서드를 넣거나') }; 
      //this.testStatic(props); // 실행하거나 1
      //document.querySelector('root').insertBefore('test', null); // 실행하거나 2
    }
  }
}

// 애플리케이션 렌더링
// <div id="root"></div>
const root = React.createRoot(document.querySelector('#root'))
root.render(React.createElement(App, { message: 'Simple React' }))

const test = new objectName.ClassName();


