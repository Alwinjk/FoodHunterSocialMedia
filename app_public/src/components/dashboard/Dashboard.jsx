import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';
const Dashboard = ({ currentUser, isLoading, startLoadingUser }) => {

    useEffect(() => {
        startLoadingUser();
    }, []);

    const loadingMessage = <div>Loading Dashboard...</div>
    const content = (
        <>
            <h1>Welcome to Dashboard {currentUser.firstname}</h1>
        </>
    );
    console.log("Current user: " + JSON.stringify(currentUser));
    return isLoading ? loadingMessage : content;

};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    currentUser: state.user
});

const mapDispatchToProps = dispatch => ({
    startLoadingUser: () => dispatch(loadUser()),
    onDisplayAlert: () => dispatch(displayAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);