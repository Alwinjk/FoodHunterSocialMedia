import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Person, VpnKey, Lock } from '@material-ui/icons';
import img1 from '../../public/images/logo.png';

import './Login.css';


const LoginApiReq = async (userCredentials) => {
    try {
        const res = await axios.post('/login', userCredentials);
        return res.data;
    } catch (err) {
        console.log("Login request error : " + err);
    }

};

export default function Login({ setToken }) {

    // useRef instead of useState
    const email = useRef();
    const password = useRef();
    const [userdata, setUserData] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const userData = await LoginApiReq({ email: email.current.value, password: password.current.value });
            const _id = userData.user._id;
            sessionStorage.setItem('_id', JSON.stringify(_id));

            const token = userData.token;
            setToken(token);
            setUserData(userData);
        } catch (err) {
            console.log("Log in error", err);

        }

    }

    const logInErrorMessage = (
        <div>E-mail or Password is wrong</div>
    );

    return (
        <>
            <div className="bg-image">
                <section className="login py-0 ">
                    <nav className="navbar navbar-light ">
                        <div className="container p-0 ml-1">
                            <a className="navbar-brand" href="#">
                                <img src={img1} alt="" width="60" height="60" />
                            </a>
                        </div>
                    </nav>

                    <div className="container">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="col-lg-3 p-5">

                                    </div>
                                    <div className="col-lg-9 ">
                                        <div className="text">
                                            <h1>FoodHunter</h1>
                                            <h3>Share Anything </h3>
                                            <h2>explore our new features and ready to share and learn more about food </h2>
                                            <div className="btn-row">
                                                <div className="offset-1 col-lg-10 py-5 pt-5">
                                                    <button type="submit" className="btn4">LEARN MORE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5 text-center py-5 bg-white rounded ">
                                    <Lock color="secondary" fontSize="large" />

                                    <div className="signin">
                                        <h1>LOG IN</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-5">
                                                <Person color="action" />
                                                <input type="text" className="inp px-3" placeholder="E-mail" ref={email} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-2">
                                                <VpnKey color="action" />
                                                <input type="password" className="inp px-3" placeholder="Password" ref={password} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-2">
                                                <button type="submit"
                                                    className="btn2"

                                                >
                                                    Log In
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-2">
                                                {/* <button className="btn1">Create New Account</button> */}
                                                <a className="btn1" href="/signup">Sign up</a><br></br>

                                            </div>
                                            <div className="offset-1 col-lg-10 py-3 pt-2">

                                                <a className="btn1" href="/signup">Forgot Password</a>
                                            </div>
                                        </div>
                                    </form>
                                    {userdata === undefined || "" || null ? logInErrorMessage : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

Login.prototype = {
    setToken: PropTypes.func.isRequired
}