import { connect } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';

import Topbar from '../topbar/Topbar';
import SingleFeed from '../singlefeed/SingleFeed';
import Userlist from '../userlist/Userlist';
import SearchComponent from '../search/Search';

import './viewOwnProfile.css';

const ViewProfile = (


    <section>

        <container>

            <div className="container-jibu">



                <div className="profile-hunter">


                    <div className="profile-image-hunter">

                        <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />

                    </div>

                    <div className="profile-user-settings">

                        <h1 className="profile-user-name">janedoe_</h1>

                        <button type="submit" className="btn5  mt-2 btn-primary">edit profile</button>

                    </div>



                </div>


            </div>
        </container>
    </section>


);

const ViewOwnProfile = ({ user }) => {

    return (
        <>


            <div className="row m-0">

                <div className="col-2 m-0 p-0"> <Topbar /></div>
                <div className="col-7 mt-5 p-0">

                    {ViewProfile}


                    <SingleFeed /></div>
                <div className="col-3">
                    <SearchComponent />
                    <Userlist />
                </div>
            </div>





        </>

    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ViewOwnProfile);


