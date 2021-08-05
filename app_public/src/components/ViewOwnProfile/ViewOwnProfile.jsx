import { connect } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';

import Topbar from '../topbar/Topbar';
import SingleFeed from '../singlefeed/SingleFeed';
import Userlist from '../userlist/Userlist';
import img1 from '../../public/images/man.jpg';


import './viewOwnProfile.css';

const ViewProfile = (



    <div className="container-pro">
        <div className="innerwrap">
            <section className="section1 clearfix">
                <div>
                    <div className="row grid clearfix">
                        <div className="col2 first">

                            <img src={img1} alt="" />
                            <h1>Ananthu</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                            <span>Follow</span>
                        </div>
                        <div className="col2 last">
                            <div className="grid clearfix">
                                <div className="col3 first">
                                    <h1>694</h1>
                                    <span>Following</span>
                                </div>
                                <div className="col3"><h1>452</h1>
                                    <span>Followers</span></div>
                                <div className="col3 last"><h1>1002</h1>
                                    <span>posts</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <ul className="row2tab clearfix">
                            <li><i className="fa fa-list-alt"></i> My posts </li>
                            <li><i className="fa fa-heart"></i> edit profile </li>

                        </ul>
                    </div>
                </div>

            </section>

        </div>
    </div>




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


