import React from 'react';


import './frienduser.css';
import img1 from '../../public/images/lake.jpg';
import SingleFeed from '../singlefeed/SingleFeed';
import Topbar from '../topbar/Topbar';

const FriendUserUi = (
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
        <div className="row m-0">
            <div className="col-3">
                <div className="l-cnt">
                    <div className="cnt-label">
                        <i className="l-i" id="l-i-i"></i>
                        <span>BIO</span>
                        <div className="lb-action"></div>
                    </div>

                </div>


            </div>
            <div className="col-6"><SingleFeed /></div>

        </div>
    </section>

)
const FriendUser = () => {




    return (
        <>
            <div className="feed-content">

                <div class="row m-0">

                    <div class="col-2 m-0 p-0"> <Topbar /></div>
                    <div class="col-10 m-0 p-0">{FriendUserUi}</div>

                </div>
            </div>

        </>

    )
}
export default FriendUser;
