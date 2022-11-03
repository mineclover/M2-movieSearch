import {sampleStore , movieStore } from './data.js';
import {React} from './simpleReact.js';

// 상세 페이지


export class infoBox extends React.Component {
  constructor(props) {
    super(props)
    sampleStore.subscribe('message', () => {
      this.update()
    })
  }
  render() {
    return React.createElement('h1', {
      onclick: event => {
        // 대충 sampleStore.message 바꾸는 명령어
      }
    }, `Hello ${sampleStore.message}?!`)
  }
}