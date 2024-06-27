import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../components/API/Api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileDownload, FaArrowLeft } from 'react-icons/fa';

const AllReligiousDetails = () => {
    const [religioData, setReligioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);
    const religiousUrlId = searchParams.get("di");
    const categoryreligioId = searchParams.get("from");
    console.log(religiousUrlId);

    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${ApiUrl}/get/sultanpet/religio/${parseInt(categoryreligioId)}`);
                debugger
                const resdata = response?.data?.data;
                const filteredObject = resdata?.find(item => item.id === parseInt(religiousUrlId));

                setReligioData(filteredObject);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryreligioId, religiousUrlId]);

    const downloadPdf = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
        });

        const header = 'Religious Details';
        pdf.setFontSize(20);
        pdf.text(header, pdf.internal.pageSize.getWidth() / 2, 15, 'center');

        const filename = `${religioData.name}_details.pdf`;

        const tableData = [
            ['Priest Type', religioData.priest_type],
            ['Name', religioData.name],
            ['Date of Birth', religioData.date_of_birth],
            ['Date of Ordination', religioData.date_of_ordination],
            ['Feast Day', religioData.feast_day],
            ['Father Name', religioData.fathername],
            ['Mother Name', religioData.mothername],
            ['Blood Group', religioData.blood_group],
            ['Address', religioData.address],
            ['Phone Number', religioData.phone],
            ['Email', religioData.email],
            ['Residence', religioData.residence],
            ['Ministry', religioData.ministry],
        ];

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

    return (
        <>
            <div className="container mt-5">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {religioData && (
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-9">
                                    <h3 className="heading text-left mb-4 ml-1" style={{ fontFamily: "Montserrat" }}>{religioData.name}</h3>
                                    <dl className="row">
                                        <div className="col-sm-6">
                                            <dt>Priest Type:</dt>
                                            <dd>{religioData.priest_type}</dd>

                                            <dt>Name:</dt>
                                            <dd>{religioData.name}</dd>

                                            <dt>Date of Birth:</dt>
                                            <dd>{religioData.date_of_birth}</dd>

                                            <dt>Date of Ordination:</dt>
                                            <dd>{religioData.date_of_ordination}</dd>

                                            <dt>Father Name:</dt>
                                            <dd>{religioData.fathername}</dd>

                                            <dt>Mother Name:</dt>
                                            <dd>{religioData.mothername}</dd>

                                            <dt>Blood Group:</dt>
                                            <dd>{religioData.blood_group}</dd>
                                        </div>

                                        <div className="col-sm-6">
                                            <dt>Address:</dt>
                                            <dd>{religioData.address}</dd>

                                            <dt>Email:</dt>
                                            <dd><a href={`mailto:${religioData.email}`} style={{ textDecoration: "none" }}>{religioData.email}</a></dd>

                                            <dt>Phone Number:</dt>
                                            <dd><a href={`tel:${religioData.phone}`} style={{ textDecoration: "none" }}>{religioData.phone}</a></dd>

                                            <dt>Residence:</dt>
                                            <dd>{religioData.residence}</dd>

                                            <dt>Ministry:</dt>
                                            <dd>{religioData.ministry}</dd>

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
                                        src={religioData.image}
                                        alt="Parish"
                                        className="img-fluid mt-4"
                                        width="100"
                                        height="150"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <br />
        </>
    );
};

export default AllReligiousDetails;
