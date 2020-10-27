import React, { useState, useEffect } from 'react';
import * as client from '../Blockchain/client';
import * as clientapi from '../Blockchain/blockchain';
import { Button } from 'reactstrap';
import {ipcRenderer} from '../appRuntime';

// const fs = remote.require('fs');
 
let ifot;


const Home = (props, state) => {

    const [version, setVersion ] = useState('');
    ipcRenderer.on('getApiVersionResponse', (event, arg) => {
        setVersion(arg);
    });
    useEffect(() => {
        console.log('called')
    }, [version])
    ipcRenderer.send('getApiVersion', 'ping')
    var data = client.getData()

    const pushTransaction = () => 
    {
        ipcRenderer.send('pushTransaction', {
            sender : 10229,
            data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
            signature : 'RND SIG',
        });
    }

    return (<>
                <h1>
                    MUSWADA APP
                </h1>
                <h2>API {version}</h2>
                <Button onClick={pushTransaction}>add transaction</Button>
            </>)
};

export default Home;