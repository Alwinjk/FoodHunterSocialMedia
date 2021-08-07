import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadPost } from '../../store/thunk';

import './post.css';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    startLoadingPost: () => dispatch(loadPost())
});

export default connect(mapStateToProps, mapDispatchToProps)(function Post({ user, startLoadingPost }) {
    const text = useRef();

    const [selectedFiles, setSelectedFiles] = useState(null);
    const multipleFileChangeHandler = (e) => {
        setSelectedFiles(e.target.files);
    };

    const multipleFileUploadHandler = e => {
        e.preventDefault();
        const data = new FormData();
        const textValue = text.current.value;
        // If file selected
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
            }
        }
        data.append('userid', user._id);
        data.append('text', textValue);
        axios.post(`/posts/${user._id}/post`, data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
            .then((response) => {
                if (200 === response.status) {
                    // If file size is larger than expected.
                    if (response.data.error) {
                        if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                            console.log('Max size: 150MB');
                        } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
                            console.log('Max 4 files allowed');
                        } else {
                            // If not the given ile type
                            console.log(response.data.error);
                        }
                    }
                    // else {
                    //     // Success
                    //     let fileName = response.data;
                    //     console.log('fileName', fileName);
                    //     console.log('File Uploaded successfully');

                    // }
                }
            }).catch((error) => {
                // If another error
                console.log(error);
            });
        startLoadingPost();

    };
    return (
        <>
            <div className="content-alwin">
                <div className="col bg-white mx-5 mt-2 mb-5">
                    <form onSubmit={multipleFileUploadHandler}>
                        <div className="m-mrg" id="composer">
                            <div id="c-tabs-cvr">
                            </div>
                            <div id="c-c-main">
                                <div className="tb">
                                    <div className="td" id="p-c-i"><img src="https://imagizer.imageshack.com/img921/3072/rqkhIb.jpg" alt="Profile pic" /></div>
                                    <div className="td" id="c-inp">
                                        <textarea id="userInput" type="text" ref={text} placeholder="Whats on your mind...?" />
                                        <div id="c-tabs-cvr">
                                        </div>
                                        <div className="alwin-post">
                                            <button type="submit" className="btn2  mt-2 btn-primary">Post</button>
                                        </div>
                                        <div className="tb" id="c-tabs">
                                            <div className="alwin-post2">
                                                <button type="submit" className="btn2  mt-2 btn-primary"><i className="material-icons" data-bs-toggle="modal" data-bs-target="#myModal">attach_file</i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                accept="image/*,audio/*,video/*"
                                                multiple
                                                onChange={multipleFileChangeHandler}
                                            />
                                            {/* <div className="label-holder">
                                                <label htmlFor="file" className="label">
                                        
                                                </label>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-f">

                                    <button type="submit" className="btn2">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

});




