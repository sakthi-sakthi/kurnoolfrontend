import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup, Pagination } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ApiUrl } from "../../components/API/Api";

const EventCard = styled(ListGroup.Item)`
  list-style-type: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
`;

const Title = styled.h5`
  margin-bottom: 0.5rem;
`;

const Date = styled.small`
  color: #6c757d;
  font-size: 0.875em;
`;

const Content = styled.p`
  margin-top: 0.5rem;
`;

const Link = styled.p`
  margin-top: 0.5rem;
`;

const NoData = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const goBack = () => {
  window.location.href = "/";
};

const News = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${ApiUrl}/resource/category/1`);
        setEvents(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-3">
      <h2 className="text-center">Latest Events</h2>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <>
          {!events.length > 0 ? (
            <NoData>No data available</NoData>
          ) : (
            <ListGroup>
              {currentEvents?.map((event) => (
                <EventCard key={event.id}>
                  <div className="row">
                    <div className="col-md-9">
                      <div>
                        <Title style={{ fontWeight: "bold" }}>
                          <img
                            src="images/all-img/tick.png"
                            className="mr-2"
                            style={{ width: "20px", height: "20px" }}
                            alt="logo"
                          />
                          {event?.title}
                        </Title>
                        <Date style={{ fontWeight: "bold" }}>
                          <i className="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;
                          {event?.eventdate}
                          <br />
                        </Date>
                        <Content>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: event?.content,
                            }}
                            style={{ textAlign: "justify" }}
                          />
                        </Content>
                        <Link>
                          {event?.media_url && (
                            <>
                              <i className="fa fa-file-pdf"></i>
                              &nbsp;&nbsp;&nbsp;
                              <a
                                href={event?.media_url}
                                style={{
                                  textDecoration: "none",
                                  color: "blue",
                                }}
                                download
                              >
                                {event?.media_url?.split("/").pop()}
                                &nbsp;&nbsp;&nbsp;
                                <i className="fa fa-download"></i>
                              </a>
                            </>
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <img
                        src={event?.media_url}
                        style={{
                          width: "250px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                        alt="events"
                      ></img>
                    </div>
                  </div>
                </EventCard>
              ))}
            </ListGroup>
          )}
          <Pagination className="mt-3">
            {Array?.from(
              { length: Math.ceil(events.length / eventsPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
          <br />
          <center>
            <button
              onClick={goBack}
              className="btn btn-primary btn-sm"
              id="btnmore"
            >
              Go Back
            </button>
          </center>
        </>
      )}
    </Container>
  );
};

export default News;
