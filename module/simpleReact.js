// Simple React Library!
const React = {
  createRoot: root => ({
    render: el => root.append(el)
  }),
  createElement(type, props, childNodes) {
    let el
    
    // 컴포넌트인 경우!
    if (typeof type === 'function') { // 컴포넌트 클래스 확인!

      console.log(type, typeof type);
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
            //const events = key.replace('on', '')
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
      Object.assign(this.state, state) // 원본 키 , 바꿀 벨류
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



export {React};



