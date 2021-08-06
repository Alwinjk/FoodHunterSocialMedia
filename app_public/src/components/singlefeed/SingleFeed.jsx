import { connect } from 'react-redux';
import React from 'react';
import axios from 'axios';

import './singlefeed.css';
import ImageSlider from '../imageSlider/ImageSlider';
import { useEffect, useState } from 'react';


const SingleFeed = ({ user }) => {

    const [posts, setPosts] = useState([]);
    useEffect(async () => {
        await axios.post('/following-posts', { userid: user._id, followingArray: user.following })
            .then(res => {
                console.log("result", res.data);
                setPosts(res.data);
            })
    }, []);

    console.log("posts", posts);

    let postsArray = posts.map(post => {
        return post.files;
    });
    // console.log("postsArray", postsArray)

    const displayPosts = posts.map((post, index) => {
        let filesArray = [];
        filesArray.push(post.files.map(file => {
            return file.url;
        }));
        return (
            <section key={index}>
                <div className="content-alwin">
                    <div className="col mx-5 mt-5 mb-5">
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
                                                    <img src={post.user.avatar === undefined ? "" : post.user.avatar.url === undefined ? "" : post.user.avatar.url} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-9 border-right ">
                                                <span>{post.user.firstname} {post.user.lastname}</span>
                                                <div className="col-md-9 border-right pull-left ">
                                                    <span>{user.firstname} {user.lastname}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-header">
                                            <div className="pic-post">
                                                {post.text}
                                                <div className="slide-container">

                                                    <ImageSlider filesArray={filesArray} />
                                                </div>


                                            </div>
                                        </div>
                                        <div className="card-footer-ananthu">
                                            <div className="numbers-ananthu">
                                                <div className="item-ananthu">
                                                    <span>120</span>
                                                    like
                                                </div>
                                                <div className="border-ananthu"></div>

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
                </div>
            </section>
        );
    });

    const displayPostsError = (
        <>
            <div>Add some content</div>
        </>
    );


    // console.log("each post", filesArray);
    return (
        <>
            {
                posts.length > 0 ? displayPosts : displayPostsError
            }
        </>
    );
};



const mapStateToProps = state => ({
    user: state.user,
    posts: state.post
});

export default connect(mapStateToProps)(SingleFeed);


