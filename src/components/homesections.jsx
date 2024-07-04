import React from 'react';
import { Link } from 'react-router-dom';
const HomeSections = () => {
    return (
        <>
            <div id="rs-services" className="rs-services style16 bg29">
                <div className="container">
                    <div className="section-heading mt-5">
                        <h2 className="entry-title">Our Diocese</h2>
                    </div>
                    <div className="row"> 
                        <div className="col-lg-3 col-md-6 mb-25">
                            <div className="services-wrap">
                                    <img src="images/all-img/3.png" alt="nodata" />
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <Link to="/religious-priest">Our Priests</Link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-mb-25">
                            <div className="services-wrap">
                                    <img src="images/all-img/shrine.webp" alt="nodata" style={{height:"150px"}} />
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <Link to={"/parishes"}>Our Parishes</Link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="services-wrap">
                                    <img src="images/all-img/educational.png" alt="nodata" style={{height:"150px"}} />
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <Link to={'/'}>Educational Apostolate</Link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-25">
                            <div className="services-wrap">
                                    <img src="images/all-img/social.png" alt="nodata" style={{height:"150px"}} />
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <Link to={'/'}>Social Apostolate</Link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeSections
