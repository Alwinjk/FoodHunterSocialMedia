import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser, loadPost } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';

import Post from '../post/Post';
import Topbar from '../topbar/Topbar';
import SingleFeed from '../singlefeed/SingleFeed';
import UserList from '../userlist/Userlist';
import SearchComponent from '../search/Search';
import './dashboard.css';



const Dashboard = ({ user, isLoading, startLoadingUser, startLoadingPost }) => {

    useEffect(() => {
        startLoadingUser();
        startLoadingPost();
    }, []);




    const loadingMessage = <div style={{ textAlign: "center" }}>Loading Dashboard...</div>
    const content = (
        <>
            <section>
                <div className="feed-content">

                    <div className="row m-0">

                        <div className="col-md-2 m-0 p-0"><Topbar /></div>

                        <div className="col-md-7 m-0 p-0">
                            <Post />
                            <SingleFeed />
                        </div>
                        <div className="col-md-3 m">
                            <SearchComponent />
                            <UserList />
                        </div>
                    </div>
                </div>
            </section>
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