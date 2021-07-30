import React from 'react';


import './frienduser.css';
import img1 from '../../public/images/lake.jpg';
import SingleFeed from '../singlefeed/SingleFeed';


const FriendUser = () => {





    return (
        <>
            <section>


                <div className="content-profile-page">
                    <div className="profile-user-page card">
                        <div className="img-user-profile">
                            <img className="profile-bgHome" src={img1} />
                            <img className="avatar" src="" />
                        </div>

                        <div className="user-profile-data">
                            {/* user name */}
                            <h1>Ananthu </h1>
                            <p>User since 2021</p>
                        </div>

                        <ul className="data-user">
                            <li><a><span>Posts</span></a></li>
                            <li><a><span>Follow</span></a></li>
                            <li><a><span>Following</span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="row m-0">
                    <div class="col-3">
                        <div class="l-cnt">
                            <div class="cnt-label">
                                <i class="l-i" id="l-i-i"></i>
                                <span>BIO</span>
                                <div class="lb-action"></div>
                            </div>
                            <div id="i-box">


                                {/* bio */}
                                <div id="friend-bio"> Hai iam Ananthu Purushothaman .Iam a Web Development Student. Please follow my FoodHunter website .</div>
                                <div id="u-loc"><i class="material-icons">location_on</i><a href="#">Bengaluru</a>, <a href="#">India</a></div>
                            </div>
                        </div>


                    </div>
                    <div class="col-6"><SingleFeed /></div>

                </div>
            </section>
        </>

    )
}
export default FriendUser;
