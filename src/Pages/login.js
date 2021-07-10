import React from 'react';
import eyeopen from '../assets/eyeopen.png';
import eyeclose from '../assets/eyeclose.png';
import google from '../assets/google.png';
import twitter from '../assets/twitter.png';
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
                        <input className='input-field' placeholder='Password' type='password' autoComplete='new-password' />
                        <img src={eyeopen} />
                        <img src={eyeclose} />
                    </div>
                    <div className='flex justify-end'>
                        <Link to='/'>Forgot Password</Link>
                    </div>
                    <button type='submit'>Login</button>
                </form>
                <div className='grid grid-2 grid-gap-2'>
                    <div className='socialButton'>
                        <img src={twitter} /> <span>Twitter</span>
                    </div>
                    <div className='socialButton'>
                        <img src = {google} /> <span>Google</span>
                    </div>
                </div>
                <div className='switchOption'>
                    Don't have an account yet? <b>Sign up</b>
                </div>
            </div>
        </div>
    )
};

export default Login;