import { Link } from "react-router-dom";
import React from "react";

function Footer({footerdata}) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="footer-widgets">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="section-heading">
                  <h2 className="entry-title">About Us</h2>
                </div>
                <div className="row" style={{ marginTop: "-19px" }}>
                  <div className="col-4">
                    <img
                      src="images/logos/kurnoollogo.png"
                      alt=""
                      style={{
                        display: "block",
                        maxWidth: "110px",
                        maxHeight: "150px",
                        marginLeft: "-15px",
                      }}
                    />
                  </div>
                  <div className="col-8">
                    <p
                      style={{
                        color: "white",
                        textAlign: "justify ",
                        fontSize: "13px",
                      }}
                    >
                      The Indian history Christianity reveals that Rayalaseema is the cradle of Catholicism in Andhra Pradesh. The two districts of this region Anantapur and kurnool
                    </p>
                  </div>
                  <p
                    style={{
                      color: "white",
                      textAlign: "justify",
                      fontSize: "13px",
                    }}
                  >
                    witness or gave birth to Catholicism in Krishnapuram and Onteddupalle, Polur and Cowlur respectively.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="foot-latest-news">
                  <div className="section-heading">
                    <h2 className="entry-title">Quick Links</h2>
                  </div>

                  <div className="quick-links">
                    <ul>
                      <li>
                        <i className="fa fa-angle-right" />
                        <Link to="https://www.vatican.va/content/vatican/en.html" target="_blank" rel="noopener noreferrer">The Holy See (Vatican)</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" />
                        <Link to="https://cbci.in/#1" target="_blank" rel="noopener noreferrer">Catholic Bishop's Conference of India</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" />
                        <Link to="https://ccbi.in/" target="_blank" rel="noopener noreferrer">Conference of Catholic Bishop's of India</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" />
                        <Link to="https://fabc.org/" target="_blank" rel="noopener noreferrer">Federation of Asian Bishop's Conferences</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" />
                        <Link to="https://www.vatican.va/roman_curia/pontifical_councils/laity/documents/rc_pc_laity_doc_25021999_pclaity_en.html#:~:text=The%20Pontifical%20Council%20for%20the%20Laity%20originated%20from%20a%20proposal,motu%20proprio%C3%82%C3%82%E2%80%9D%20Catholicam%20Christi%20Ecclesiam" target="_blank" rel="noopener noreferrer">Pontifical Council for the Laity</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="foot-contact">
                  <div className="section-heading">
                    <h2 className="entry-title">Contact Us</h2>
                  </div>
                  <div className="contact-us">
                    <ul>
                      <li>
                        <i className="fa fa-map-marker mr-2" />
                        <span>
                          <p
                            style={{
                              color: "#fff",
                              marginLeft: "16px",
                              textAlign: "left",
                            }}
                          >
                            {footerdata?.address}
                          </p>
                        </span>
                      </li>
                      <li>
                        <i className="fa fa-phone mr-2" />
                        <Link to={`tel:${footerdata?.mobile}`}>
                          {footerdata?.mobile}
                        </Link>
                      </li>
                      <li>
                        <i className="fa fa-envelope mr-2" />
                        <Link to={`mailto:${footerdata?.email}`}>
                          {footerdata?.email}
                        </Link>
                      </li>
                      <li>
                        <a
                          href="/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-youtube mr-2" />
                        </a>
                        &nbsp;
                        <a
                          href="/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-instagram mr-2" />
                        </a>
                        &nbsp;
                        <a
                          href="/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook mr-2" />
                        </a>
                        &nbsp;
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fab fa-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="foot-contact">
                  <div className="section-heading">
                    <h2 className="entry-title">Location</h2>
                  </div>
                  <iframe
                    src={footerdata?.googleMapsUrl}
                    width="300"
                    height="200"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="sultanpet"
                    style={{ marginTop: "-30px" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "-17px" }}>
              <p
                className="text-center"
                style={{ fontSize: "12px", color: "white", marginTop:"10px"  }}
              >
                Copyright © {currentYear} Diocese of Kurnool, All
                rights reserved. Powered by
                <a
                  className="tech"
                  style={{ color: "#ffd700", textDecoration: "none" }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.boscosofttech.com/"
                >
                  &nbsp;Boscosofttech
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
