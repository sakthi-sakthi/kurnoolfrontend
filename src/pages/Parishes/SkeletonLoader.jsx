import React from "react";
import { Table } from "react-bootstrap";

const SkeletonLoader = () => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Priest Image</th>
                    <th>Parish Name</th>
                    <th>Parish Image</th>
                    <th>Parish Priest</th>
                    <th>Patron Name</th>
                    <th>Address</th>
                    <th>Year of Establishment</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(1)]?.map((_, index) => (
                    <tr key={index}>
                        <td colSpan={9}><p><b><center>Loading...</center></b></p></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default SkeletonLoader;
