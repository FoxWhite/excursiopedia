import './styles/index.scss';
import App from './containers/App.js';
import React from 'react';
import { render } from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index.js'

import * as ac  from './helpers/Autocomplete.js'
main();

function main() {
    const store = createStore(rootReducer, {}, window.devToolsExtension ? window.devToolsExtension() : undefined);
    const app = document.createElement('div');
    document.body.appendChild(app);
    
    render(
        <Provider store={store}>
          <App/>
        </Provider>,
      app);    

}