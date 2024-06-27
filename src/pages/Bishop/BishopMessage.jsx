import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ApiUrl } from '../../components/API/Api';

const MessageContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const MessageContent = styled.p`
  color: #444;
  font-size: 16px;
  line-height: 1.6;
`;

const BishopMessage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/message/14`);
                const sortedMessages = response.data?.data?.sort((a, b) => new Date(b.activitydate) - new Date(a.activitydate)) || [];
                setMessages(sortedMessages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        padding: '10px 20px',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-block'
    };

    if (loading) return <div className='text-center mt-5' style={{ fontWeight: "bold", color: "black" }}>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (messages.length === 0) return <div><p className='text-center mt-5 mb-5'>No messages available.</p></div>;

    const latestMessage = messages[0];
    const olderMessages = messages.slice(1);

    return (
        <div className="container">
            <div className="section-title text-center">
                <h2 className="our-title mb-2 mt-3">Bishop Message</h2>
                <br/>
            </div>

            {latestMessage && (
                <MessageContainer>
                    <h3 dangerouslySetInnerHTML={{ __html: latestMessage.title }} />
                    <MessageContent dangerouslySetInnerHTML={{ __html: latestMessage.content }} />
                    <div style={{ textAlign: 'right' }}>
                        <h5>Rt. Rev. Dr. Antonysamy Peter Abir</h5>
                        <p><b>Bishop of Sultanpet</b></p>
                    </div>
                    <br />
                    <h6>Date: {latestMessage.activitydate}</h6>
                </MessageContainer>
            )}

            {olderMessages.length > 0 && (
                <div className="accordion" id="olderMessagesAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="olderMessagesHeader">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#olderMessagesCollapse" aria-expanded="false" aria-controls="olderMessagesCollapse">
                                Old Bishop Messages
                            </button>
                        </h2>
                        <div id="olderMessagesCollapse" className="accordion-collapse collapse" aria-labelledby="olderMessagesHeader" data-bs-parent="#olderMessagesAccordion">
                            <div className="accordion-body">
                                {olderMessages.map(message => (
                                    <MessageContainer key={message.id}>
                                        <h3 dangerouslySetInnerHTML={{ __html: message.title }} />
                                        <MessageContent dangerouslySetInnerHTML={{ __html: message.content }} />
                                        <br />
                                        <div style={{ textAlign: 'right' }}>
                                            <h5>Rt. Rev. Dr. Antonysamy Peter Abir</h5>
                                            <p><b>Bishop of Sultanpet</b></p>
                                        </div>
                                        <br />
                                        <h6>Date: {message.activitydate}</h6>
                                    </MessageContainer>
                                ))}
                            </div>
                        </div>
                    </div>
                    <center>
                        <button
                            style={buttonStyle}
                            onClick={() => window.history.back()}
                            className='mt-3'
                        >
                            Go Back
                        </button>
                    </center>
                </div>
            )}
        </div>
    );
};

export default BishopMessage;