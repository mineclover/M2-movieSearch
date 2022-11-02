import {React} from './simpleReact.js';

const sampleStore = new React.Store({
  count: 0,
  message: ''
})
const movieStore = new React.Store({
  movies: []
})

export {sampleStore , movieStore }