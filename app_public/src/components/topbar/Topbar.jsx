import { connect } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './topbar.css';

import M from 'materialize-css';

const Topbar = ({ user }) => {
    const searchModal = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        M.Modal.init(searchModal.current);
    }, []);
    const [search, setSearch] = useState();

    const fetchUsers = (query) => {
        console.log("query", query);
        setSearch(query);
        axios.post('/search-users', { query: query })
            .then(res => {
                console.log(res.data);
                setSearchResults(res.data);
            })
    }
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
                                    <i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black" }}>search</i>
                                </div>
                            </form>

                        </li>
                        <li>
                            <button className="btn-search" type="submit">Search</button>
                        </li>


                    </ul>
                    <div id="modal1" className="modal" ref={searchModal}>
                        <div className="modal-content">
                            <input
                                type="text"
                                placeholder="Search Users"
                                value={search}
                                onChange={(e) => fetchUsers(e.target.value)}
                            />
                            <ul class="collection">
                                {
                                    searchResults.length == 0 || searchResults[0] == "" ? null : searchResults.map(user => {
                                        return <li className="collection-item">{user.firstname} {user.lastname}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button class="modal-close waves-effect waves-green btn-flat">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Topbar);


