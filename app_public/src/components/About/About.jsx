import React from 'react';
import './about.css';
import Topbar from '../topbar/Topbar';



const Following = () => {
    return (
        <>
            <div className="row m-0">
                <div className="col-2 m-0 p-0">
                    <Topbar />
                </div>
                <div className="about-section">
                    <div className="inner-container">
                        <h1>About Us</h1>
                        <p className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit ducimus, enim inventore earum, eligendi nostrum pariatur necessitatibus eius dicta a voluptates sit deleniti autem error eos totam nisi neque voluptates sit deleniti autem error eos totam nisi neque.
                        </p>
                        <div className="skills">
                            <span>Web Design</span>
                            <span>Photoshop & Illustrator</span>
                            <span>Coding</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Following;