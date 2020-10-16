import type {user} from '../core/core';
import * as ActionTypes from '../Actions/actionTypes';
import * as Actions from '../Actions/actionCreator';
import session from '../../storage/localStorage';

const initState = {
    user : new session(),
}

function sessionReducer(state = initState, action) {
    if (action.type === ActionTypes.SET_LOGIN)
    {
        var session = new session();
        session.login(action.payload.id, action.payload.name, action.payload.password);
        return Object.assign({}, state, {
            user : session,
        })
    }

    return state;
}

export default sessionReducer;