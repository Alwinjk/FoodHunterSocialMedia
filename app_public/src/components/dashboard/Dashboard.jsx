import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';

import Topbar from '../topbar/Topbar';

const Dashboard = ({ user, isLoading, startLoadingUser }) => {

    useEffect(() => {
        startLoadingUser();
    }, []);

    const loadingMessage = <div>Loading Dashboard...</div>
    const content = (
        <>
            <Topbar />
        </>
    );
    console.log("Current user: " + JSON.stringify(user));
    return isLoading ? loadingMessage : content;

};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    startLoadingUser: () => dispatch(loadUser()),
    onDisplayAlert: () => dispatch(displayAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);