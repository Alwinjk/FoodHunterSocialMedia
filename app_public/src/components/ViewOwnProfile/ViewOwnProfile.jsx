import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../topbar/Topbar';
import Userlist from '../userlist/Userlist';
import OwnPostFeed from '../ownPostFeed/OwnPostFeed';
import SearchComponent from '../search/Search';

import './viewOwnProfile.css';

const ViewOwnProfile = ({ user }) => {

    const [postCount, setPostCount] = useState(0);
    useEffect(() => {
        fetchUserPosts()
    })
    async function fetchUserPosts() {
        await axios.get(`/post/${user._id}/posts`)
            .then(res => {
                setPostCount(res.data.length);
            });
    }

    return (
        <>
            <div className="row m-0">
                <div className="col-2 m-0 p-0">
                    <Topbar />
                </div>
                <div className="col-7 mt-5 p-0">
                    <div className="container-pro">
                        <div className="innerwrap">
                            <section className="section1 clearfix">
                                <div>
                                    <div className="row grid clearfix">
                                        <div className="col2 first">

                                            <img src={user.avatar === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : user.avatar.url === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : user.avatar.url} alt="" />
                                            <h1>{user.firstname} {user.lastname}</h1>
                                            <p>{user.bio === undefined ? "" : user.bio}</p>
                                        </div>
                                        <div className="col2 last">
                                            <div className="grid clearfix">
                                                <div className="col3 first">
                                                    <h1>{user.following.length}</h1>
                                                    <span>Following</span>
                                                </div>
                                                <div className="col3"><h1>452</h1>
                                                    <span>Followers</span></div>
                                                <div className="col3 last"><h1>{postCount}</h1>
                                                    <span>posts</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row clearfix">
                                        <ul className="row2tab clearfix">
                                            <li><i className="fa fa-list-alt"></i> Posts </li>

                                            <Link to={{ pathname: `/edit-profile/${user._id}` }}>
                                                <li>
                                                    <i className="fa fa-heart"></i>
                                                    Edit profile
                                                </li>
                                            </Link>

                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <OwnPostFeed />
                </div>
                <div className="col-3">
                    <SearchComponent />
                    <Userlist />
                </div>
            </div>
        </>

    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ViewOwnProfile);


