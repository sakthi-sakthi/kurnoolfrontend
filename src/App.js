import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./home";
import BriefHistory from "./pages/AboutUs/BriefHistory";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/*" element={<MainLayout />}>
          {/* About Us Page Routing */}
            <Route path="history" element={<BriefHistory />} />
          </Route>
      </Routes>
    </>
  );
}

export default App;
