import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';
const Dashboard = ({ user, isLoading, startLoadingUser }) => {

    useEffect(() => {
        startLoadingUser();
    }, []);

    const loadingMessage = <div>Loading Dashboard...</div>
    const content = (
        <>
            <Link to={{ pathname: `profile/${user._id}` }}>
                <h1>Welcome to Dashboard {user.firstname}</h1>
            </Link>

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