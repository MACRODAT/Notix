import React from 'react';
import ReactDOM from 'react-dom';

// entry point
import App from './app';

import store from './UI/store/store';
import {Provider} from 'react-redux';
    
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.querySelector('#root'))