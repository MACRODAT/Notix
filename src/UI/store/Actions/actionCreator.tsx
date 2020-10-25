import type {user} from '../core/core';
import * as Actions from './actionTypes';

export const getLogin = () => {};

export const setLogin = (id : any, name : any, password) => {
    return {
        type : Actions.SET_LOGIN,
        payload : {
            id : id,
            name : name,
            password : password,
        }
    };
}

export const logout = () => {
    return {
        type : Actions.LOGOUT,
        payload : {
            
        }
    };
}