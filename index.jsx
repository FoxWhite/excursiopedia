import './styles/index.scss';
import App from './containers/App.js';
import React from 'react';
import { render } from 'react-dom';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index.js';
import persistState from 'redux-localstorage';

main();



function main() {
    const createPersistentStore = compose(
      persistState('users')
    )(createStore);

    const store = createPersistentStore(rootReducer, {}, window.devToolsExtension ? window.devToolsExtension() : undefined);
    const app = document.createElement('div');
    document.body.appendChild(app);
    
    render(
        <Provider store={store}>
          <App/>
        </Provider>,
      app);    

}

