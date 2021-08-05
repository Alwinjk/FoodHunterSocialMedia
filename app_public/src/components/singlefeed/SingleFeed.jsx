import { connect } from 'react-redux';
import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";

import './singlefeed.css';
import ImageSlider from '../imageSlider/ImageSlider';


const SingleFeed = ({ user, posts }) => {

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

                                                    <img src={user.avatar === undefined ? "" : user.avatar.url === undefined ? "" : user.avatar.url} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-9 border-right ">
                                                <span>{user.firstname} {user.lastname}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header">
                                        <div className="pic-post">
                                            {post.text}
                                            <div className="slide-container">
                                                {/* {
                                                    post.files.map((file, index) => {
                                                        return <img key={index} src={file.url} alt={file.filename} />
                                                    })
                                                } */}
                                                {/* <SimpleImageSlider
                                                    width={500}
                                                    height={400}
                                                    images={filesArray}
                                                /> */}
                                                <ImageSlider filesArray={filesArray} />
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


