import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Person, Lock } from '@material-ui/icons';
import img1 from '../../public/images/logo.png';

import '../login/Login.css';

export default function NewPassword() {

    // useRef instead of useState
    const password = useRef();
    const confirmPassword = useRef();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { token } = useParams();

    const handleSubmit = async e => {
        e.preventDefault();
        const currentPassword = password.current.value;
        const currentConfirmPassword = confirmPassword.current.value;
        if (currentPassword === currentConfirmPassword) {

            await axios.post(`/reset-password/${token}`, { password: currentPassword })
                .then(res => {
                    setSuccessMsg(res.data.message)
                    setErrorMsg("");
                }).catch(err => {
                    setErrorMsg("Something went wrong, not able to reset your password")
                })

        } else {
            setErrorMsg("Password does not match!");
            setSuccessMsg("");
        }


    }

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

                    <div className="container p-0">
                        <div className="col mx-3">
                            <div className="row mx-5">
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

                                <div className="col-lg-5 pt-5 pb-5 text-center  bg-white rounded ">
                                    <Lock color="secondary" fontSize="large" />

                                    <div className="signin">
                                        <h1>Password Reset</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-5">
                                                <Person color="action" />
                                                <input type="text" className="inp px-3" placeholder="New password" ref={password} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-5">
                                                <Person color="action" />
                                                <input type="text" className="inp px-3" placeholder="Confirm password" ref={confirmPassword} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="offset-1 col-lg-10 py-3 pt-2">
                                                <button type="submit"
                                                    className="btn2"

                                                >
                                                    Set New Password
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{ color: "green" }}>{successMsg}</div>
                                        <div style={{ color: "red" }}>{errorMsg}</div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
