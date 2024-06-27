import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./home";
import Contact from "./pages/Contact/Contact";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<MainLayout />}>
         
          <Route path="contactus" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
