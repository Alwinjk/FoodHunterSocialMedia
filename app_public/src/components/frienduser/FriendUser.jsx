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

    </section>

)
const FriendUser = () => {




    return (
        <>
            <div className="feed-content">

                <div class="row m-0">

                    <div class="col-2 m-0 p-0"> <Topbar /></div>
                    <div class="col-10 m-0 p-0">{FriendUserUi}<SingleFeed /></div>

                </div>
            </div>

        </>

    )
}
export default FriendUser;