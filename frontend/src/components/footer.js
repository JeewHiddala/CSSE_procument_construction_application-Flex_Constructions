import React, { Component } from "react";
import '../components/css/styles.css';

export default class Footer extends Component {

    render() {
        return (


            <div className="footer">
                <div className="row align-items-start align-items-stretch" >
                    <p className="copyright">copyright2019(Flex).All Rights reserved.</p>
                    <div><br/>
                        <div className="row justify-content-start">
                            <div className="col-2">
                                <p> &ensp; https://www.flex.com</p>
                            </div>
                            <div className="col-1">
                                <p>flex@gmail.com</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>



        );
    }
}