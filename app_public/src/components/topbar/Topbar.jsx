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
                        <Link className=" auto-link" to='/dashboard'><i class="material-icons">house</i>FoodHunter</Link>
                        {/* <Link className=" auto-link" aria-current="page" to={{ pathname: `profile/${user._id}` }}><i class="material-icons">person</i>
                            Profile
                        </Link> */}
                        <Link className=" auto-link" aria-current="page" to={{ pathname: `profile/${user._id}` }}><i class="material-icons">person</i>
                            Profile
                        </Link>
                        <Link className=" auto-link" to='/dashboard'><i class="material-icons">emoji_people</i>About Us</Link>
                        <Link className=" auto-link" to='/dashboard'><i class="material-icons">contact_support</i>Contact</Link>
                        <Link className=" auto-link" to='/dashboard'><i class="material-icons">logout</i>Logout</Link>
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


