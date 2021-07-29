import { connect } from 'react-redux';
import React from 'react';

import './singlefeed.css';


const SingleFeed = ({ user, posts }) => {

    let postsArray = posts.map(post => {
        return post.files;
    });
    // console.log("postsArray", postsArray)




    // console.log("each post", filesArray);
    return (
        <>
            {
                posts.map(post => {
                    return (
                        <section>
                            <div className="content-alwin">
                                <div className="col bg-white ">
                                    <div className="col-md-0 border-right">
                                    </div>
                                    <div className="alwin-info">
                                        <div className="col-md-12 mx-0 border-right">
                                            <div className="profile-card">
                                                <div className="card-profile-info">
                                                    <div className="row">
                                                        <div className="col-md-3 border-right">
                                                            <div className="col-md-3 border-right">
                                                            </div>
                                                            <div className="pic">

                                                                <img src={user.avatar.url} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-9 border-right">
                                                            <span>{user.firstname} {user.lastname}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-header">
                                                    <div className="pic-post">
                                                        {post.text}
                                                        <div>
                                                            {
                                                                post.files.map(file => {
                                                                    return <img src={file.url} alt={file.filename} />
                                                                })
                                                            }

                                                        </div>

                                                        {/* <img src="./images/brooke-lark-wMzx2nBdeng-unsplash.jpg" alt="" /> */}
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
                            </div>
                        </section>
                    );
                })
            }

        </>
    );
};



const mapStateToProps = state => ({
    user: state.user,
    posts: state.post
});

export default connect(mapStateToProps)(SingleFeed);


