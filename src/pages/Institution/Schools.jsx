import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const TabWrapper = styled.div`
  background-color: #f8f8f8;
`;

const StyledTabList = styled.div`
  display: flex;
  background-color: #E6E6E6;
  margin: 0;
  padding: 0;
`;

const StyledTab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: ${props => (props.isSelected ? '#012c6d' : 'rgb(246, 201, 63)')};
  color: ${props => (props.isSelected ? '#f6c93f' : '#000')};
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.3s;
  &:hover {
    background-color: #012c6d;
    color: #f6c93f;
  }
`;

const StyledTabPanel = styled.div`
  max-height: 823px;
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

const Schools = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabContent = [
        {
            title: 'Aided',
            content: (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Aided School Content</h3>
                        <p>In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.</p>
                        <br />
                        <p>In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Unaided',
            content: (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Unaided School Content</h3>
                        <p>In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.</p>
                        <br/>
                        <p>In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.In this modified code, I added two new tabs for "Aided" and "Unaided" with placeholder content. You can customize the content of these tabs based on your requirements.</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <TabWrapper>
                <br />
                <div className="container">
                    <StyledTabList>
                        {tabContent.map((tab, index) => (
                            <StyledTab
                                key={index}
                                isSelected={selectedTab === index}
                                onClick={() => setSelectedTab(index)}
                            >
                                {tab.title}
                            </StyledTab>
                        ))}
                    </StyledTabList>

                    <StyledTabPanel>
                        {tabContent[selectedTab].content}
                    </StyledTabPanel>
                </div>
            </TabWrapper>
        </>
    );
};

export default Schools;
