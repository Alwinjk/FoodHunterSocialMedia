import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import img1 from '../../public/images/fast-food.png';

const Topbar = ({ user }) => {

    return (
        <>
            <div className="function-nav">
                <div className="nav-true">
                    <div className="hover-top">
                        <a className="navbar-brand" href="#">
                            <img src={img1} alt="" width="70" height="70" />
                            <p>FoodHunter</p>
                        </a>
                        <Link className=" auto-link" to='/dashboard'><i style={{ color: "#0d6efd" }} className="material-icons">house</i>FoodHunter</Link>
                        <Link className=" auto-link" aria-current="page" to={{ pathname: `/profile/${user._id}` }}><i style={{ color: "#0d6efd" }} className="material-icons">person</i>
                            Profile
                        </Link>
                        <Link className=" auto-link" to='/dashboard'><i style={{ color: "#0d6efd" }} className="material-icons">emoji_people</i>About Us</Link>
                        <Link className=" auto-link" to='/dashboard'><i style={{ color: "#0d6efd" }} className="material-icons">contact_support</i>Contact</Link>
                        <Link className=" auto-link" to='/view-following'><i style={{ color: "#0d6efd" }} className="material-icons">people_outline</i>Following</Link>
                        <Link className=" auto-link" to='/dashboard'><i style={{ color: "#0d6efd" }} className="material-icons">logout</i>Logout</Link>


                    </div>
                </div>
            </div>
        </>

    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Topbar);


