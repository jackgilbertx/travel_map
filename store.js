import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { markerReducer } from './reducers/markerReducer';

const reducer = combineReducers({ markers: markerReducer });

// const initialState = {
//   markers: [
//     {
//       id: 1,
//       coords: {
//         lat: 59.955413,
//         lng: 30.337844,
//       },
//       comments: '',
//       dateVisited: '',
//       photos: [],
//     },
//     {
//       id: 2,
//       coords: {
//         lat: 20.955413,
//         lng: 30.337844,
//       },
//       comments: '',
//       dateVisited: '',
//       photos: [],
//     },
//     {
//       id: 3,
//       coords: {
//         lat: 10.955413,
//         lng: 30.337844,
//       },
//       comments: '',
//       dateVisited: '',
//       photos: [],
//     },
//   ],
// };

const middleware = [thunk];

const store = createStore(
  reducer,
//   initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
