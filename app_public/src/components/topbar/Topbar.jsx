import { connect } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './topbar.css';
import img1 from '../../public/images/fast-food.png';
import M from 'materialize-css';

const Topbar = ({ user }) => {

    return (
        <>
            <div className="function-nav">
                <div className="nav-true">
                    <div className="hover-top">
                        <a className="navbar-brand" href="#">
                            <img src={img1} alt="" width="70" height="70" />
                            <p>FoodHunter</p>

                        </a>
                        <Link className=" auto-link" to='/dashboard'>FoodHunter</Link>
                        <Link className=" auto-link" aria-current="page" to={{ pathname: `profile/${user._id}` }}>
                            Profile
                        </Link>
                        <Link className=" auto-link" to='/dashboard'>About Us</Link>
                        <Link className=" auto-link" to='/dashboard'>Contact</Link>
                        <Link className=" auto-link" to='/dashboard'>Logout</Link>
                    </div>
                </div>
            </div>
        </>

    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Topbar);


