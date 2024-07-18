import React, { useEffect, useState } from 'react';
import './css/whoweare.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from './API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Whoweare = () => {
    const [activeTab, setActiveTab] = useState('bishop4');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        axios.get(`${ApiUrl}/get/messages/3`)
            .then((response) => {
                setLoading(false);
                if (response.data.success && response.data.data.length > 0) {
                    setMessage(response.data.data[0].content);
                } else {
                    setNoData(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching message:', error);
                setLoading(false);
                setNoData(true);
            });
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="vh-section-outer section-bg" id="whoweare" style={{ backgroundImage: 'url("images/all-img/download.svg")' }}>
                <div className="section-inner">
                    <div className="container">
                        <div className="section-heading">
                            <h2 className="entry-title text-white mt-3">Who We Are</h2>
                        </div>
                        <div className="row">
                            <div className="tabSection">
                                <ul className="nav nav-pills" role="tablist">
                                    <li role="presentation" className={`category-link ${activeTab === 'bishop4' ? 'active' : ''}`}>
                                        <a
                                            href="/"
                                            onClick={() => handleTabClick('bishop4')}
                                            data-bs-target="#bishop4"
                                            aria-controls="bishop4"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            <p className="hidden-xs">Bishop Profile</p>
                                        </a>
                                    </li>
                                    <li role="presentation" className={`category-link ${activeTab === 'message3' ? 'active' : ''}`}>
                                        <a
                                            href="/"
                                            onClick={() => handleTabClick('message3')}
                                            data-bs-target="#message3"
                                            aria-controls="message3"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            <p className="hidden-xs">Bishop Message</p>
                                        </a>
                                    </li>
                                    <li role="presentation" className={`category-link ${activeTab === 'history1' ? 'active' : ''}`}>
                                        <a
                                            href="/"
                                            onClick={() => handleTabClick('history1')}
                                            data-bs-target="#history1"
                                            aria-controls="history1"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            <p className="hidden-xs text-black">History</p>
                                        </a>
                                    </li>
                                    <li role="presentation" className={`category-link ${activeTab === 'mission2' ? 'active' : ''}`}>
                                        <a
                                            href="/"
                                            onClick={() => handleTabClick('mission2')}
                                            data-bs-target="#mission2"
                                            aria-controls="mission2"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            <p className="hidden-xs text-black">Our Motto</p>
                                        </a>
                                    </li>
                                    <li role="presentation" className={`category-link ${activeTab === 'vision3' ? 'active' : ''}`}>
                                        <a
                                            href="/"
                                            onClick={() => handleTabClick('vision3')}
                                            data-bs-target="#vision3"
                                            aria-controls="vision3"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            <p className="hidden-xs text-black">Vision</p>
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {activeTab === 'history1' && (
                                        <div id="history1" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <img src="images/all-img/madha.png" id='bishopimagesnew' style={{ width: '100%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px', padding: '10px' }} alt="" className="img-responsive" />
                                                </div>
                                                <div className="col-lg-9 custom-scrollbar">
                                                    <p style={{ textAlign: 'justify', fontSize: '16px', lineHeight: '25px', letterSpacing: '0.5px' }}>
                                                        The Diocese of Kurnool, situated in Kurnool town (Kandenavolu), which was once the first capital of the United States of Andhra Pradesh and Telangana, serves as the gateway to the Rayalaseema region and encompasses the Kurnool, Nandyal, Sathysai, and Anantapur districts in Andhra Pradesh, India. Originating from the larger Diocese of Nellore, it was officially established on June 12, 1967, with the appointment of Rev. Msgr. Joseph Rajappa as its inaugural bishop. The onset of Catholicism in the Rayalaseema region can be traced back to the arrival of Jesuits in the early 1700s, who laid the groundwork for the propagation of faith.
                                                        <br />
                                                        <br />
                                                        Individuals such as Rangappa and Thumma Rayaappa Reddy embraced the Catholic faith, marking the origins of Telugu Catholics in the region. Following the suppression of Jesuits in 1773, other missionary groups, including the Paris Foreign Missionary Society and the Mill Hill Fathers, continued to propagate the faith and engage in various temporal and spiritual undertakings. After centuries of missionary work and two decades post-India's independence, the Diocese of Kurnool came into existence.
                                                        <br />
                                                        <br />
                                                        Successive bishops, including Joseph Rajappa, Mathew Cherian Kunnel PIME, and Aruliah, were instrumental in furthering missionary activities, executing projects to promote the faith, and supporting local congregations through educational, healthcare, and community initiatives. Under the leadership of Bishop Johannes Sr., new parishes, churches, the Sinai Retreat Center, St. John’s Residential School, rectories, convents, and community centers were established, accompanied by self-employment initiatives benefiting the disadvantaged.
                                                        The celebrations of "Yesu Christu Jayanti 2000" were grandly observed, followed by a synod aimed at charting a course for the future. Upon the sudden demise of Bishop Johannes in 2007, Rev. Msgr. Chowrappa temporally assumed the diocesan responsibilities until the appointment of Rev. Msgr. Anthony Poola in 2008. Under his leadership, the diocese saw the establishment of new parishes, churches, rectories, and a prominent school and boarding facility at Gadivemula.</p>

                                                    <p style={{ textAlign: 'justify', fontSize: '16px', lineHeight: '25px', letterSpacing: '0.5px' }}>
                                                        Subsequently, following Rev. Msgr. Poola's transition to the role of Archbishop of Hyderabad and the first Cardinal from the Telugu region, Rev. Msgr. Chowrappa again assumed the temporary leadership of the diocese for four years. After a subsequent four-year vacancy, Pope Francis appointed Rev. Msgr. Gorantla Johannes OCD as the 5th Bishop of the Diocese of Kurnool. His consecration on April 24, 2024, heralded a new era for the diocese.
                                                        Bishop Johannes brings a wealth of expertise as a linguist, renowned scholar, and prolific writer on Carmelite spirituality, biblical religious and spiritual matters, and holds a Doctorate in Biblical Theology with ongoing pursuits towards another doctoral degree in spiritual theology. His extensive experience includes serving as the Provincial of Andhra Province of OCD on two occasions, a parish priest in Hyderabad, Presidency of the AP RCRI, and impactful roles in various commissions, along with serving as a Rector and Assistant General in Rome, coupled with teaching scripture at prestigious institutes.
                                                        <br />
                                                        <br />
                                                        With Bishop Johannes's profound knowledge, intellectual acumen, extensive experience, and steadfast leadership, the Diocese of Kurnool is poised to make a meaningful impact both locally and globally within the Catholic Church. Encompassing an area of around 43,000 km² or 16,602 square miles, with a predominantly Telugu-speaking population of approximately 10.37 million. The diocese has 105,219 Catholics. The diocese is organized into 5 vicariates or deaneries, with 69 parishes, 4 quasi-parishes, and 273 mission stations. It comprises 85 diocesan priests, 70 religious priests, 14 seminarians, 14 religious brothers, 438 religious sisters, and 278 catechists. Bishop Johannes's leadership is anticipated to further the Diocese of Kurnool's advancement and its contributions to the global Catholic Church.
                                                        The diocese has 83 schools including 39 primary schools, 40 high schools, and 4 colleges as well as 69 social service institutions covering hospitals, medical centers, and hostels.  Religious congregations operate an additional 62 schools consisting of 39 primary schools, 20 high schools, and 3 colleges. Every year the diocese welcomes 1907 baptisms and 241 marriages in the Church. Around 70% of people attend the Sunday masses across the parishes in the Diocese. There are 380 lay associations, including the Legion of Mary and the St. Vincent de Paul Society.
                                                        <br />
                                                        <br />
                                                        The Diocese of Kurnool is often overlooked, but it has played a crucial role in the history of Catholicism in Andhra Pradesh. Over the years, it has diligently worked to grow the community and maintain a strong faith despite facing many challenges. This couldn't have been achieved without the dedicated shepherds, administrators, clergy, consecrated men and women, as well as the members of the community.
                                                    </p>

                                                    <Link to="/history" className="btn btn-primary" id='btnmore'>
                                                        More Information
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'mission2' && (
                                        <div id="mission2" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <h5 style={{ textAlign: 'center', fontSize: '16px', lineHeight: '25px', letterSpacing: '0.5px' }}>"Your grace is sufficient for me"</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'vision3' && (
                                        <div id="vision3" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <h5 style={{ textAlign: 'center', fontSize: '16px', lineHeight: '25px', letterSpacing: '0.5px' }}>"Our vision is to provide support and care for the community"</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'bishop4' && (
                                        <div id="bishop4" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <img src="images/all-img/newbishop.jpeg" alt="" className="img-fluid" id='bishopimagesnew' style={{ width: '90%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px', padding: '10px' }} />
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="d-none d-lg-block row">
                                                        <div className="col-12">
                                                            <h4>Most Rev. Gorantla Johannes, OCD</h4>
                                                        </div>
                                                    </div>
                                                    <div className="d-lg-none">
                                                    </div>
                                                    <div className="d-none d-lg-block row">
                                                        <div className="col-12">
                                                            <p>Bishop of Kurnool Diocese</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-lg-none">
                                                    </div>
                                                    <div className="row justify-content-between">
                                                        <div className="col-6">
                                                            <dl>
                                                                <dt><i className="fa fa-user"></i> Bishop Name:</dt>
                                                                <dd>Most Rev. Gorantla Johannes, OCD</dd>

                                                                <dt><i className="fa fa-birthday-cake"></i> Date of Birth:</dt>
                                                                <dd>27 Feb 1974</dd>

                                                                <dt><i className="fa fa-map-marker"></i> Place of Birth:</dt>
                                                                <dd>Nawabupeta, in the diocese of Vijayawada</dd>

                                                                <dt><i className="fa fa-language"></i> Languages Spoken:</dt>
                                                                <dd>Telugu, Hindi, Malayalam, English, Italian, German and Spanish</dd>

                                                                <dt><i className="fa fa-users"></i> Parents Name:</dt>
                                                                <dd>Gorantla Chinnappa and Rojanamma</dd>
                                                            </dl>
                                                        </div>
                                                        <div className="col-6">
                                                            <dl>
                                                                <dt><i className="fa fa-calendar-o"></i> Ordination Date:</dt>
                                                                <dd>10 January 2002</dd>

                                                                <dt><i className="fa fa-book"></i> Studies:</dt>
                                                                <dd>
                                                                    <li>BA Philosophy (Gold Medal in MG University, Kerala)</li>
                                                                    <br />
                                                                    <li>B. Th from Teresianum, Rome</li>
                                                                    <br />
                                                                    <li>Licentiate in Sacred Scripture SSL from Biblicum, Rome.</li>
                                                                    <br />
                                                                    <li>Doctorate in Biblical Theology STD from the Gregorian University, Rome.</li>
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <Link to="/bishop-profile" className="btn btn-primary" id='btnmore'>
                                                                View More
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'message3' && (
                                        <div id="message3" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <img
                                                        src="images/all-img/newbishop.jpeg"
                                                        alt=""
                                                        className="img-fluid"
                                                        id='bishopimagesnew'
                                                        style={{
                                                            width: '90%',
                                                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                            borderRadius: '10px',
                                                            padding: '10px'
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-lg-9 custom-scrollbar" style={{ overflowY: 'auto', maxHeight: '380px' }}>
                                                    {loading ? (
                                                        <div className="text-center">
                                                            <div className="spinner-border text-primary" role="status">
                                                                <span className="sr-only"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></span>
                                                            </div>
                                                        </div>
                                                    ) : noData ? (
                                                        <div className="text-center">
                                                            <p className="mt-2 ml-3">No bishop message available</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="message-content"
                                                            style={{
                                                                textAlign: 'justify',
                                                                fontSize: '16px',
                                                                lineHeight: '25px',
                                                                letterSpacing: '0.5px',
                                                                paddingRight: '15px'
                                                            }}
                                                            dangerouslySetInnerHTML={{ __html: message }}
                                                        />
                                                    )}
                                                    {!noData && (
                                                        <Link to="/pastoral-message" className="btn btn-primary" id='btnmore'>
                                                            View More
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Whoweare;
