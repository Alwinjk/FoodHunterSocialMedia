import { connect } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

import './ownPostFeed.css';
import ImageSlider from '../imageSlider/ImageSlider';


const OwnPostFeed = ({ user }) => {

    const likeRef = useRef();

    const [posts, setPosts] = useState([]);
    useEffect(async () => {
        console.log("userid", user._id);
        await axios.get(`/post/${user._id}/posts`)
            .then(res => {
                console.log("result", res.data);
                setPosts(res.data);
            })
    }, []);

    console.log("posts", posts);

    const likeHandler = async (e, postid) => {
        if (e.target.style.color == "blue") {
            e.target.style.color = "red";
            const res = await axios.put(`/like`, { postid: postid, userid: user._id });
            const data = res.data;
            const postData = posts.map(post => {
                if (post._id == data._id) {
                    return data;
                } else {
                    return post;
                }
            });
            setPosts(postData);

        } else {
            e.target.style.color = "blue";
            const res = await axios.put(`/unlike`, { postid: postid, userid: user._id });
            const data = res.data;
            const postData = posts.map(post => {
                if (data._id !== undefined) {
                    if (post._id == data._id) {
                        return data;
                    } else {
                        return post;
                    }
                }
            });
            setPosts(postData);

        }

    }

    const createComment = async (text, postid) => {
        const res = await axios.put('/comment', { text: text, postid: postid, userid: user._id });
        const data = res.data;
        const postData = posts.map(post => {
            if (data._id !== undefined) {
                if (post._id == data._id) {
                    return data;
                } else {
                    return post;
                }
            }
        });
        setPosts(postData);
    }
    // let postsArray = posts.map(post => {
    //     return post.files;
    // });
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
                                                    <img src={user.avatar === undefined ? "" : user.avatar.url === undefined ? "" : user.avatar.url} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-9 border-right ">

                                                <div className="col-md-9 border-right pull-left ">
                                                    <span className="user-name">{user.firstname} {user.lastname}</span>
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
                                                    <span ref={likeRef}>{post.like.length}</span>
                                                    <span style={{ color: "blue" }} onClick={e => { likeHandler(e, post._id) }} className="span-like">like</span>
                                                </div>
                                                <div className="border-ananthu"></div>

                                                <div className="border-ananthu"></div>
                                                <div className="item-ananthu">
                                                    <span>120</span>
                                                    comment
                                                </div>

                                                {/* comment division */}
                                                <div>
                                                    {
                                                        post.comments.map(comment => {
                                                            if (comment.user != null) {
                                                                console.log("comment", comment.user)
                                                                return (
                                                                    <h6>
                                                                        <span style={{ fontWeight: "700" }}>
                                                                            {comment.user.firstname} {comment.user.lastname}
                                                                        </span>
                                                                        {comment.text}
                                                                    </h6>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </div>
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    createComment(e.target[0].value, post._id);
                                                }}>
                                                    <input type="text" placeholder="Add a comment.." />
                                                </form>
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
            <div>Post something....</div>
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
    user: state.user
});

export default connect(mapStateToProps)(OwnPostFeed);


