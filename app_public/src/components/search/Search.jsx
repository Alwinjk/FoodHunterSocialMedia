import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

import { Link } from 'react-router-dom';

import './search.css';

const SearchComponent = () => {
    const searchModal = useRef(null);
    const searchInput = useRef();
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        M.Modal.init(searchModal.current);
        searchInput.current.focus();
    }, []);
    const [search, setSearch] = useState();
    const searchDiv = useRef();
    const closeBtn = useRef();
    const searchIcon = useRef();

    const fetchUsers = (query) => {
        console.log("query", query);
        setSearch(query);
        axios.post('/search-users', { query: query })
            .then(res => {
                console.log(res.data);
                setSearchResults(res.data);
            })
    }

    const handleSearchContainer = (e) => {
        console.log("inside search")
        searchDiv.current.style.display = "none";
        searchIcon.current.style.display = "none";
    }
    const handleClose = (e) => {
        console.log("inside close")
        searchDiv.current.style.display = "block";
        searchIcon.current.style.display = "inline-block";
    }

    return (
        <>
            <div className="seatch-div ">
                <div className="first-search">
                    <div ref={searchDiv} id="search-container" className="flex">
                        <form className="searchform cf">
                            <div className="search-name">
                                <div className="search">
                                    <span className="fa fa-search"></span>
                                    <input placeholder="" type="search" ref={searchIcon} onClick={handleSearchContainer} data-target="modal1" className="larg material-icons modal-trigger" style={{ color: "black" }}></input>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                {/* modal */}
                <div id="modal1" className="modal" ref={searchModal}>
                    <div className="modal-content">
                        <input
                            type="text"
                            placeholder="Search Users"
                            value={search}
                            ref={searchInput}
                            onChange={(e) => fetchUsers(e.target.value)}
                        />
                        <ul className="collection">
                            {
                                searchResults.length === 0 || searchResults[0] === "" ? null : searchResults.map(user => {
                                    return (
                                        <Link className="profile-link" to={{ pathname: `/view-profile/${user._id}` }}>
                                            <div>
                                                <div className="row">
                                                    <div className="col p-0 ml-5 ">
                                                        <li className="collection-item">
                                                            <img src={user.avatar === undefined ? "" : user.avatar.url === undefined ? "" : user.avatar.url} alt="" />
                                                        </li>
                                                    </div>
                                                    <div className="col p-0 mr-5">
                                                        <li className="collection-item">
                                                            {user.firstname} {user.lastname}
                                                        </li>

                                                    </div>

                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                        <div className="modal-footer">
                            <button ref={closeBtn} onClick={handleClose} className="modal-close">Close</button>
                        </div>
                    </div>

                </div>

            </div>


        </>

    );
}

export default SearchComponent;