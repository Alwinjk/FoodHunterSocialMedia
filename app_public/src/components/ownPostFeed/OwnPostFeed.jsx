import { connect } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

import './ownPostFeed.css';
import ImageSlider from '../imageSlider/ImageSlider';
import { useParams } from 'react-router';

const OwnPostFeed = ({ user }) => {

    const likeRef = useRef();
    const params = useParams();
    const [postsEmpty, setPostsEmpty] = useState(false);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchUserPosts();
    }, []);

    async function fetchUserPosts() {
        await axios.get(`/post/${params.userid}/posts`)
            .then(res => {
                console.log("result", res.data);
                setPosts(res.data);
                if (posts.length === 0) {
                    setPostsEmpty(true);
                }
            })
    }



    console.log("posts", posts);

    const likeHandler = async (e, postid) => {
        if (e.target.style.color === "blue") {
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
                    if (post._id === data._id) {
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
                if (post._id === data._id) {
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
                                                    <img src={post.user.avatar === undefined ? "" : post.user.avatar.url === undefined ? "" : post.user.avatar.url} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-9 border-right ">

                                                <div className="col-md-9 border-right pull-left ">
                                                    <span className="user-name">{post.user.firstname} {post.user.lastname}</span>
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


                                            </div>
                                        </div>
                                        <div className="my-comment">
                                            <div className="my-comment-form">
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    createComment(e.target[0].value, post._id);
                                                }}>
                                                    <input type="text" placeholder="Add a comment.." />
                                                </form>
                                            </div>
                                            <div className="comment-post">
                                                {
                                                    post.comments.map((comment, index) => {
                                                        if (comment.user != null) {
                                                            console.log("comment", comment.user)
                                                            return (
                                                                <div key={index} className="comment-ananthu">
                                                                    <div className="comment-alwin">
                                                                        <div className="comment-img">
                                                                            <img src={comment.user.avatar === undefined ? "" : comment.user.avatar.url === undefined ? "" : comment.user.avatar.url} alt="user" class="profile-photo-lg" />
                                                                        </div>
                                                                        <div className="comment-comment">
                                                                            <h2>
                                                                                {comment.user.firstname} {comment.user.lastname}
                                                                            </h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="comment-feba">
                                                                        <h3>{comment.text}</h3>

                                                                    </div>

                                                                </div>

                                                            )
                                                        }

                                                    })
                                                }
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

    const displayLoadingPostsError = (
        <>
            <div>Loading....</div>
        </>
    );

    const displayEmptyPostsError = (
        <>
            <div>Hey {user.firstname}, add your first post!</div>
        </>
    )

    return (
        <>
            {
                posts.length > 0 ? displayPosts : postsEmpty ? displayEmptyPostsError : displayLoadingPostsError
            }
        </>
    );
};



const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(OwnPostFeed);


