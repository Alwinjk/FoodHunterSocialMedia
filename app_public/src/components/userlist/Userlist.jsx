import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadUserList } from '../../store/thunk';
import { Link } from 'react-router-dom';


const Userlist = ({ user, userList, startLoadingUserList }) => {

    useEffect(() => {
        startLoadingUserList();
    }, []);

    const handleFollowRequest = async (currentUserid, userid, event) => {
        try {
            await axios.put(`users/${userid}/following`, { currentuser: currentUserid });
            event.target.style.display = "none";
        } catch (err) {
            console.log("follow request error", err);
        }

    }

    // const handleCancelFollowRequest = async (currentUserid, userid, event) => {
    //     try {
    //         await axios.put(`users/${userid}/cancel-follow-request`, { currentuser: currentUserid });
    //         event.target.style.display = "none";
    //     } catch (err) {
    //         console.log("follow request error", err);
    //     }

    // }

    const followingArray = user.following;
    const removeExistingFriend = (currentUserId) => {
        for (let i = 0; i < followingArray.length; i++) {
            if (currentUserId === followingArray[i]) {
                return true;
            }
        }
    }


    return (
        <>

            <section>
                {
                    userList.map((currentUser, index) => {

                        let removeExistingFriendCheck = removeExistingFriend(currentUser._id);
                        return (
                            <>
                                {
                                    removeExistingFriendCheck === true ? null :
                                        <div key={index} className="my-list1">

                                            <div className="my-list">

                                                <div className="nearby-user">
                                                    <div className="row">
                                                        <div className="col-md-2 col-sm-2">

                                                            <img src={currentUser.avatar === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : currentUser.avatar.url === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : currentUser.avatar.url} alt="user" className="profile-photo-lg" />

                                                        </div>
                                                        <div className="col-md-7 col-sm-7">
                                                            <h5>
                                                                <Link className="profile-link" to={{ pathname: `/view-profile/${currentUser._id}` }}>{currentUser.firstname} {currentUser.lastname}</Link>
                                                            </h5>
                                                            <p>{currentUser.address === undefined ? "" : currentUser.address.city === undefined ? "" : currentUser.address.city}</p>
                                                            {/* <p className="text-muted">zczvxvvz</p> */}
                                                        </div>
                                                        <div className="col-md-3 col-sm-3">
                                                            <button
                                                                onClick={
                                                                    (event) => {
                                                                        handleFollowRequest(currentUser._id, user._id, event);
                                                                    }
                                                                }
                                                                className="btn btn-primary pull-right"
                                                            >
                                                                Follow
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                }
                            </>
                        )
                    })
                }

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