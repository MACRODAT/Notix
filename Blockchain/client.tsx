import Axios, { AxiosResponse } from 'axios';
import globals from '../UI/helpers/globals';

const getData = (apiID, apiKey) => {
    // fetch the data from the API
    Axios.get(globals.bAPI).then(
        (res : AxiosResponse) => {
            // handle the reesponse !
            console.log(res.data);
        }
    )
}