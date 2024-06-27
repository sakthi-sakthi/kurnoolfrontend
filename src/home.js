import { useEffect, useState } from "react";
import { ApiUrl } from "./components/API/Api";
import Youtube from "./components/Youtube";
import About from "./components/about";
import Footer from "./components/footer";
import Header from "./components/header";
import Scrollbar from "./components/scrollbar";
import Slider from "./components/slider";
import axios from "axios";
import LatestNews from "./components/LatestNews";
import { ThreeDots } from "react-loader-spinner";
import HomeSections from "./components/homesections";
import Whoweare from "./components/Whoweare";
import Borderfooter from "./components/Borderfooter";
function Home() {
  const [homedata, setHomedata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        setHomedata(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
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
            height="60px"
            width="60px"
            color="#0d4571"
            ariaLabel="kurnool-diocese-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />

        </div>
      )}

      {!isLoading && (
        <>
          <Header menudata={homedata?.headerdata} footerdata={homedata?.someotherdata} />
          <Slider sliderdata={homedata?.sliderdata} />
          <Scrollbar projectdata={homedata?.newsdata}/>
          <About />
          <HomeSections />
          <Whoweare />
          <LatestNews projectdata={homedata?.newsdata}/>
          <Youtube gallerydata={homedata?.gallerydata}/>
          <Borderfooter />
          <Footer footerdata={homedata?.footerdata}/>
        </>
      )}
    </>
  );
}

export default Home;
