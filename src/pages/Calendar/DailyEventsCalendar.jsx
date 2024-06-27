import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import EventsData from './DailyEventsData/EventsData';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

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
  margin-right: 5rem;
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

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{event.title_english}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <b>Start Date :</b> {moment(event.start).format('MMMM Do YYYY')}
                </p>
                <p>
                    <b>Description :</b>{' '}
                    <p dangerouslySetInnerHTML={{ __html: event.title_tamil }}></p>
                </p>
            </Modal.Body>
        </Modal>
    );
};

const DailyEventsCalendar = () => {
    const localizer = momentLocalizer(moment);
    const [events] = useState(
        EventsData.map(event => ({
            ...event,
            start: new Date(new Date().getFullYear(), event.month - 1, event.day),
            end: new Date(new Date().getFullYear(), event.month - 1, event.day),
        }))
    );

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };
    const CustomEventComponent = ({ event }) => (
        <div>
            <div>{event.title}</div>
            <div>{event.title_tamil}</div>
        </div>
    );

    return (
        <>
            <br />
            <StyledCalendarContainer>
                <StyledCalendarHeader>Daily Events Calendar</StyledCalendarHeader>
                <StyledCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 1000 }}
                    onSelectEvent={handleEventClick}
                    eventLimit={1}
                    components={{
                        event: CustomEventComponent,
                    }}
                />

            </StyledCalendarContainer>
            <br />
            {selectedEvent && (
                <EventModal show={!!selectedEvent} onHide={closeModal} event={selectedEvent} />
            )}

        </>
    );
};

export default DailyEventsCalendar;
