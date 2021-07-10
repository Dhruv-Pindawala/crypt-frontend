import React from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from './login';

const Register = (props) => {
    return (
        <div className='loginContainer'>
            <div className='inner'>
                <div className='logo'>CRYPT</div>
                <div className='title'>Sign up</div>
                    <AuthForm />
                <div className='switchOption'>
                    Don't have an account yet? <Link to='/login'>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
