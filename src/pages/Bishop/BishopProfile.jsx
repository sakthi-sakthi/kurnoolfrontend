import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BishopImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const SectionContainer = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Detail = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 10px;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const TableData = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const BishopProfile = () => {
  return (
    <ProfileContainer>
      <ProfileHeader>
        <BishopImage src="/images/all-img/bishopnew.png" alt="Bishop" />
        <HeaderTitle>Rt. Rev. Dr. Antonysamy Peter Abir</HeaderTitle>
      </ProfileHeader>
      <SectionContainer>
        <Section>
          <SectionTitle>
            <IconWrapper><FiCalendar /></IconWrapper>Personal Information
          </SectionTitle>
          <Detail>
            <Label>Born:</Label>
            <Value>07 April 1952</Value>
          </Detail>
          <Detail>
            <Label>Place of Birth:</Label>
            <Value>Sathipattu, Cuddalore District, Tamil Nadu</Value>
          </Detail>
          <Detail>
            <Label>Diocese of Origin:</Label>
            <Value>Archdiocese of Pondicherry-Cuddalore</Value>
          </Detail>
          <Detail>
            <Label>Priestly Ordination:</Label>
            <Value>1 May 1979 (Pondicherry)</Value>
          </Detail>
          <Detail>
            <Label>Ministry:</Label>
            <Value>1979-81: Assistant at Attipakkam- a rural Parish in Pondicherry Archdiocese</Value>
          </Detail>
        </Section>
        <Section>
          <SectionTitle>
            <IconWrapper><FiBookOpen /></IconWrapper>Education
          </SectionTitle>
          <Detail>
            <Label>MTh in Biblical Theology:</Label>
            <Value>St. Peter’s Seminary, Bangalore (1981-83)</Value>
          </Detail>
          <Detail>
            <Label>Licentiate in Sacred Scripture:</Label>
            <Value>Pontifical Biblical Institute, Rome (1990-93)</Value>
          </Detail>
          <Detail>
            <Label>Master’s degree in World History:</Label>
            <Value>Thirupathy University (Year not specified)</Value>
          </Detail>
          <Detail>
            <Label>Doctorate in Biblical Theology:</Label>
            <Value>Gregorian University, Rome (1993-95)</Value>
          </Detail>
        </Section>
      </SectionContainer>
      <SectionContainer>
        <Section>
          <SectionTitle>
            <IconWrapper><FiMapPin /></IconWrapper>Ministry
          </SectionTitle>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Period</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              <TableRow>
                <TableData>Director, St. Paul’s Bible Institute:</TableData>
                <TableData>Poonamallee, Chennai (2004-2008)</TableData>
              </TableRow>
              <TableRow>
                <TableData>Founder, Emmaus Spirituality Centre:</TableData>
                <TableData>Villupuram, Pondicherry Archdiocese (2003)</TableData>
              </TableRow>
              <TableRow>
                <TableData>General Secretary, TN Bible Commission:</TableData>
                <TableData>2004-2010</TableData>
              </TableRow>
              <TableRow>
                <TableData>Deputy Secretary, Tamil Nadu Bishops’ Council:</TableData>
                <TableData>2002-2004</TableData>
              </TableRow>
              <TableRow>
                <TableData>South Asian Coordinator, Catholic Biblical Federation:</TableData>
                <TableData>2003-2009</TableData>
              </TableRow>
              <TableRow>
                <TableData>Director, Tamil Nadu Regional Biblical Catechetical and Liturgical Centre (TNBCLC):</TableData>
                <TableData>2004-2010</TableData>
              </TableRow>
              <TableRow>
                <TableData>Founder-Director, Emmaus Spirituality Centre of the Tamil Nadu Bishops’ Council:</TableData>
                <TableData>2010 June - present</TableData>
              </TableRow>
            </tbody>
          </Table>
        </Section>
      </SectionContainer>
    </ProfileContainer>
  );
};

export default BishopProfile;
