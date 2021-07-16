import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import './post.css';

const Post = ({ user }) => {

    return (


        <>


            <div className="content-alwin">
                <div className="col bg-white mx-5 mt-5 mb-5">
                    <div className="container-post">
                        <div className="row">
                            <div className="intro col-12">
                                <h1>create your new post</h1>

                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <input id="userInput" type="text" placeholder="New item..." />
                                <button type="submit" className="btn2 btn-primary">Post</button>
                            </div>
                        </div>

                        <div className="icon-className-ananthu">
                            <i className="material-icons" data-bs-toggle="modal" data-bs-target="#myModal">attach_file</i>
                            <i className="material-icons">image</i>
                            <i className="material-icons">search</i>
                            <i className="material-icons">explore</i>
                            <i className="material-icons">person</i>
                            <i className="material-icons">videocam</i>
                        </div>
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">





                                    <div className="modal-header">
                                        <h5 className="modal-title">new post</h5>

                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">



                                        <div className="wrapper-ananthu">
                                            <div className="photo_submit-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn2 btn-primary">post</button>
                                        <button type="submit" className="btn2 btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </>


    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default Post;


