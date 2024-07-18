import React from 'react';
import { Link } from 'react-router-dom';
import './css/HomeSections.css';

const HomeSections = () => {
    return (
        <>
            <div id="rs-services" className="rs-services style16 bg29">
                <div className="container">
                    <div className="section-heading mt-2">
                        <h2 className="entry-title text-left">Our Diocese</h2>
                    </div>
                    <div className="row">
                        {[
                            { src: "images/all-img/3.png", alt: "Priests", link: "/priests", label: "Priests" },
                            { src: "images/all-img/shrine.webp", alt: "Parishes", link: "/parishes", label: "Parishes" },
                            { src: "images/all-img/education.webp", alt: "Educational", link: "/", label: "Educational" },
                            { src: "images/all-img/social.png", alt: "Social", link: "/", label: "Social" },
                            { src: "images/all-img/bible.png", alt: "Commission", link: "/all-commission", label: "Commission" },
                            { src: "images/all-img/shrines.png", alt: "Shrines", link: "/diocesan-shrine", label: "Shrines" }
                        ].map((item, index) => (
                            <div className="col-lg-2 col-md-6 services-column" key={index}>
                                <div className="services-wrap">
                                    <Link to={item.link}>
                                        <img src={item.src} alt={item.alt} className="home-img-section" />
                                        <div className="services-txt">
                                            <h4 className="services-title">
                                                {item.label}
                                            </h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeSections;
