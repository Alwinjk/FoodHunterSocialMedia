import React, { useEffect } from 'react';
import { logoutUser } from '../../store/thunk';
import { connect } from 'react-redux';

import './logout.css';

const Logout = ({ logOutUser, state, user }) => {
    useEffect(() => {
        logOutUser();
    })
    console.log("user", user)
    return (
        <div className="logout">Logout successful </div>
    )
}

const mapStateToProps = state => ({
    app: state,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logOutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);