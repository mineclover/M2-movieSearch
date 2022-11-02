import {React} from './module/simpleReact.js';
import {HelloMessage} from './module/Hello.js';
import {MovieSearch,MovieList} from './module/movieSearch.js';
import {sampleStore , movieStore } from './module/data.js';
import { inputBox } from './module/inputBox.js';

// 스토어 정의!

// Simple React Library!

// 컴포넌트 정의!
class App extends React.Component {
  constructor(props) {
    super(props)
    sampleStore.message = 'A'
  }
  render() {
    return React.createElement(
      'div',
      {
        class : 'center'
      },
      [
        React.createElement(inputBox),
        React.createElement(HelloMessage),
        React.createElement(MovieSearch),
        React.createElement(MovieList)
      ]
    )
  }
}



// 애플리케이션 렌더링
// <div id="root"></div>
const root = React.createRoot(document.querySelector('body'))
root.render(React.createElement(App, { message: 'Simple React' }))


