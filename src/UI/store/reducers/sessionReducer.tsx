import type {user, IState} from '../core/core';
import * as ActionTypes from '../Actions/actionTypes';
import * as Actions from '../Actions/actionCreator';
import session from '../../storage/localStorage';

const initState : IState = {
    user : new session(),
}

function sessionReducer(state = initState, action : any) {
    if (action.type === ActionTypes.SET_LOGIN)
    {
        if (action.data.user !== null)
        {
            // successful login from middleware,
            // engage in session creation
            var ses = new session();
            ses.login(action.data.user.userID, action.data.user.name, action.data.user.password);
            return Object.assign({}, state, {
                user : ses,
            })
        }
        else {
            // no login ?? let's tell the user !
            var noLogSession = (new session());
            noLogSession.genNoLoginData();
            console.log(noLogSession);
            return Object.assign({}, state,
               { user : noLogSession,}
            )
        }
    }
    if (action.type === ActionTypes.LOGOUT)
    {
        var noLogSession = (new session());
        noLogSession.genNoLoginData();
        state.user.signOut();
        return Object.assign({}, state,
                { user : noLogSession,}
             )
    }

    return state;
}

export default sessionReducer;