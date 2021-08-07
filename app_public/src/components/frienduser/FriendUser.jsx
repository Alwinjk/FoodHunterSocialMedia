import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import Topbar from '../topbar/Topbar';
import Userlist from '../userlist/Userlist';

import './frienduser.css';

// const FriendUserUi = (
//     <section>
//         <div className="content-profile-page">
//             <div className="profile-user-page card">
//                 <div className="img-user-profile">
//                     <img className="profile-bgHome" src={img1} />
//                     <img className="avatar" src="" />
//                 </div>

//                 <div className="user-profile-data">
//                     {/* user name */}
//                     <h1>Ananthu </h1>
//                     <p>User since 2021</p>
//                 </div>

//                 <ul className="data-user">
//                     <li><a><span>Posts</span></a></li>
//                     <li><a><span>Follow</span></a></li>
//                     <li><a><span>Following</span></a></li>
//                 </ul>
//             </div>
//         </div>

//     </section>

// )
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

        // .then(res => {
        //     console.log("result", res.data);
        //     setViewUser(res.data);
        // })
    }, []);

    return (
        <>
            <div></div>
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

                                            <img src={viewUser.avatar === undefined || viewUser.avatar === null ? "https://bootdey.com/img/Content/avatar/avatar7.png" : viewUser.avatar.url === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : viewUser.avatar.url} alt="" />
                                            <h1>{viewUser.firstname} {viewUser.lastname}</h1>
                                            <p>{viewUser.bio === undefined ? "" : viewUser.bio}</p>
                                        </div>
                                        <div className="col2 last">
                                            <div className="grid clearfix">
                                                <div className="col3 first">
                                                    {/* <h1>{viewUser.following.length}</h1> */}
                                                    <span>Following</span>
                                                </div>
                                                <div className="col3"><h1>452</h1>
                                                    <span>Followers</span></div>
                                                <div className="col3 last"><h1>1002</h1>
                                                    <span>Posts</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row clearfix">
                                        <ul className="row2tab clearfix">
                                            <li><i className="fa fa-list-alt"></i> My posts </li>

                                            {/* <Link to={{ pathname: `/edit-profile/${user._id}` }}>
                                                <li>
                                                    <i className="fa fa-heart"></i>
                                                    edit profile
                                                </li>
                                            </Link> */}

                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    {/* <OwnPostFeed /> */}
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