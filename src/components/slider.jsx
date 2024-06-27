import React from 'react';
import './css/swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';

const Slider = ({ sliderdata }) => {
    const Slides = sliderdata?.map((item, index) => {
        return (
            <SwiperSlide key={index}>
                <img src={item?.image} loading='lazy' className="w-100 fixed-height-image" alt="" />
            </SwiperSlide>
        );
    });

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {Slides}
            </Swiper>
        </>
    );
};

export default Slider;
