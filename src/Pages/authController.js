import React, {useEffect, useState, useContext} from 'react';
import Loader from '../components/loader';

const AuthController = (props) => {
    const [checking, setChecking] = useState(true);

    const checkAuthState = () => {};

    useEffect(() => {
        checkAuthState();
    }, []);

    return <div className='authContainer'>{checking ? <Loader /> : props.children}</div>;
};

export default AuthController;
