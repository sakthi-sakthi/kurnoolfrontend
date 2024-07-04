import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { ApiUrl } from '../../components/API/Api';

const StyledCalendarContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const StyledCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CalendarTitle = styled.h2`
  color: #333;
  text-align: center !important;
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
        <Modal.Title>{event.ename}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Event Name :</b>{event.ename}
        </p>
        <p>
          <b>Start Date :</b> {moment(event.start).format('MMMM Do YYYY')}
        </p>
      </Modal.Body>
    </Modal>
  );
};

const DailyEventsCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/bishopprogram`);

        const fetchedEvents = response.data.data.map(event => ({
          ...event,
          start: new Date(event.startdate),
          end: event.enddate ? new Date(event.enddate) : new Date(event.startdate),
          title: event.ename,
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const CustomEventComponent = ({ event }) => (
    <>
      <div>{event?.title}</div>
    </>
  );

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  const yearOptions = Array.from({ length: 31 }, (_, i) => 2000 + i);

  const navigateToYear = (date) => {
    const newDate = new Date(date);
    newDate.setFullYear(currentYear);
    return newDate;
  };

  return (
    <>
      <StyledCalendarContainer>
        <StyledCalendarHeader>
          <CalendarTitle>Daily Calendar</CalendarTitle>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="year-dropdown">
              {currentYear}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                maxHeight: '440px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                msOverflowStyle: 'none',
                scrollbarColor: '#888 transparent',
              }}
            >
              <div className="scrollbar-track">
                <div className="scrollbar-thumb" style={{ background: '#888' }} />
              </div>
              {yearOptions?.map((year) => (
                <Dropdown.Item
                  key={year}
                  onClick={() => handleYearChange(year)}
                >
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </StyledCalendarHeader>
        <StyledCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 1000 }}
          onSelectEvent={handleEventClick}
          defaultDate={navigateToYear(new Date())}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          showMultiDayTimes
          showAllEvents
          selectable
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event?.color || '#4285f4',
              color: '#fff',
            },
          })}
          dayLayoutAlgorithm="horizontal"
          eventOverlap
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
