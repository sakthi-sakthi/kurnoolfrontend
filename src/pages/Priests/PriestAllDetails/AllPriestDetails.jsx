import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../components/API/Api';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaFileDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment-timezone';
const AllPriestDetails = () => {
    const [priestData, setPriestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);
    const priestUrlId = searchParams.get("di");
    const categorypriestId = searchParams.get("from");

    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/sultanpet/preist/${parseInt(categorypriestId)}`);
                debugger
                const resdata = response?.data?.data;
                const filteredObject = resdata?.find(item => item.id === parseInt(priestUrlId));
                setPriestData(filteredObject);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorypriestId, priestUrlId]);

    const convertToIndianDateFormat = (dateString) => {
        return moment(dateString).tz('Asia/Kolkata').format('D MMMM YYYY');
    };

    const downloadPdf = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
        });

        const header = 'Priest Details';
        pdf.setFontSize(20);
        pdf.text(header, pdf.internal.pageSize.getWidth() / 2, 15, 'center');

        const filename = `${priestData.name}_details.pdf`;

        const tableData = [
            ['Priest Type', priestData.priest_type],
            ['Name', priestData.name],
            ['Date of Birth', convertToIndianDateFormat(priestData.date_of_birth)],
            ['Ordination Date', convertToIndianDateFormat(priestData.date_of_ordination)],
            ['Feast Date', convertToIndianDateFormat(priestData.feast_day)],
            ['Blood Group', priestData.blood_group],
            ['Address', priestData.address],
            ['Email', priestData.email],
            ['Phone Number', priestData.phone],
            ['Residence', priestData.residence],
            ['Ministry', priestData.ministry],
            ['Roles', priestData.roles],
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

    return (
        <>
            <div className="container mt-5">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {priestData && (
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-9">
                                    <h4 className="heading text-left mb-4 ml-0" style={{ fontFamily: "Montserrat" }}>{priestData.name}</h4>
                                    <dl className="row">
                                        <div className="col-sm-6">
                                            <dt>Priest Type:</dt>
                                            <dd>{priestData.priest_type}</dd>

                                            <dt>Priest Name:</dt>
                                            <dd>{priestData.name}</dd>

                                            <dt>DOB:</dt>
                                            <dd>{convertToIndianDateFormat(priestData.date_of_birth)}</dd>

                                            <dt>Ordination Date:</dt>
                                            <dd>{convertToIndianDateFormat(priestData.date_of_ordination)}</dd>

                                            <dt>Feast Date:</dt>
                                            <dd>{convertToIndianDateFormat(priestData.feast_day)}</dd>

                                            <dt>Blood Group:</dt>
                                            <dd>{priestData.blood_group}</dd>

                                        </div>

                                        <div className="col-sm-6">
                                            <dt>Address:</dt>
                                            <dd>{priestData.address}</dd>

                                            <dt>Email:</dt>
                                            <dd><a href={`mailto:${priestData.email}`} style={{ textDecoration: "none" }}>{priestData.email}</a></dd>

                                            <dt>Phone Number:</dt>
                                            <dd><a href={`tel:${priestData.phone}`} style={{ textDecoration: "none" }}>{priestData.phone}</a></dd>

                                            <dt>Residence:</dt>
                                            <dd>{priestData.residence}</dd>

                                            <dt>Ministry:</dt>
                                            <dd>{priestData.ministry}</dd>

                                            <dt>Roles:</dt>
                                            <dd>{priestData.roles}</dd>
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
                                        src={priestData.image}
                                        alt="Priest"
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
    )
}

export default AllPriestDetails
