import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="home-page-welcome">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 order-2 order-lg-1">
              <div className="welcome-content">
                <header className="entry-header">
                  <h2 className="entry-title">
                    Welcome to the Diocese of Kurnool
                  </h2>
                </header>
                <div className="entry-content mt-2">
                  The Diocese of Kurnool originated from the bigger diocese of
                  Nellore on the 12th of June 1967 with Rev. Msgr. Joseph
                  Rajappa as its first bishop. It covers the Kurnool, Nandyal,
                  Sathysai, and Anantapur districts. Jesuits laid the foundation
                  of the Catholic faith in this region in 1700s. After their
                  suppression, evangelization, and community works were adhered
                  to by MEP and Mill Hill missionaries and other missionaries
                  who helped spread Catholicism and support the community.
                  Successive bishops and administrators from 1967 to the
                  present, including Rev. Msgr. Joseph Rajappa, Cherian Kunnel,
                  Aruliah, Bishop Johannes Sr., Msgr. Chowrappa and Rev. Msgr.
                  Anthony Poola, bolstered faith and action in the diocese by
                  establishing new parishes, schools, and community centers and
                  initiating welfare programs for the poor and marginalized. The
                  leadership of late Bishop Johannes Sr., and later Rev. Msgr.
                  Anthony Poola, saw the diocese grow in education and social
                  welfare.
                </div>
                <center>
                  <Link to="/aboutus">
                    <button className="brown-button">Read More</button>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
