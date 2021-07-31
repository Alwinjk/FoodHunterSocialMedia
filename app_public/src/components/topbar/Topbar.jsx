import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';

const Topbar = ({ user }) => {

    return (
        <>
            <div className="function-nav">
                <div className="nav-true">


                    <Link className="navbar-brand auto-link" to='/dashboard'>FoodHunter</Link>
                    <Link className="navbar-brand auto-link" aria-current="page" to={{ pathname: `profile/${user._id}` }}>

                        Profile
                    </Link>
                    <Link className="navbar-brand auto-link" to='/dashboard'>About Us</Link>
                    <Link className="navbar-brand auto-link" to='/dashboard'>Contact</Link>
                    <Link className="navbar-brand auto-link" to='/dashboard'>Logout</Link>


                </div>
            </div>
        </>

    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Topbar);


