import Axios, { AxiosResponse } from 'axios';
import globals from '../UI/helpers/globals';
import * as prv from './apiData.ignore';

const getData = () => {
    // fetch the data from the API
    let config = {
        headers : prv.token,
        'Content-Type' : 'application/json',
    }
    console.log('sending data');
    Axios.get(globals.bAPI, config).then(
        (res : AxiosResponse) => {
            // handle the reesponse !
            console.log(res.data);
        }
    )
    console.log('sent data. response ....')
}


export {
    getData,
}