import React from 'react'
import './allcommission.css'
import { Link } from 'react-router-dom'
const AllCommissions = () => {
    return (
        <>
            <div className="container" style={{ marginTop: 20 }}>
                <h3 className="text-center mt-3 mb-3">Commissions</h3>
                <table
                    align="center"
                    width="1200px"
                    cellPadding="0px"
                    cellSpacing="0px"
                    border="0px"
                    style={{ border: "solid 0px red" }}
                >
                    <tbody>
                        <tr>
                            <td>
                                <Link to="/pastoral-commission">
                                    <div
                                        className="com1"
                                        style={{ backgroundColor: "#9f25b4", marginRight: 20 }}
                                    >
                                        <img
                                            src="images/all-img/pastoral_commission.jpg"
                                            alt=""
                                            style={{ width: 285, height: 380 }}
                                        />
                                        <center>
                                            <img src="images/border_1.jpg" alt="" style={{ marginTop: 15 }} />
                                        </center>
                                        <h3>
                                            <i>Pastoral Commission</i>
                                        </h3>
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <Link to="/education-commission">
                                    <div
                                        className="com1"
                                        style={{ backgroundColor: "#1b96a8", marginRight: 20 }}
                                    >
                                        <img
                                            src="images/all-img/comission_2.jpg"
                                            alt=""
                                            style={{ width: 285, height: 380 }}
                                        />
                                        <center>
                                            <img src="images/border_1.jpg" alt="" style={{ marginTop: 15 }} />
                                        </center>
                                        <h3>
                                            <i>Education Commission</i>
                                        </h3>
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <Link to="/social-service-commission">
                                    <div
                                        className="com1"
                                        style={{ backgroundColor: "#1d0a59", marginRight: 20 }}
                                    >
                                        <img
                                            src="images/all-img/SocialService_Commission.jpg"
                                            alt=""
                                            style={{ width: 285, height: 380 }}
                                        />
                                        <center>
                                            <img src="images/border_1.jpg" alt="" style={{ marginTop: 15 }} />
                                        </center>
                                        <h3>
                                            <i>
                                                Social Service <br /> Commission
                                            </i>
                                        </h3>
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <Link to="/youth-commission">
                                    <div className="com1" style={{ backgroundColor: "#c84032" }}>
                                        <img
                                            src="images/all-img/comission_4.jpg"
                                            alt=""
                                            style={{ width: 285, height: 380 }}
                                        />
                                        <center>
                                            <img src="images/border_1.jpg" alt="" style={{ marginTop: 15 }} />
                                        </center>
                                        <h3>
                                            <i>Youth Commission</i>
                                        </h3>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    )
}

export default AllCommissions
