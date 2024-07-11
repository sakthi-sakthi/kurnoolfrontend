import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const BishopProgram = () => {
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [archivedPrograms, setArchivedPrograms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/bishopprogram`);
                if (response?.data?.success) {
                    const data = response?.data?.data;
                    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
                    const { current, archived } = groupByMonth(data, currentMonth);
                    setPrograms(current);
                    setArchivedPrograms(archived);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProgramClick = (program) => {
        setSelectedProgram(program);
    };

    const groupByMonth = (data, currentMonth) => {
        return data.reduce(
            (acc, program) => {
                const month = new Date(program.startdate).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (month === currentMonth) {
                    if (!acc.current[month]) {
                        acc.current[month] = [];
                    }
                    acc.current[month].push(program);
                } else {
                    if (!acc.archived[month]) {
                        acc.archived[month] = [];
                    }
                    acc.archived[month].push(program);
                }
                return acc;
            },
            { current: {}, archived: {} }
        );
    };

    const sortedProgramMonths = Object.keys(programs).sort();
    const sortedArchivedProgramMonths = Object.keys(archivedPrograms).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB - dateA;
    });

    if (loading) {
        return (
            <div className='text-center mt-5' style={{ fontWeight: 'bold', color: 'black' }}>
                <FontAwesomeIcon icon={faSpinner} spin size='2x' />
            </div>
        );
    }

    return (
        <div className="container">
            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                data-backdrop="static"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle" style={{ textAlign: 'center', fontSize: '17px' }}>
                                {selectedProgram?.ename}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Event Name:</strong> {selectedProgram?.ename}</p>
                            <p><strong>Start Date:</strong> {selectedProgram && new Date(selectedProgram.startdate).toLocaleString('en-GB')}</p>
                            <p><strong>End Date:</strong> {selectedProgram?.enddate ? new Date(selectedProgram.enddate).toLocaleString('en-GB') : 'N/A'}</p>
                            <p><strong>Details:</strong> {selectedProgram?.details || 'No additional details available'}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success btn-sm"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-center mt-3 mb-4">Bishop's Monthly Program</h2>

            {sortedProgramMonths?.map((month) => (
                <div key={month}>
                    <h3 className="text-center mt-3 mb-4">{month}</h3>
                    <table className="table table-striped table-bordered table-hover mt-3 mb-5">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.No</th>
                                <th>Bishop Event Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>More Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...programs[month]].sort((a, b) => new Date(a.startdate) - new Date(b.startdate)).map((program, index) => (
                                <tr key={program.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ wordBreak: 'break-word', width: '40%' }}>{program.ename}</td>
                                    <td style={{ wordBreak: 'break-word', width: '25%' }}>
                                        {new Date(program.startdate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}{' '}
                                        {new Date(program.startdate).toLocaleTimeString('en-GB', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}{' '}
                                        - {new Date(program.startdate).toLocaleDateString('en-GB', { weekday: 'short' })}
                                    </td>
                                    <td style={{ wordBreak: 'break-word', width: '25%' }}>
                                        {program.enddate
                                            ? `${new Date(program.enddate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })} ${new Date(program.enddate).toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })} - ${new Date(program.enddate).toLocaleDateString('en-GB', {
                                                weekday: 'short',
                                            })}`
                                            : '-'}
                                    </td>
                                    <td style={{ wordBreak: 'break-word', width: '20%' }}>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src="images/all-img/view.png" alt="nodata" style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft: '10px', cursor: 'pointer', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', borderRadius: '50%' }} data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handleProgramClick(program)} />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            {sortedArchivedProgramMonths.length > 0 && (
                <div>
                    <h4 className="text-center mt-3 mb-4">Archived Programs</h4>
                    <div className="accordion" id="archiveAccordion">
                        {sortedArchivedProgramMonths.map((month, index) => (
                            <div className="card" key={month}>
                                <div className="card-header" id={`heading${index}`}>
                                    <h2 className="mb-0">
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src='/images/all-img/tick.png' alt="nodata" style={{ width: '20px', height: '20px', marginRight: '10px', marginLeft: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', borderRadius: '50%' }} />
                                            <button
                                                className="btn btn-link btn-block text-left collapsed w-100 text-decoration-none"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target={`#collapse${index}`}
                                                aria-expanded="true"
                                                aria-controls={`collapse${index}`}
                                            >
                                                {month}
                                            </button>
                                            <h6 className="text-black font-weight-bold ml-3">({archivedPrograms[month].length})</h6>
                                        </span>
                                    </h2>
                                </div>
                                <div
                                    id={`collapse${index}`}
                                    className="collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-parent="#archiveAccordion"
                                >
                                    <div className="card-body">
                                        <table className="table table-striped table-bordered table-hover mt-3 mb-5">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Bishop Event Name</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>More Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {archivedPrograms[month].sort((a, b) => new Date(a.startdate) - new Date(b.startdate)).map((program, idx) => (
                                                    <tr key={program.id}>
                                                        <td>{idx + 1}</td>
                                                        <td style={{ wordBreak: 'break-word', width: '40%' }}>{program.ename}</td>
                                                        <td style={{ wordBreak: 'break-word', width: '25%' }}>
                                                            {new Date(program.startdate).toLocaleDateString('en-GB', {
                                                                year: 'numeric',
                                                                month: '2-digit',
                                                                day: '2-digit',
                                                            })}
                                                        </td>
                                                        <td style={{ wordBreak: 'break-word', width: '25%' }}>
                                                            {program.enddate
                                                                ? new Date(program.enddate).toLocaleDateString('en-GB', {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                })
                                                                : '-'}
                                                        </td>
                                                        <td style={{ wordBreak: 'break-word', width: '20%' }}>
                                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                                <img src="images/all-img/view.png" alt="nodata" style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft: '10px', cursor: 'pointer', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', borderRadius: '50%' }} data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handleProgramClick(program)} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BishopProgram;
