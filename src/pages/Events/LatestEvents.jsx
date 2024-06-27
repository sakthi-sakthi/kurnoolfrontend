import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Pagination } from 'react-bootstrap';
import styled from 'styled-components';
import { ApiUrl } from '../../components/API/Api';
import moment from 'moment';

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
`;

const Content = styled.p`
  margin-top: 0.5rem;
`;

const Link = styled.p`
  margin-top: 0.5rem;
`;
const goBack = () => {
    window.history.back();
};
const LatestEvents = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/resource/category/2`);
                const sortedEvents = response.data.data.sort((a, b) => {
                    const dateA = moment(a.eventdate, 'DD-MM-YYYY');
                    const dateB = moment(b.eventdate, 'DD-MM-YYYY');

                    return dateB.diff(dateA);
                });

                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container className="mt-3">
            <h2 className="text-center">Latest Events</h2>
            <ListGroup>
                {currentEvents.map((event) => (
                    <EventCard key={event.id}>
                        <div className="row">
                            <div className="col-md-9">
                                <div>
                                    <Title style={{ fontWeight: "bold" }}>{event.title}</Title>
                                    <Date style={{ fontWeight: "bold" }}>
                                        <i className='fa fa-calendar'></i>&nbsp;&nbsp;&nbsp;{event.eventdate}<br />
                                    </Date>
                                    <Content>
                                        <p dangerouslySetInnerHTML={{ __html: event.content }} style={{ textAlign: "justify" }} />
                                    </Content>
                                    <Link>
                                        {event.file_url && (
                                            <>
                                                <i className='fa fa-file-pdf'></i>&nbsp;&nbsp;&nbsp;
                                                <a href={event.file_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "blue" }}>
                                                    {event.file_url}&nbsp;&nbsp;&nbsp;<i className="fa fa-download"></i>
                                                </a>
                                            </>
                                        )}
                                    </Link>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <img src={event.media_url} style={{ width: "250px", height: "150px" }} alt='events'></img>
                            </div>
                        </div>
                    </EventCard>

                ))}
            </ListGroup>

            <Pagination className="mt-3">
                {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <br />
            <center><button onClick={goBack} className='btn btn-primary btn-sm'>Go Back</button></center>
        </Container>
    );
};

export default LatestEvents;
