import React, { useState, useEffect, useRef, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Modal, ModalBody } from 'react-bootstrap';
import Slider from 'react-slick';
import { ApiUrl } from '../../components/API/Api';

const TabWrapper = styled.div`
  background-color: #f8f8f8;
`;

const StyledTabList = styled.div`
  display: flex;
  background-color: #e6e6e6;
  margin: 0;
  padding: 0;
`;

const StyledTab = styled.div`
  flex: 1;
  text-align: center;
  padding: 15px;
  background-color: ${(props) => (props.isSelected ? '#012c6d' : '#f6c93f')};
  color: ${(props) => (props.isSelected ? '#f6c93f' : '#000')};
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.3s;
  &:hover {
    background-color: #012c6d;
    color: #f6c93f;
  }
`;

const StyledTabPanel = styled.div`
  overflow-y: hidden;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #333;
  margin-top: 10px;
  transition: overflow-y 0.3s;
  &:hover {
    overflow-y: auto;
  }
`;

const Media = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [channelVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const sliderRef = useRef(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedTab === 0 && videos.length === 0) {
                    const response = await axios.get(`${ApiUrl}/get/vedios`);
                    const data = response?.data?.data;

                    const videosResponse = await axios.get(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${data.channelid}&maxResults=${data.counts}&order=date&type=video&key=${data.apikey}`
                    );

                    setVideos(videosResponse.data.items);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedTab, videos]);

    const fetchGalleryImages = async () => {
        try {
            const response = await axios.get(`${ApiUrl}/get/gallery_images`);
            const groupedCategories = response.data.data.reduce((acc, item) => {
                const category = acc.find((cat) => cat.title === item.title);

                if (category) {
                    category.images.push(item.image);
                } else {
                    acc.push({
                        title: item.title,
                        images: [item.image],
                        date: item.date,
                    });
                }

                return acc;
            }, []);

            groupedCategories.sort((a, b) => b.date - a.date);

            setCategories(groupedCategories);
        } catch (error) {
            console.error('Error fetching gallery images:', error);
        }
    };

    const handleThumbnailClick = (category) => {
        setSelectedCategory(category);
        setModalImages(category.images);
        setModalShow(true);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    };

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    const VideoItem = React.memo(({ video }) => (
        <div className="col-md-3">
            <div style={{ position: 'relative', cursor: 'pointer' }}>
                <YouTube videoId={video.id.videoId} opts={{ width: '100%', height: '200px' }} />
                <p>{video.snippet.title}</p>
            </div>
        </div>
    ));

    const videoGallery = useMemo(() => (
        <div className="row">
            {videos?.map((video, index) => (
                <VideoItem key={index} video={video} />
            ))}
        </div>
    ), [videos]);

    const imageGallery = useMemo(() => {
        return (
            <div className="row">
                {categories?.map((category, catIndex) => (
                    <div key={catIndex} className="col-md-3 mb-3">
                        <div style={{ position: 'relative' }}>
                            <img
                                src={category?.images[0]}
                                alt={`${category?.title} Thumbnail`}
                                className="img-thumbnail fixed-thumbnail"
                                onClick={() => handleThumbnailClick(category)}
                                style={{ cursor: 'pointer', width: '230px', height: '200px' }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    padding: '5px',
                                    borderRadius: '5px',
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: 'bold' }}>{category.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }, [categories]);

    const tabContent = [
        {
            title: 'Video Gallery',
            content: videoGallery,
            lazyLoad: () => {
                if (selectedTab === 0 && channelVideos.length === 0) {
                    // fetchChannelVideos(); // Assuming fetchChannelVideos function is defined
                }
            },
        },
        {
            title: 'Image Gallery',
            content: imageGallery,
            lazyLoad: () => {
                if (selectedTab === 1 && categories.length === 0) {
                    fetchGalleryImages();
                }
            },
        },
    ];

    useEffect(() => {
        const lazyLoadFunction = tabContent[selectedTab]?.lazyLoad;
        if (lazyLoadFunction) {
            lazyLoadFunction();
        }
    },);

    return (
        <>
            <TabWrapper>
                <br />
                <div className="container">
                    <StyledTabList>
                        {tabContent.map((tab, index) => (
                            <StyledTab key={index} isSelected={selectedTab === index} onClick={() => setSelectedTab(index)}>
                                {tab.title}
                            </StyledTab>
                        ))}
                    </StyledTabList>

                    <StyledTabPanel>{tabContent[selectedTab].content}</StyledTabPanel>
                </div>
                <br />
            </TabWrapper>

            <Modal show={modalShow} onHide={() => setModalShow(false)} size="md">
                <ModalBody style={{ width: '100%' }}>
                    {selectedCategory && (
                        <div>
                            <h3>{selectedCategory.title}</h3>
                        </div>
                    )}
                    <Slider {...slickSettings} ref={sliderRef}>
                        {modalImages?.map((imageUrl, imgIndex) => (
                            <div key={imgIndex}>
                                <img src={imageUrl} alt={`Modal ${imgIndex + 1}`} className="img-fluid d-block w-100" style={{ height: '300px' }} />
                            </div>
                        ))}
                    </Slider>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Media;
