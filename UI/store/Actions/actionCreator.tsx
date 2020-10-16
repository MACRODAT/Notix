import type {user} from '../core/core';
import * as Actions from './actionTypes';

export const getLogin = () => {};

export const setLogin = (id, name) => {
    return {
        type : Actions.SET_LOGIN,
        payload : {
            id : id,
            name : name,
        }
    };
}