import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadUserList } from '../../store/thunk';
import { useEffect } from 'react';

import './userlist.css';




const Userlist = ({ user, userList, startLoadingUserList }) => {

    useEffect(() => {
        startLoadingUserList();
    }, []);
    userList.map(user => {
        console.log(user.firstname);
    })

    return (
        <>
            <section>
                {/* {
                    userList.map(user => {
                        return (
                            <div className="user-container">
                                <div className="avatar-container">
                                    {user.avatar === undefined ? <img src="../../public/images/logo.png" alt="logo" /> : <img src={user.avatar.url} />}
                                </div>
                                <p style={{ color: "white" }}>{user.firstname} {user.lastname}</p>
                            </div>
                        )
                    })
                } */}

                <div class="container-userlist ">
                    <div className="user-list-ananthu">
                        <div className="user-list-alwin">


                            <div className="ananthu-left">
                                <div className="ananthu-image">
                                    <img className="ananthu-image-inner" alt="" />
                                    <div className="gradient"></div>
                                </div>

                            </div>

                            <div className="ananthu-right">
                                <div className="user-info">
                                    <h3>
                                        Ananthu

                                    </h3>
                                    {/* <button className="btn">View Profile</button> */}
                                </div>
                                <div class="user-links">

                                    <a><span>421k</span> Followers</a>
                                    <a>Following <span>388</span></a>

                                    <button class="userlist-button">Follow</button>
                                    <button class="userlist-button">View Profile</button>

                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="user-list-ananthu">
                    <div className="user-list-alwin">
                        <div className="ananthu-left">
                            <div className="ananthu-image">
                                <img className="ananthu-image-inner" src="" alt="" />
                                <div className="gradient"></div>
                            </div>
                        </div>
                        <div className="ananthu-right">
                            <div className="user-info">
                                <h3>
                                    Ananthu

                                </h3>
                                <button className="btn">View Profile</button>
                            </div>

                            <div className="user-ananthu">
                                <p className="user-bio-name">Ananthu Purushothaman</p>
                                <p>This is the user biography <br /> stirling avenue thejhkjHk </p>
                            </div>
                        </div>
                    </div>
                </div> */}

            </section>
        </>

    )
}

const mapStateToProps = state => ({
    user: state.user,
    userList: state.userList
});

const mapDispatchToProps = dispatch => ({
    startLoadingUserList: () => dispatch(loadUserList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
