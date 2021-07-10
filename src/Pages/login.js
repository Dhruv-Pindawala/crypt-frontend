import React from 'react';
import eyeopen from '../assets/eyeopen.png';
import eyeclose from '../assets/eyeclose.png';
import {Link} from 'react-router-dom';

const Login = (props) => {
    return (
        <div className='loginContainer'>
            <div className='inner'>
                <div className='logo'>CRYPT</div>
                <div className='title'>Sign in</div>
                <form>
                    <input className='input-field' placeholder='Username' />
                    <div className='input-container'>
                        <input className='input-field' placeholder='Password' type='password' />
                        <img src={eyeopen} />
                        <img src={eyeclose} />
                    </div>
                    <div className='flex justify-end'>
                        <Link to='/'>Forgot Password</Link>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
};

export default Login;