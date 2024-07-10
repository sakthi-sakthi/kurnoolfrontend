import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./home";
import BriefHistory from "./pages/AboutUs/BriefHistory";
import BishopProfile from "./pages/AboutUs/BishopProfile";
import PopeMessage from "./pages/AboutUs/PopeMessage";
import PastoralMessage from "./pages/AboutUs/PastoralMessage";
import BishopProgram from "./pages/AboutUs/BishopProgram";
import Commission from "./pages/TheDiocese/Commission";
import ReligiousData from "./pages/ReligiousCongregation/ReligiousData";
import ReligiousPriest from "./pages/ReligiousCongregation/Details/ReligiousPriest";
import ReligiousSisters from "./pages/ReligiousCongregation/ReligiousSisters";
import Institutions from "./pages/Institutions/Institutions";
import AllLatestNews from "./pages/LatestNews/AllLatestNews";
import AllFlashNews from "./pages/LatestNews/AllFlashNews";
import Gallery from "./pages/Multimedia/Gallery";
import Videos from "./pages/Multimedia/Videos";
import Articles from "./pages/Multimedia/Articles";
import Newsletter from "./pages/Multimedia/Newsletter";
import Activities from "./pages/Activity/Activities";
import AllActivity from "./pages/Activity/AllActivity";
import Contact from "./pages/Contact/Contact";
import Calendar from "./pages/Calendar/Calendar";
import News from "./pages/News/News";
import NotFound from "./NotFound";
import AllNews from "./pages/News/AllNews";
import AllCommissions from "./pages/Commissions/AllCommissions";
import EducationCommission from "./pages/TheDiocese/EducationCommission";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/*" element={<MainLayout />}>
          {/* About Us Page Routing */}
            <Route path="history" element={<BriefHistory />} />
            <Route path="bishop-profile" element={<BishopProfile />} />
            <Route path="pope-message" element={<PopeMessage />} />
            <Route path="pastoral-message" element={<PastoralMessage />} />
            <Route path="bishop-program" element={<BishopProgram />} />
            <Route path="diocesan-curia" element={<BriefHistory />} />
            <Route path="aboutus" element={<BriefHistory />} />
            <Route path="college-consult" element={<BriefHistory />} />
            <Route path="senate-members" element={<BriefHistory />} />
            <Route path="marriage-tribunal" element={<BriefHistory />} />
            <Route path="birthday-calendar" element={<BriefHistory />} />
            <Route path="ordination-calendar" element={<BriefHistory />} />
            <Route path="necrology" element={<BriefHistory />} />
            {/* The Diocese Page Routing */}
            <Route path="parishes" element={<Commission />} />
            <Route path="pastoral-commission" element={<Commission />} />
            <Route path="education-commission" element={<EducationCommission />} />
            <Route path="social-service-commission" element={<Commission />} />
            <Route path="youth-commission" element={<Commission />} />
            <Route path="deaneries" element={<Commission />} />
            <Route path="cathedral" element={<Commission />} />
            <Route path="diocesan-shrine" element={<Commission />} />
            <Route path="joharapuram" element={<Commission />} />
            <Route path="guntakal" element={<Commission />} />
            <Route path="maddikera" element={<Commission />} />
            <Route path="nandikotkur" element={<Commission />} />
            <Route path="chapirevula" element={<Commission />} />
            <Route path="premagiri" element={<Commission />} />
            <Route path="srisailam" element={<Commission />} />
            <Route path="yathrikulamatha" element={<Commission />} />
            <Route path="krishnapuram" element={<Commission />} />
            <Route path="seminarians" element={<Commission />} />
            {/* Religious Congregation Page Routing */}
            <Route path="religious-priest" element={<ReligiousData />} />
            <Route path="detail-priest" element={<ReligiousPriest />} />
            <Route path="religious-sisters" element={<ReligiousSisters />} />
            {/* Institutions Page Routing */}
            <Route path="destitute-home" element={<Institutions />} />
            <Route path="old-age-home" element={<Institutions />} />
            <Route path="hospital-dispen" element={<Institutions />} />
            <Route path="leprosy-centre" element={<Institutions />} />
            <Route path="mental-retired-home" element={<Institutions />} />
            <Route path="handicapped-home" element={<Institutions />} />
            <Route path="ecclesiastical" element={<Institutions />} />
            <Route path="boarding-homes" element={<Institutions />} />
            <Route path="colleges" element={<Institutions />} />
            <Route path="elementary-schools" element={<Institutions />} />
            <Route path="high-schools" element={<Institutions />} />
            <Route path="technical-training-school" element={<Institutions />} />
            {/* All Latest News Page Routing */}
            <Route path="all-latest-news" element={<AllLatestNews />} />
            <Route path="all-flash-news" element={<AllFlashNews />} />
            {/* Multimedia Page Routing */}
            <Route path="gallery" element={<Gallery />} />
            <Route path="video-song" element={<Videos />} />
            <Route path="articles" element={<Articles />} />
            <Route path="newsletter" element={<Newsletter />} />
            {/* Activity Page Routing */}
            <Route path="activity" element={<Activities />} />
            <Route path="all-activity" element={<AllActivity />} />
            {/* Contact Us Page Routing */}
            <Route path="contactus" element={<Contact />} />
            {/* Calendar Page Routing  */}
            <Route path="calendar" element={<Calendar />} />
            {/* News Page Routing */}
            <Route path="news" element={<News />} />
            <Route path="allnews" element={<AllNews />} />
            <Route path="all-commission" element={<AllCommissions />} />
            {/* Default Page Routing */}
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </>
  );
}

export default App;
