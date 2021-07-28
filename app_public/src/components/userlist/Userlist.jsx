import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadUserList } from '../../store/thunk';
import { useEffect } from 'react';




const Userlist = ({ user, userList, startLoadingUserList }) => {

    useEffect(() => {
        startLoadingUserList();
    }, []);
    userList.map(user => {
        console.log(user.firstname);
    })

    return (
        <>
            {
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
            }


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