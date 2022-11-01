// Simple React!
const React = {
  createRoot(root) {
    return {
      render(el) {
        root.append(el)
      }
    }
  },
  createElement(type, props, children) {
    const el = document.createElement(type)
  
    if (props) {
      Object.keys(props).forEach(key => {
        el[key] = props[key]
      })
    }
  
    if (children) {
      if (Array.isArray(children)) {
        children.forEach(child => {
          el.append(child)
        })
      } else {
        el.append(children)
      }
    }
  
    return el
  }
}


const fruits = ['Apple', 'Banana', 'Cherry']
const fruitEls = fruits.map(fruit => React.createElement('div', { className: 'item' }, fruit))
const containerEl = React.createElement(
  'div', 
  { 
    className: 'container', 
    onclick(event) {
      if (event.target.closest('.item')) {
        console.log(event.target.textContent)
      }
    }
  }, 
  fruitEls
)

const root = React.createRoot(document.querySelector('#root'))
root.render(containerEl)