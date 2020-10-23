import React, { useState, useEffect } from 'react';
import * as client from '../Blockchain/client';
import * as clientapi from '../Blockchain/blockchain';


const electron = window.require('electron');
// const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;
 
let ifot;
// ipcRenderer.invoke('getApiVersion', null);
// ipcRenderer.on('getApiVersionResponse',  (event, args) => {
//     ifot = args;
//     console.log(ifot);

// }); // 'just something');



// ipcRenderer.send('synchronous-message')


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
    return (<>
        <h1>
            MUSWADA APP
        </h1>
        <h2>API {version}</h2>
    </>)
};

export default Home;