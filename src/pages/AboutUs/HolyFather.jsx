import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../components/API/Api';
import axios from 'axios';

const HolyFather = () => {
    const [data, setPopeMessage] = useState([]);

    useEffect(() => {
        axios.get(`${ApiUrl}/get/Pages`)
            .then(response => {
                setPopeMessage(response?.data?.data);
            })
            .catch(error => {
                console.error('Error fetching Pope\'s message:', error);
            });
    }, []);

    const filteredData = data.filter(item => item.id === 42);
    return (
        <>
            <div className="container subpage">
                <h2 className="heading">His Holiness Pope Francis</h2>
                <h5 className='text-center'>(Jorge Mario Bergoglio)</h5>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header text-white" style={{ backgroundColor: "#012c6d" }}>
                                <h2 className="mb-0">Pope Francis</h2>
                                <p className="mb-0">Bishop of Rome and Vicar of Jesus Christ</p>
                            </div>
                            <div className="card-body">
                                <img src="/images/subpage/holyfather.jpg" className="img-fluid mb-4" alt="Pope Francis" />

                                <div className="row">
                                    <div className="col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><strong>Successor of St. Peter:</strong> 266th</li>
                                            <li className="list-group-item"><strong>Supreme Pontiff:</strong> Universal Church</li>
                                            <li className="list-group-item"><strong>Patriarch:</strong> West</li>
                                            <li className="list-group-item"><strong>Primate:</strong> Italy</li>
                                            <li className="list-group-item"><strong>Archbishop:</strong> Roman Province</li>
                                            <li className="list-group-item"><strong>Date of Birth:</strong> 17.12.1936</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><strong>Place of Birth:</strong> Buenos Aires, Argentina</li>
                                            <li className="list-group-item"><strong>Ordained Priest:</strong> 13.12.1969</li>
                                            <li className="list-group-item"><strong>Consecrated:</strong> 27.06.1992</li>
                                            <li className="list-group-item"><strong>Created Cardinal:</strong> 21.02.2001</li>
                                            <li className="list-group-item"><strong>Elected Pope:</strong> 13.03.2013</li>
                                            <li className="list-group-item"><strong>Began Papal Ministry:</strong> 19.03.2013</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="mb-3"><b>Address:</b></h5>
                                        <p>His Holiness, Pope Francis<br />00120 Via del Pellegrino<br />Citta del Vaticano, Roma</p>
                                        <h5 className="mb-3"><b>Contact:</b></h5>
                                        <p><strong>Phone:</strong> 0039-669881022</p>
                                        <p><strong>Fax:</strong> 0039-669885373</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header text-white" style={{ backgroundColor: "#012c6d" }}>
                                        <h2 className="mb-0">Pope's Message</h2>
                                    </div>
                                    <div className="card-body">
                                        {filteredData?.map(item => (
                                            <p dangerouslySetInnerHTML={{ __html: item.content }} className="lead" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default HolyFather
