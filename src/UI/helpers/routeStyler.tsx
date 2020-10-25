import React from 'react';

const spacerStyle = {
    margin : '5px',
    padding: '10px',
}

export const routeStyler = ({component : Component, ...rest}) => {
    return (<div style={spacerStyle}>
                <Component {...rest} />
            </div>);
}