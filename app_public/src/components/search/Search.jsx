import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

import './search.css';

const SearchComponent = () => {
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
                    <ul className="collection">
                        {
                            searchResults.length == 0 || searchResults[0] == "" ? null : searchResults.map(user => {
                                return <li className="collection-item">{user.firstname} {user.lastname}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Close</button>
                </div>
            </div>




        </>

    );
}

export default SearchComponent;