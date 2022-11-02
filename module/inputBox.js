import {React} from './simpleReact.js';
import {sampleStore , movieStore } from './data.js';

export class inputBox extends React.Component {
  constructor() {
    super()
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'input', 
        {
          placeholder: '검색어를 입력하세요!',
          onchange: event => { sampleStore.message = event.target.value }
        }
      )
    )
  }

}

