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
    const params = useParams();
    console.log(params.userid)
    useEffect(async () => {
        console.log("userid", user._id);
        try {
            const res = await axios.get(`/view-profile/${params.userid}`)
            console.log("view user data", res.data);
            setViewUser(res.data);
        } catch (err) {
            console.log("view a user", err);
        }
    }, []);

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
                                                    <img src={viewUser.avatar === undefined || viewUser.avatar === null ? "https://bootdey.com/img/Content/avatar/avatar7.png" : viewUser.avatar.url === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : viewUser.avatar.url} alt="" />
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
                                                        <div className="col3 last"><h1>1002</h1>
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
                    <OthersFeed currentUser={viewUser} />
                    {/* add this particular user's posts here, only if the logged in user is following this user */}
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