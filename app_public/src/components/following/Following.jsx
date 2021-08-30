import React from 'react';
import './following.css';
import Topbar from '../topbar/Topbar';
import img3 from '../../public/images/man.jpg';


const Following = () => {
    return (
        <>
            <div className="row m-0">
                <div className="col-2 m-0 p-0">
                    <Topbar />
                </div>
                <div className="col-10 mt-5 p-0">

                    <div className="container-akhil">
                        <div className="people-follow">
                            <h1>People you follow</h1>
                        </div>

                        <div className="card-hold">
                            <img src={img3} alt="" />
                            <h1>Ananthu</h1>
                            <span>ananthu@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Ananthu</h1>
                            <span>ananthu@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Sam</h1>
                            <span>sam@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Tony</h1>
                            <span>tony@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Vishnu</h1>
                            <span>vishnu@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Jibu</h1>
                            <span>jibu@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>David</h1>
                            <span>david@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>roney</h1>
                            <span>roney@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Job</h1>
                            <span>job@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                        <div className="card-hold"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="prof" />
                            <h1>Akhil</h1>
                            <span>akhil@gmail.com</span>
                            <p>pala</p>

                            <button>Unfollow</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Following;