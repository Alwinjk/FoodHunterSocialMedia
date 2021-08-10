import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';

import Topbar from '../topbar/Topbar';
import Userlist from '../userlist/Userlist';

import './frienduser.css';
import OthersFeed from '../othersFeed/OthersFeed';

const FriendUser = ({ user }) => {

    const [viewUser, setViewUser] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const [followingCheck, setFollowingCheck] = useState(false);
    const params = useParams();
    useEffect(() => {
        fetchUserData();
        fetchPostsData();
    }, []);

    async function fetchUserData() {
        try {
            const res = await axios.get(`/view-profile/${params.userid}`)
            setViewUser(res.data);
        } catch (err) {
            console.log("view a user", err);
        }
    }

    async function fetchPostsData() {
        await axios.get(`/post/${params.userid}/posts`)
            .then(res => {
                setPostCount(res.data.length);
                if (user.following.includes(setViewUser._id)) {
                    setFollowingCheck(true);
                    console.log(followingCheck);
                }
            }).catch(err => {
                console.log(err);
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
                            {
                                viewUser === undefined || viewUser == null ? "" :

                                    <section className="section1 clearfix">
                                        <div>
                                            <div className="row grid clearfix">
                                                <div className="col2 first">
                                                    <img src={viewUser.avatar === undefined || viewUser.avatar === null ? "https://www.bootdey.com/img/Content/avatar/avatar7.png" : viewUser.avatar.url === undefined ? "https://www.bootdey.com/img/Content/avatar/avatar7.png" : viewUser.avatar.url} alt="" />
                                                    <h1>{viewUser.firstname} {viewUser.lastname}</h1>
                                                    <p>{viewUser.bio === undefined ? "" : viewUser.bio}</p>
                                                </div>
                                                <div className="col2 last">
                                                    <div className="grid clearfix">
                                                        <div className="col3 first">
                                                            <h1>{viewUser.following.length}</h1>
                                                            <span>Following</span>
                                                        </div>
                                                        <div className="col3"><h1>{viewUser.followers.length}</h1>
                                                            <span>Followers</span></div>
                                                        <div className="col3 last"><h1>{postCount}</h1>
                                                            <span>Posts</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row clearfix">
                                                <ul className="row2tab clearfix">
                                                    <li><i className="fa fa-list-alt"></i> {viewUser.firstname}'s posts </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>
                            }
                        </div>
                    </div>

                    {followingCheck === true ? <OthersFeed currentUser={viewUser} /> : <div>Follow to see posts</div>}

                </div>
                <div className="col-3">
                    <Userlist />
                </div>
            </div>


        </>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(FriendUser);