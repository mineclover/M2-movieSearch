import {sampleStore , movieStore } from './data.js';
import {React} from './simpleReact.js';

export class HelloMessage extends React.Component {
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