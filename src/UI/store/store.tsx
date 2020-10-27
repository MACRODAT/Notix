import { createStore, applyMiddleware } from 'redux';
import {user} from './core/core';
import * as ActionTypes from './Actions/actionTypes';
import * as Actions from './Actions/actionCreator';
import sessionReducer from './reducers/sessionReducer';
import APIMiddleware from './reducers/apiMiddleware';

// applyMiddleware(forbiddenWordsMiddleware, APIInsertion),

const store = createStore(
                    sessionReducer,
                    applyMiddleware(APIMiddleware)
            );

// store.dispatch({type :});
export default store;