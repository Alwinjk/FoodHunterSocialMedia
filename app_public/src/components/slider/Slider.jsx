import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import './slider.css';

export default class extends Component {


    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
        });

    }


    render() {
        const filesArray = this.props.filesArray;
        console.log("array inside slider component", filesArray);
        return (
            <>
                <div className="container-slider">
                    <div className="slider">
                        <ul className="slides">
                            {
                                filesArray.map((file) => {
                                    console.log("single", file)
                                    return file.map((img, index) => {
                                        console.log("img", img)
                                        return (
                                            <li key={index}>
                                                <img src={img} alt="file" />
                                            </li>
                                        )
                                    })








                                })
                            }

                        </ul>
                    </div>
                </div>
            </>
        );
    }
}
