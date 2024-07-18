import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ApiUrl } from '../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const MessageContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const MessageContent = styled.p`
  color: #444;
  text-align: justify;
  font-size: 15px;
  line-height: 1.6;
`;

const PastoralMessage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/messages/3`);
                const sortedMessages = response?.data?.data?.sort((a, b) => b.id - a.id);
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

    if (loading) return <div className='text-center mt-5' style={{ fontWeight: "bold", color: "black" }}><FontAwesomeIcon icon={faSpinner} spin size="2x" /></div>;
    if (error) return <div>Error: {error}</div>;

    const [latestMessage, ...olderMessages] = messages;

    return (
        <div className="container">
            <div className="section-title text-center mt-3">
                <h2 className="title">Pastoral Message</h2>
            </div>
            <br />
            {latestMessage && (
                <MessageContainer>
                    <img src={'images/all-img/bishop.jpeg' || 'images/all-img/noimages.png'} alt="Pastoral" style={{ width: '120px', height: '120px', borderRadius: '32%', marginLeft: "20px", float: 'right', boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }} title='Pastoral' />
                    <h4 className="mb-3 col-12"> {latestMessage.title} </h4>
                    <MessageContent dangerouslySetInnerHTML={{ __html: latestMessage.content }} />
                </MessageContainer>
            )}

            {olderMessages.length > 0 && (
                <div className="accordion" id="olderMessagesAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="olderMessagesHeader">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#olderMessagesCollapse" aria-expanded="false" aria-controls="olderMessagesCollapse">
                                Old Pastoral Messages
                            </button>
                        </h2>
                        <div id="olderMessagesCollapse" className="accordion-collapse collapse" aria-labelledby="olderMessagesHeader" data-bs-parent="#olderMessagesAccordion">
                            <div className="accordion-body">
                                {olderMessages?.map(message => (
                                    <MessageContainer key={message.id}>
                                        <img src={'images/all-img/bishop.jpeg' || 'images/all-img/noimages.png'} alt="Pastoral" style={{ width: '120px', height: '120px', marginLeft: "20px", borderRadius: '32%', marginBottom: '10px', boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }} title='Pastoral' />
                                        <MessageContent dangerouslySetInnerHTML={{ __html: message.content }} />
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

export default PastoralMessage;