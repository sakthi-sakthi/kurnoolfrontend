import React, { useEffect, useState } from "react";
import Footer from "./../components/footer";
import { Outlet } from "react-router-dom";
import Header from "./../components/header";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { ApiUrl } from "../components/API/Api";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [Homedata, setHomedata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("HomeData");
        if (storedData) {
          setHomedata(JSON.parse(storedData));
        } else {
          const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
          localStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
          setHomedata(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ThreeDots
          visible={true}
          height="70"
          width="70"
          color="#012c6d"
          ariaLabel="sultanpet-diocese-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <Header menudata={Homedata?.headermenudata} />
      <div style={{ minHeight: "66.5vh", padding: "10px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
