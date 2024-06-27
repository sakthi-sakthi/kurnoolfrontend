import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../components/API/Api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DOMPurify from 'dompurify';
import { FaFileDownload, FaArrowLeft } from 'react-icons/fa';

const MannarkadDetails = () => {
  const [parishData, setParishData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const parishesUrlId = searchParams.get("di");
  const categoryparishId = searchParams.get("from");
  console.log(parishesUrlId);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${ApiUrl}/get/sultanpet/parish/${parseInt(categoryparishId)}`);
        debugger
        const resdata = response?.data?.data;
        const filteredObject = resdata?.find(item => item.id === parseInt(parishesUrlId));

        setParishData(filteredObject);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryparishId, parishesUrlId]);

  const downloadPdf = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
    });

    const header = 'Parish Details';
    pdf.setFontSize(20);
    pdf.text(header, pdf.internal.pageSize.getWidth() / 2, 15, 'center');

    const filename = `${parishData.parish_name}_details.pdf`;

    const tableData = [
      ['Parish Name', parishData.parish_name],
      ['Patron', parishData.patron],
      ['Established Year', parishData.established_year],
      ['Parish Priest', parishData.parish_priest],
      ['Tamil Population', parishData.tamil_population],
      ['Malayalam Population', parishData.malayalam_population],
      ['Forane Name', parishData.VicariatesName],
      ['Address', parishData.address],
      ['Email', parishData.email],
      ['Phone Number', parishData.phone],
      ['History', sanitizeHTML(parishData.history)],
      ['Pious Associations', sanitizeHTML(parishData.pious_associations)],
      ['Social Movements', sanitizeHTML(parishData.social_movements)],
    ];

    // Set page border
    pdf.setLineWidth(1);
    pdf.rect(5, 5, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10);

    pdf.autoTable({
      startY: 30,
      head: [['Field', 'Details']],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 5,
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: '#f2f2f2' },
        1: {},
      },
    });

    const footer = 'Copyright © Diocese of Sultanpet';
    const printDateTime = `Printed on: ${new Date().toLocaleString()}`;
    pdf.setFontSize(10);
    pdf.text(printDateTime, 10, pdf.internal.pageSize.getHeight() - 10);
    pdf.text(footer, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, 'center');

    pdf.save(filename);
  };


  // Function to sanitize HTML content
  const sanitizeHTML = (html) => {
    const sanitizedHtml = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    return sanitizedHtml.replace(/<[^>]*>/g, '');
  };

  return (
    <>
      <div className="container mt-5">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {parishData && (
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="heading text-left mb-4 ml-1" style={{ fontFamily: "Montserrat" }}>{parishData.parish_name} Details</h3>
                  <dl className="row">
                    <div className="col-sm-6">
                      <dt>Parish Name:</dt>
                      <dd>{parishData.parish_name}</dd>

                      <dt>Patron:</dt>
                      <dd>{parishData.patron}</dd>

                      <dt>Established Year:</dt>
                      <dd>{parishData.established_year}</dd>

                      <dt>Parish Priest:</dt>
                      <dd>{parishData.parish_priest}</dd>

                      <dt>Tamil Population:</dt>
                      <dd>{parishData.tamil_population}</dd>

                      <dt>Malayalam Population:</dt>
                      <dd>{parishData.malayalam_population}</dd>

                      <dt>Forane:</dt>
                      <dd>{parishData.VicariatesName}</dd>
                    </div>

                    <div className="col-sm-6">
                      <dt>Address:</dt>
                      <dd>{parishData.address}</dd>

                      <dt>Email:</dt>
                      <dd><a href={`mailto:${parishData.email}`} style={{ textDecoration: "none" }}>{parishData.email}</a></dd>

                      <dt>Phone Number:</dt>
                      <dd><a href={`tel:${parishData.phone}`} style={{ textDecoration: "none" }}>{parishData.phone}</a></dd>

                      <dt>History:</dt>
                      <dd dangerouslySetInnerHTML={{ __html: parishData.history }} />

                      <dt>Pious Associations:</dt>
                      <div dangerouslySetInnerHTML={{ __html: parishData.pious_associations }} />

                      <dt>Social Movements:</dt>
                      <dd dangerouslySetInnerHTML={{ __html: parishData.social_movements }} />
                    </div>
                  </dl>
                  <button className='btn btn-primary btn-sm' title="Go Back" onClick={goBack}>
                    <FaArrowLeft />
                  </button>
                  <button onClick={downloadPdf} className="btn btn-success btn-sm" style={{ marginLeft: "10px" }} title="Download PDF">
                    <FaFileDownload />
                  </button>
                </div>

                <div className="col-lg-3 text-center">
                  <img
                    src={parishData.priest_image}
                    alt="Parish"
                    className="img-fluid mt-4"
                    width="100"
                    height="150"
                  />
                  <img
                    src={parishData.parishimage}
                    alt="Parish"
                    className="img-fluid mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div >
      <br />
    </>
  );
};

export default MannarkadDetails;
