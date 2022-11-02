import {React} from './module/simpleReact.js';
import { infoBox } from './module/infoBox.js';
import { MovieList} from './module/movieSearch.js';
import {sampleStore , movieStore } from './module/data.js';
import { SearchBox , SearchBar } from './module/SearchBar.js';

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
        
        React.createElement(SearchBox),
        React.createElement(MovieList),
        React.createElement(SearchBar),
        React.createElement(infoBox),
      ]
    )
  }
}



// 애플리케이션 렌더링
// <div id="root"></div>
const root = React.createRoot(document.querySelector('body'))
root.render(React.createElement(App, { message: 'Simple React' }))


