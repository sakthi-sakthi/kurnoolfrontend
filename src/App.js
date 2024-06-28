import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./home";
import BriefHistory from "./pages/AboutUs/BriefHistory";
import BishopProfile from "./pages/AboutUs/BishopProfile";
import PopeMessage from "./pages/AboutUs/PopeMessage";
import PastoralMessage from "./pages/AboutUs/PastoralMessage";
import BishopProgram from "./pages/AboutUs/BishopProgram";



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
          </Route>
      </Routes>
    </>
  );
}

export default App;
