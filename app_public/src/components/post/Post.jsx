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
        console.log(e.target.files);
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
            data.append('userid', user._id);
            data.append('text', textValue);
            for (var value of data.entries()) {
                console.log(value[0] + " - " + value[1]);
            }
            axios.post(`/posts/${user._id}/post`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    console.log('res', response);
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
                        } else {
                            // Success
                            let fileName = response.data;

                            console.log('fileName', fileName);
                            console.log('File Uploaded successfully');

                        }
                    }
                }).catch((error) => {
                    // If another error
                    console.log(error);
                });
            startLoadingPost();
        } else {
            // if file not selected throw error
            console.log('Please upload file');
        }
    };
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
                        <form onSubmit={multipleFileUploadHandler}>
                            <div className="row">
                                <div className="col-12">
                                    <input id="userInput" type="text" ref={text} placeholder="New item..." />
                                    <button type="submit" className="btn2 btn-primary">Post</button>
                                </div>
                            </div>

                            <div className="icon-className-ananthu">
                                <i className="material-icons" data-bs-toggle="modal" data-bs-target="#myModal">attach_file</i>
                                <i className="material-icons">image</i>
                                <i className="material-icons">search</i>
                                <i className="material-icons">explore</i>
                                <i className="material-icons">camera</i>
                                <i className="material-icons">videocam</i>
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
                                                    accept="image/*,audio/*,video/*"
                                                    multiple
                                                    onChange={multipleFileChangeHandler}
                                                />
                                                <div className="label-holder">
                                                    <label htmlFor="file" className="label">
                                                        <i className="material-icons">add_a_photo</i>
                                                    </label>
                                                </div>
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
    )

});




