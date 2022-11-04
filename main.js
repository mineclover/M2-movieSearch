import {React} from './module/simpleReact.js';
import { infoBox } from './module/infoBox.js';
import { MovieListWrap } from './module/movieSearch.js';
import {sampleStore , movieStore } from './module/data.js';
import { HeaderArea , SearchBar } from './module/SearchBar.js';

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
      'body-root',
      {
        class : 'center-wrap-column'
      },
      [
        
        React.createElement(MovieListWrap),
        // React.createElement(SearchBar),
        // React.createElement(infoBox),
        React.createElement(HeaderArea),
      ]
    )
  }
}



// 애플리케이션 렌더링
// <div id="root"></div>
const root = React.createRoot(document.querySelector('body'))
root.render(React.createElement(App, { message: 'Simple React' }))




