import React from 'react';
import axios from 'axios';

const logout = (props) => {
    let request = axios.get('/api/logout')
        .then(() => {
            setTimeout(() => {
                props.history.push('/login/');
            }, 2000);
        });
    return (
        <div className="container">
            <div className="box logout">
                Sorry to see you go :(
            </div>
        </div>
    )
}

export default logout;