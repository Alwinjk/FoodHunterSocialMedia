import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useRef } from 'react';
import { loadPost, loadUser } from '../../store/thunk';
import { displayAlert } from '../../store/thunk';

import Topbar from '../topbar/Topbar';
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
    console.log("user in profile", user.address);
    useEffect(() => {
        startLoadingPost();
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);
    const [validationMsg, setValidationMsg] = useState([]);

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
        e.preventDefault();
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

        // year validation
        if (year.current.value !== undefined) {
            let value;
            try {
                value = parseInt(year.current.value);
            } catch (err) {
                console.log("Invalid number");
            }

            const d = new Date();
            if (value < 1900) {
                setValidationMsg("Invalid year, year must be between 1900 and " + (d.getFullYear - 12));
            }
            if (value > (d.getFullYear - 12)) {
                setValidationMsg("You must be 13 years old to create an account!");
            }
        }
        if (month.current.value) {
            const value = parseInt(year.current.value)
        }
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


            <div className="feed-content">

                <div class="row m-0">

                    <div class="col-2 m-0 p-0"> <Topbar /></div>
                    <div class="col-10 m-0 p-0">


                        <section className="login pt-0 ">

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
                                                    <img className="rounded-circle mt-4" width="150px" src={user.avatar === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : user.avatar.url === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : user.avatar.url} />
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
                                                                ref={email}
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label className="labels">Address 1</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="enter address line 1"
                                                                defaultValue={user.address === undefined ? "" : user.address.address1 === undefined ? "" : user.address.address1}
                                                                ref={address1}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="labels">Address 2</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="enter address line 2"
                                                                defaultValue={user.address === undefined ? "" : (user.address.address2 === undefined ? "" : user.address.address2)}
                                                                ref={address2}
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="labels">Region</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Region/State/Province"
                                                                defaultValue={user.address === undefined ? "" : (user.address.region === undefined ? "" : user.address.region)}
                                                                ref={region}
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="labels">City</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="City"
                                                                defaultValue={user.address === undefined ? "" : (user.address.city === undefined ? "" : user.address.city)}
                                                                ref={city}
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label className="labels">Zip code</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Zip code"
                                                                defaultValue={user.address === undefined ? "" : (user.address.zipcode === undefined ? "" : user.address.zipcode)}
                                                                ref={zipcode}
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="labels">Country</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Country"
                                                                defaultValue={user.address === undefined ? "" : (user.address.country === undefined ? "" : user.address.country)}
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
                        </section>


                    </div>

                </div>
            </div>




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











