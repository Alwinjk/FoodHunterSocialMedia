import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser, loadPost } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';
import Post from '../post/Post';
import Topbar from '../topbar/Topbar';
import SingleFeed from '../singlefeed/SingleFeed';
import Userlist from '../userlist/Userlist';


const Dashboard = ({ user, isLoading, startLoadingUser, startLoadingPost }) => {

    useEffect(() => {
        startLoadingUser();
        startLoadingPost();
    }, []);

    const loadingMessage = <div>Loading Dashboard...</div>
    const content = (
        <>
            <Topbar />
            <Post />
            <SingleFeed />
            <Userlist />

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
    startLoadingPost: () => dispatch(loadPost()),
    onDisplayAlert: () => dispatch(displayAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);