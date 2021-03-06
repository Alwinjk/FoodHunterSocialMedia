import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import img1 from '../../public/images/upload.png';

import './post.css';

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(function Post({ user }) {
    const text = useRef();

    const [selectedFiles, setSelectedFiles] = useState(null);
    const multipleFileChangeHandler = (e) => {
        e.preventDefault();
        setSelectedFiles(e.target.files);
    };

    const multipleFileUploadHandler = e => {
        e.preventDefault();
        const data = new FormData();
        const textValue = text.current.value;
        if (selectedFiles || textValue) {
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
                                // If not the given file type
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
        }
        // If file selected


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
                                                <i className="material-icons" data-bs-toggle="modal" data-bs-target="#myModal"><button type="submit" className="btn2  mt-2 btn-primary">attach_file</button></i>
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
                                    <div className="modal-close"> <i className="material-icons" data-bs-dismiss="modal">close</i></div>
                                </div>
                                <div className="modal-body">
                                    <div className="upload">
                                        <img src={img1} alt="" />
                                    </div>
                                    <input type="file" name="file" className="custom-file-input" id="file" className="inputfile" multiple
                                        onChange={multipleFileChangeHandler} />
                                    <label htmlFor="file">Upload</label>
                                    <div className="upload-text">
                                        <h3>Click to Upload Your Images</h3>
                                        <h1>copyright owned by foodhunter.canada.in developed by alwin and ananthu</h1>
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




