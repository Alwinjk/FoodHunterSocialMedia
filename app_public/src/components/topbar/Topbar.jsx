import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';

const Topbar = ({ user }) => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-nav">
                <Link className="navbar-brand pt-5 " to='/dashboard'>FoodHunter</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={{ pathname: `profile/${user._id}` }}>
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Message</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Settings
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Log Out</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>

                                </li>
                            </ul>
                        </li>
                        <li>
                            <form className="d-flex">
                                <div className="topbar-input">
                                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" />

                                </div>
                            </form>

                        </li>
                        <li>
                            <button className="btn-search" type="submit">Search</button>
                        </li>


                    </ul>



                </div>
            </div>
        </nav >
    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Topbar);


