import React from 'react'

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
                                <a href="/">
                                    <img src="images/all-img/3.png" alt="" />
                                </a>
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <a href="/">Our Priests</a>
                                    </h4>
                                    <div className="serial-number"><p><i className="fa fa-long-arrow-right"></i> More</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-mb-25">
                            <div className="services-wrap">
                                <a href="/">
                                    <img src="images/all-img/shrine.webp" alt="" style={{height:"150px"}} />
                                </a>
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <a href="/">Our Parishes</a>
                                    </h4>
                                    <div className="serial-number"><p><i className="fa fa-long-arrow-right"></i> More</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="services-wrap">
                                <a href="/">
                                    <img src="images/all-img/6.png" alt="" />
                                </a>
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <a href="/">Daily Gospal</a>
                                    </h4>
                                    <div className="serial-number"><p><i className="fa fa-long-arrow-right"></i> More</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-25">
                            <div className="services-wrap">
                                <a href="/">
                                    <img src="images/all-img/donate.webp" alt="" style={{height:"150px"}} />
                                </a>
                                <div className="services-txt">
                                    <h4 className="services-title">
                                        <a href="/">Donate</a>
                                    </h4>
                                    <div className="serial-number"><p><i className="fa fa-long-arrow-right"></i> More</p></div>
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
