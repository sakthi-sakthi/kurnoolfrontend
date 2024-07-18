import React, { useState } from "react";
import "./css/profile.css";

const BishopProfile = () => {
  const [activeTab, setActiveTab] = useState("bishop4");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="vh-section-outer section-bg" id="whoweare">
        <div className="section-inner">
          <div className="container">
            <div className="section-heading">
              <h3 className="mb-4 text-center">Bishop Profile</h3>
            </div>
            <div className="row">
              <div className="tabSection">
                <ul className="nav nav-pills" role="tablist">
                  <li
                    role="presentation"
                    className={`category-link ${
                      activeTab === "bishop4" ? "active" : ""
                    }`}
                  >
                    <a
                      href="/"
                      onClick={() => handleTabClick("bishop4")}
                      data-bs-target="#bishop4"
                      aria-controls="bishop4"
                      role="tab"
                      data-toggle="tab"
                    >
                      <p className="hidden-xs">
                        Bishop Profile <i className="fa fa-user"></i>
                      </p>
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className={`category-link ${
                      activeTab === "study1" ? "active" : ""
                    }`}
                  >
                    <a
                      href="/"
                      onClick={() => handleTabClick("study1")}
                      data-bs-target="#study1"
                      aria-controls="study1"
                      role="tab"
                      data-toggle="tab"
                    >
                      <p className="hidden-xs text-black">
                        Studies <i className="fa fa-book"></i>
                      </p>
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className={`category-link ${
                      activeTab === "offices2" ? "active" : ""
                    }`}
                  >
                    <a
                      href="/"
                      onClick={() => handleTabClick("offices2")}
                      data-bs-target="#offices2"
                      aria-controls="offices2"
                      role="tab"
                      data-toggle="tab"
                    >
                      <p className="hidden-xs text-black">
                        Offices <i className="fa fa-building"></i>
                      </p>
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className={`category-link ${
                      activeTab === "publication3" ? "active" : ""
                    }`}
                  >
                    <a
                      href="/"
                      onClick={() => handleTabClick("publication3")}
                      data-bs-target="#publication3"
                      aria-controls="publication3"
                      role="tab"
                      data-toggle="tab"
                    >
                      <p className="hidden-xs text-black">
                        Publications <i className="fa fa-book"></i>
                      </p>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  {activeTab === "study1" && (
                    <div id="study1" className="tab-pane active">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead className="thead-dark">
                                <tr>
                                  <th>S.No</th>
                                  <th>Degree</th>
                                  <th>Institute</th>
                                  <th>Location</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>BA Philosophy</td>
                                  <td>Gold Medal in MG University</td>
                                  <td>Kerala</td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>B. Th</td>
                                  <td>Teresianum</td>
                                  <td>Rome</td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>Licentiate in Sacred Scripture SSL</td>
                                  <td>Biblicum</td>
                                  <td>Rome</td>
                                </tr>
                                <tr>
                                  <td>4</td>
                                  <td>Doctorate in Biblical Theology STD</td>
                                  <td>Gregorian University</td>
                                  <td>Rome</td>
                                </tr>
                                <tr>
                                  <td>5</td>
                                  <td>Doctorate in Spiritual Theology</td>
                                  <td>-</td>
                                  <td>-</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "offices2" && (
                    <div id="offices2" className="tab-pane active">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead className="thead-dark">
                                <tr>
                                  <th>Period</th>
                                  <th>Role</th>
                                  <th>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>2008-2014</td>
                                  <td>Provincial, Andhra Province</td>
                                  <td>Andhra Province</td>
                                </tr>
                                <tr>
                                  <td>2014-2015</td>
                                  <td>Superior and Parish Priest</td>
                                  <td>Nacharam, Archdiocese of Hyderabad</td>
                                </tr>
                                <tr>
                                  <td>2010-2014</td>
                                  <td>President</td>
                                  <td>AP RCRI</td>
                                </tr>
                                <tr>
                                  <td>2008-2014</td>
                                  <td>Consulter</td>
                                  <td>Diocese of Khammam</td>
                                </tr>
                                <tr>
                                  <td>2008-2014</td>
                                  <td>Member</td>
                                  <td>APBC Bible Commission</td>
                                </tr>
                                <tr>
                                  <td>2008-2014</td>
                                  <td>Member</td>
                                  <td>APBC Commission for Proclamation</td>
                                </tr>
                                <tr>
                                  <td>2010-2014</td>
                                  <td>Vice Chairman</td>
                                  <td>
                                    APBC Commission for Catholic Education
                                  </td>
                                </tr>
                                <tr>
                                  <td>2015-2021</td>
                                  <td>Asst. General</td>
                                  <td>Discalced Carmelites, Rome</td>
                                </tr>
                                <tr>
                                  <td>2022-Feb-2024</td>
                                  <td>Rector</td>
                                  <td>
                                    Seminarium Missionum, Teresianum, Rome;
                                    Visiting professor at Marianum and
                                    Teresianum, Pontifical Institutes
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td>Feb-2022 - Present</td>
                                  <td>Bishop of Kurnool</td>
                                  <td>
                                    Currently pursuing second doctorate in
                                    Spiritual Theology
                                  </td>
                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "publication3" && (
                    <div id="publication3" className="tab-pane active">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead className="thead-dark">
                                <tr>
                                  <th>Language</th>
                                  <th>Title</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Telugu</td>
                                  <td>
                                    Series on Carmelite Spirituality (5 volumes)
                                  </td>
                                  <td>
                                    Includes "Paripurnatha Margamu," translation
                                    with commentary on "The Way of Perfection"
                                    by St. Teresa of Avila
                                  </td>
                                </tr>
                                <tr>
                                  <td>English</td>
                                  <td>Riches: A Blessing or a Curse</td>
                                  <td>
                                    An exegetical and theological commentary on
                                    some parables of Luke, published by St.
                                    Paul’s in 2022
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "bishop4" && (
                    <div id="bishop4" className="tab-pane active">
                      <div className="row">
                        <div className="col-lg-3">
                          <img
                            src="images/all-img/newbishop.jpeg"
                            alt=""
                            className="img-fluid"
                            id="bishopimagesnew"
                            style={{
                              width: "90%",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                              borderRadius: "10px",
                              padding: "10px",
                            }}
                          />
                        </div>
                        <div className="col-lg-9">
                          <div className="row">
                            <div className="col-12">
                              <h4>Most Rev. Gorantla Johannes, OCD</h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <p>Bishop of Kurnool Diocese</p>
                            </div>
                          </div>
                          <div className="row justify-content-between">
                            <div className="col-6">
                              <dl>
                                <dt>
                                  <i className="fa fa-user"></i> Bishop Name:
                                </dt>
                                <dd>Most Rev. Gorantla Johannes, OCD</dd>

                                <dt>
                                  <i className="fa fa-birthday-cake"></i> Date
                                  of Birth:
                                </dt>
                                <dd>27 Feb 1974</dd>

                                <dt>
                                  <i className="fa fa-map-marker"></i> Place of
                                  Birth:
                                </dt>
                                <dd>
                                  Nawabupeta, in the diocese of Vijayawada
                                </dd>

                                <dt>
                                  <i className="fa fa-language"></i> Lanugages
                                  Spoken:
                                </dt>
                                <dd>
                                  Telugu, Hindi, Malayalam, English, Italian,
                                  German and Spanish
                                </dd>
                                <dt>
                                  <i className="fa fa-users"></i> Parents Name:
                                </dt>
                                <dd>Gorantla Chinnappa and Rojanamma</dd>
                              </dl>
                            </div>
                            <div className="col-6">
                              <dl>
                                <dt>
                                  <i className="fa fa-calendar-o"></i>{" "}
                                  Ordination Date:
                                </dt>
                                <dd>10 January 2002</dd>

                                <dt>
                                  <i className="fa fa-book"></i> Studies:
                                </dt>
                                <dd>
                                  <li>
                                    BA Philosophy (Gold Medal in MG University,
                                    Kerala)
                                  </li>
                                  <br />
                                  <li>B. Th from Teresianum, Rome</li>
                                  <br />
                                  <li>
                                    Licentiate in Sacred Scripture SSL from
                                    Biblicum, Rome.
                                  </li>
                                  <br />
                                  <li>
                                    Doctorate in Biblical Theology STD from the
                                    Gregorian University, Rome.
                                  </li>
                                </dd>
                              </dl>
                            </div>
                          </div>
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
};

export default BishopProfile;
