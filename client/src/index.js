/** using REDUX with REACT: 
  npm i -s redux react-redux redux-thunk redux-devtools-extension*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './styles/index.scss';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux'; // "supra component" à notre "App" qui prend le store en props
import thunk from 'redux-thunk';// Permet de faire des req asynchrones avec redux (voir:https://riptutorial.com/redux/example/12005/redux-thunk--basics)...
import rootReducer from './reducers'; // Il va chercher l'index.js dans ce dossier par defaut
import { getAllOffers } from './actions/offers.actions';

// dev tools
import {composeWithDevTools} from 'redux-devtools-extension'; // A EFFACER DES QU'ON PASSE EN PROD!!!!!!!!!!!!!!!!!
// import { getPosts } from './actions/post.actions';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getAllOffers());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
