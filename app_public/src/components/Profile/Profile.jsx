import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useRef } from 'react';
import { loadPost, loadUser } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';

import Topbar from '../topbar/Topbar';
import SingleFeed from '../singlefeed/SingleFeed';
import './Profile.css';


const EditProfileReq = async (userid, data) => {
    try {
        const res = await axios.put(`/users/${userid}`, data);
        console.log("Profile update : " + res.data);
        return res.data;
    } catch (err) {
        console.log("Edit profile error : " + err);
    }
};

const Profile = ({ user, startLoadingUser, startLoadingPost }) => {

    useEffect(() => {
        startLoadingPost();
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);

    const firstname = useRef();
    const lastname = useRef();
    const phoneno = useRef();
    const email = useRef();
    const gender = useRef();
    const day = useRef();
    const month = useRef();
    const year = useRef();
    const address1 = useRef();
    const address2 = useRef();
    const city = useRef();
    const region = useRef();
    const country = useRef();
    const zipcode = useRef();
    const bio = useRef();

    const date = new Date(user.dob);
    const dayDob = date.getDate() + 1;
    const monthDob = date.getMonth() + 1;
    const yearDob = date.getFullYear();

    const params = useParams();

    const singleFileChangeHandler = e => {
        setSelectedFile(e.target.files[0]);
    }

    const singleFileUploadHandler = (e) => {
        e.preventDefault();
        const data = new FormData();// If file selected
        if (selectedFile) {
            data.append('profileImage', selectedFile, selectedFile.name);
            axios.put(`/users/${user._id}/avatar`, data, {
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
                                console.log("exceeds max size");
                            } else {
                                console.log(response.data);// If not the given file type
                                console.log(response.data.error);
                            }
                        } else {
                            // Success
                            let fileName = response.data;
                            console.log('fileName', fileName);
                            console.log('File Uploaded successfully');
                            startLoadingUser();
                        }
                    }
                }).catch((error) => {
                    // If another error
                    console.log(error);
                });
        } else {
            // if file not selected throw error
            console.log('Please upload file');
        }
    };
    console.log("selected file", selectedFile);
    // form submit function
    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            email: email.current.value,
            bio: bio.current.value,
            address: {
                address1: address1.current.value,
                address2: address2.current.value,
                city: city.current.value,
                region: region.current.value,
                country: country.current.value,
                zipcode: zipcode.current.value,
            },
            dob: year.current.value + "-" + month.current.value + "-" + day.current.value,
            phoneno: phoneno.current.value,
            gender: gender.current.value
        };
        const user = await EditProfileReq(params.userid, data);
        console.log("user", user)
        if (user) {
            startLoadingUser();
        }
    } // end of handleSubmit


    return (
        <>
            <Topbar />
            <section className="login pt-0 ">
                <h1>{user.firstname}</h1>
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img src="" height="60px" width="60px" /></a>
                    </div>
                </nav>

                <div className="create-img1">
                    <div className="content">
                        <h1><span>FOODHUNTER</span></h1>
                        <span className="cen>">MANAGE YOUR PROFILE</span>
                    </div>
                </div>

                <div className="container">


                    <div className="col bg-white mt-5 mb-5">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className="rounded-circle mt-4" width="150px" src={user.avatar === undefined ? "" : user.avatar.url} />
                                        <form >
                                            <input type="file" onChange={singleFileChangeHandler} />
                                            <button type="submit" onClick={singleFileUploadHandler}>Submit</button>
                                        </form>
                                        <span className="font-weight-bold">{user.firstname} {user.lastname}</span><span className="text-black-50"></span><span> </span>
                                    </div>
                                </div>

                                <div className="col-md-5 border-right">

                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Profile Settings</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    // placeholder="First Name"
                                                    defaultValue={user.firstname}
                                                    ref={firstname}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    // placeholder="Last Name"
                                                    defaultValue={user.lastname}
                                                    ref={lastname}
                                                />
                                            </div>

                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-3">
                                                <label className="labels">Date Of Birth</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="day"
                                                    defaultValue={user.dob === undefined ? "" : dayDob}
                                                    ref={day}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="labels"></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="month"
                                                    defaultValue={user.dob === undefined ? "" : monthDob}
                                                    ref={month}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="labels"></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="year"
                                                    defaultValue={user.dob === undefined ? "" : yearDob}
                                                    ref={year}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <label className="labels">Gender</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Gender"
                                                    defaultValue={user.gender === undefined ? "" : user.gender}
                                                    ref={gender}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mt-3">

                                            <div className="col-md-12">
                                                <label className="labels">Mobile Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter phone number"
                                                    defaultValue={user.phoneno === undefined ? "" : user.phoneno}
                                                    ref={phoneno}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Email</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.email}
                                                    className="form-control"
                                                    // placeholder="enter email id"
                                                    ref={email}
                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <label className="labels">Address 1</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter address line 1"
                                                    defaultValue={user.address === undefined ? "" : (user.address.address1 ? "" : user.address.address1)}
                                                    ref={address1}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Address 2</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter address line 2"
                                                    defaultValue={user.address === undefined ? "" : (user.address.address2 ? "" : user.address.address2)}
                                                    ref={address2}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Region</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Region/State/Province"
                                                    defaultValue={user.address === undefined ? "" : (user.address.region ? "" : user.address.region)}
                                                    ref={region}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="City"
                                                    defaultValue={user.address === undefined ? "" : (user.address.city ? "" : user.address.city)}
                                                    ref={city}
                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <label className="labels">Zip code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Zip code"
                                                    defaultValue={user.address === undefined ? "" : (user.address.zipcode ? "" : user.address.zipcode)}
                                                    ref={zipcode}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Country</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Country"
                                                    defaultValue={user.address === undefined ? "" : (user.address.country ? "" : user.address.country)}
                                                    ref={country}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5 text-center">
                                            <input
                                                className="btn btn-primary profile-button"
                                                type="submit"
                                                defaultValue="Save Profile"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-between align-items-center experience"><span>Edit Bio</span>
                                        </div>
                                        <br />
                                        <div className="col-md-12">
                                            <label className="labels">Bio</label>
                                            <textarea
                                                id="w3review"
                                                name="w3review"
                                                rows="4"
                                                cols="100%"
                                                defaultValue={user.bio === undefined ? "" : user.bio}
                                                ref={bio}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Gallery container */}

                {/* <div className="container">

                     <div className="col bg-white mt-12 mb-5 ">



                        <div class="container">
                            <h1>Gallery</h1>

                            <div class="gallery-wrap">
                                <div class="item item-1"></div>
                                <div class="item item-2"></div>
                                <div class="item item-3"></div>
                                <div class="item item-4"></div>
                                <div class="item item-5"></div>
                            </div>
                        </div>

                        <div class="social">
                            <a href="https://twitter.com/StefCharle" target="_blank">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/twitter.svg" alt="" />
                            </a>
                        </div>

                    </div> 

                </div> */}


                {/* Post container */}
                <div className="container bg-light md-5" >
                    <SingleFeed />
                </div>
            </section>
        </>
    )
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    startLoadingUser: () => dispatch(loadUser()),
    startLoadingPost: () => dispatch(loadPost()),
    onDisplayAlert: () => dispatch(displayAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


