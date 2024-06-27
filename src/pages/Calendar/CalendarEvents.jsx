import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { ApiUrl } from '../../components/API/Api';
import { FaDownload } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const StyledCalendarContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const StyledCalendarHeader = styled.h2`
  color: #333;
  text-align: center;
  margin-right:5rem;
`;

const StyledCalendar = styled(Calendar)`
  font-size: 14px;

  .rbc-month-view {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .rbc-header {
    background-color: #4285f4;
    color: #ffffff;
    font-weight: bold;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
  }

  .rbc-day-bg {
    background-color: #f8f9fa;
  }

  .rbc-today {
    background-color: #4285f4;
    color: #ffffff;
  }

  .rbc-agenda-view {
    border-top: 2px solid #4285f4;
  }

  .rbc-agenda-date-cell,
  .rbc-agenda-time-cell {
    font-size: 16px;
    color: #333;
  }

  .rbc-agenda-event-cell {
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: #4285f4;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    a {
      color: #ffffff;
      text-decoration: none;
    }

    &:hover {
      background-color: #3367d6;
    }
  }
`;
const EventModal = ({ show, onHide, event }) => {
    const getFileName = () => {
        const pathArray = event.file_url.split('/');
        return pathArray[pathArray.length - 1];
    };
    const handleDownload = () => {
        window.open(event.file_url);
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{event.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Start Date :</b> {moment(event.start).format('MMMM Do YYYY')}</p>
                <p><b>Description :</b> <p dangerouslySetInnerHTML={{ __html: event.description }} ></p></p>
                <p><b>Attachment :</b> {getFileName()}{' '}
                    <Button variant="link" onClick={handleDownload} style={{ textDecoration: "none" }}>
                        <FaDownload /> Download
                    </Button></p>
            </Modal.Body>
        </Modal>
    );
};

const CalendarEvents = () => {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetch(`${ApiUrl}/get/Newsletter`)
            .then((response) => response.json())
            .then((data) => {
                const formattedEvents = data.data.map((event) => ({
                    title: event.title,
                    start: moment(event.eventdate, 'DD-MM-YYYY').toDate(),
                    end: moment(event.eventdate, 'DD-MM-YYYY').toDate(),
                    file_url: event.file_url,
                    description: event.content,
                }));
                setEvents(formattedEvents);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <>
            <br />
            <StyledCalendarContainer>
                <StyledCalendarHeader>Calendar Events</StyledCalendarHeader>
                <StyledCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 1000 }}
                    onSelectEvent={handleEventClick}
                    eventLimit={1}
                />
            </StyledCalendarContainer>
            <br />
            {selectedEvent && (
                <EventModal show={!!selectedEvent} onHide={closeModal} event={selectedEvent} />
            )}
        </>
    );
};

export default CalendarEvents;
