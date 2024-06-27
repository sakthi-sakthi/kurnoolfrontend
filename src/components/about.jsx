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
                  The Indian history Christianity reveals that Rayalaseema is the cradle of Catholicism in Andrah Pradesh. The two districts of this region Anantapur and kurnool witness or gave birth to Catholicism in Krishnapuram and Onteddupalle, Polur and Cowlur respectively. The Karnatic Jesuit missionaries sowed the seeds of Christianity in these villages from 1700. They also contributed extensively to Telugu Christian literature. It is recorded that the 1st person accepted Christ in Andra Prades was Rangappa of Sale Caste. Later in 1718 Thumma Rayaappa Reddy was baptized by Fr. LeeGac. As the Holy relics of the Carnatic mission today, we have three tombs of Jesuit missionaries in Krshnapuram.
                </div>

                <center>
                  <Link to="/">
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
