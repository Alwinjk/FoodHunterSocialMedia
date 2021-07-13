import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useRef } from 'react';
import { loadUser } from '../../store/thunk';
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

const postImage = async ({ image, description }, userid) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const result = await axios.put(`/users/${userid}/avatar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return result.data;
}

const Profile = ({ user, startLoadingUser }) => {

    const [file, setFile] = useState();
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const submitAvatar = async event => {
        event.preventDefault();
        const result = await postImage({ image: file, description }, user._id);
        setImages([result.image, ...images]);
    };

    const fileSelected = event => {
        const file = event.target.files[0];
        setFile(file);
    };

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
    const imagePath = `/users/${params.userid}/avatar/${user.avatar.key}`;

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
                    <form onSubmit={submitAvatar}>
                        <input onChange={fileSelected} type="file" accept="image/*"></input>
                        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
                        <button type="submit">Submit</button>
                    </form>

                    {images.map(image => (
                        <div key={image}>
                            <img src={image}></img>
                        </div>
                    ))}

                    <img src={imagePath}></img>


                    <div className="col bg-white mt-5 mb-5">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className="rounded-circle mt-4" width="150px" src="" />
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
                                                    defaultValue={dayDob}
                                                    ref={day}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="labels"></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="month"
                                                    defaultValue={monthDob}
                                                    ref={month}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="labels"></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="year"
                                                    defaultValue={yearDob}
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
                                                    defaultValue={user.gender}
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
                                                    defaultValue={user.phoneno}
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
                                                    defaultValue={user.address.address1}
                                                    ref={address1}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Address 2</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter address line 2"
                                                    defaultValue={user.address.address2}
                                                    ref={address2}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Region</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Region/State/Province"
                                                    defaultValue={user.address.region}
                                                    ref={region}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="City"
                                                    defaultValue={user.address.city}
                                                    ref={city}
                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <label className="labels">Zip code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Zip code"
                                                    defaultValue={user.address.zipcode}
                                                    ref={zipcode}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Country</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Country"
                                                    defaultValue={user.address.country}
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
                                                cols="50"
                                                defaultValue={user.bio}
                                                ref={bio}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="container">

                    <div className="col bg-white mt-5 mb-5 ">
                        <div className="tabbable ">
                            <h4 className="text-left pt-5 pl-5">Posts</h4>

                            <ul className="nav nav-tabs p-5">
                                <li className="active bg-white ">
                                    <a href="#tab1" data-toggle="tab">Photos</a></li><span>...</span>
                                <li className="active ">
                                    <a href="#tab2" data-toggle="tab">Videos</a></li>
                            </ul>
                            <div className="tab-content ">
                                <div className="tab-pane active" id="tab1">
                                    <section className="gallery p-0 ">
                                        <div className="container-lg">
                                            <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                                                <div className="col">
                                                    <img src="" width="200px" height="200px" className="gallery-item" alt="gallery" />
                                                </div>
                                                <div className="col">
                                                    <img src="" width="200px" height="200px" className="gallery-item" alt="gallery" />
                                                </div>
                                                <div className="col">
                                                    <img src="" width="200px" height="200px" className="gallery-item" alt="gallery" />
                                                </div>
                                                <div className="col">
                                                    <img src="" width="200px" height="200px" className="gallery-item" alt="gallery" />
                                                </div>
                                                <div className="col">
                                                    <img src="" width="200px" height="200px" className="gallery-item" alt="gallery" />
                                                </div>
                                                <div className="col">
                                                    <img src="" width="200px" height="200px" className="gallery-item" alt="gallery" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="gallery-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    {/* <!-- <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> --> */}
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <img src="" className="modal-img" alt="modal img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab2">
                                    <p>Howdy, I'm in Section 2.</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
    onDisplayAlert: () => dispatch(displayAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


