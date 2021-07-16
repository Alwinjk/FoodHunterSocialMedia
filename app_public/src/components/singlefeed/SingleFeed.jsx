import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import './singlefeed.css';

const SingleFeed = ({ user }) => {

    return (


        <>
            <section>
                <div className="content-alwin">

                    <div className="col bg-white mx-5 mt-5 mb-5">
                        <div className="col-md-0 border-right">
                        </div>

                        <div className="col-md-12 mx-0 border-right">










                            <div className="profile-card">


                                <div className="card-profile-info">

                                    <div className="row">
                                        <div className="col-md-3 border-right">
                                            <div className="col-md-3 border-right">
                                            </div>
                                            <div className="pic">
                                                <img src="./images/File_000%20(1).jpeg" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-9 border-right">
                                            <span>Ananthu</span>
                                        </div>

                                    </div>


                                </div>

                                <div className="card-header">

                                    <div className="pic-post">
                                        <img src="./images/brooke-lark-wMzx2nBdeng-unsplash.jpg" alt="" />
                                    </div>

                                </div>
                                <div className="card-footer-ananthu">
                                    <div className="numbers-ananthu">
                                        <div className="item-ananthu">
                                            <span>120</span>
                                            like
                                        </div>
                                        <div className="border-ananthu"></div>
                                        <div className="item-ananthu">
                                            <span>127</span>
                                            share
                                        </div>
                                        <div className="border-ananthu"></div>
                                        <div className="item">
                                            <span>120</span>
                                            comment
                                        </div>
                                    </div>
                                </div>
                            </div>











                        </div>



                    </div>
                </div>
            </section>
        </>


    );
};



export default SingleFeed;


