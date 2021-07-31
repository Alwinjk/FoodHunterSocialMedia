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


                    <form className="d-flex">
                        <div className="topbar-input">
                            <i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black" }}>search</i>
                        </div>
                    </form>


                    {/* modal */}
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
        </>

    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Topbar);


