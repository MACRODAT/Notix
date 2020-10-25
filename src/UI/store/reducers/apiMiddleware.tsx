import type {user} from '../core/core';
import * as ActionTypes from '../Actions/actionTypes';
import * as Actions from '../Actions/actionCreator';
import session from '../../storage/localStorage';
import Axios, { AxiosResponse } from 'axios';
import globals from '../../helpers/globals';


function APIMiddleware({getState, dispatch}) {
    return function(next){
        return function(action)
        {
            console.log(action);
            if (action.type === ActionTypes.LOGOUT)
            {
                // request logout from backend
                const HEADERS = {
                    'Content-Type' : 'application/json'
                }

                Axios.post(globals.baseURL + '/' + globals.userURL + '/logout').then (function( res : AxiosResponse) {
                    // console.log(res.data);
                    action.succes = true;
                    
                    // redirect to register successful page
                    const nextAction = next(action);
                    //read next state
                    const state = getState();
                    // return the next action
                    return nextAction;
                });

            }

            if (action.type === ActionTypes.SET_LOGIN)
            {
                // some checks TODO
                const HEADERS = {
                    'Content-Type' : 'application/json'
                }
                
                let user : user = {
                    userID : action.payload.id,
                    name : action.payload.name,
                    password : action.payload.password,
                };

                Axios.post(globals.baseURL + '/' + globals.userURL + '/login', user).then (function( res : AxiosResponse) {
                    // console.log(res.data);
                    if (res.status == 200)
                    {   
                        action.data = {
                            user : user,
                        } 
                        // redirect to register successful page
                        const nextAction = next(action);
                        //read next state
                        const state = getState();
                        // return the next action
                        return nextAction;
                    }
                    if (res.status == 430)
                    {   
                        // redirect to register successfull page
                        action.data = {
                            user : null,
                        };
                        // redirect to register successful page
                        const nextAction = next(action);
                        //read next state
                        const state = getState();
                        // return the next action
                        return nextAction;
                    }
                }).catch(error => {
                    // redirect to register successfull page
                    console.log(error);
                    action.data = {
                        user : null,
                    };
                    // redirect to register successful page
                    const nextAction = next(action);
                    //read next state
                    const state = getState();
                    // return the next action
                    return nextAction;
                });
            }
        }
    }
}

export default APIMiddleware;