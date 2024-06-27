import React from "react";
import { Table } from "react-bootstrap";

const PriestSkeletonLoader = () => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Priest Name</th>
                    <th>Ordination Date</th>
                    <th>Birthday Date</th>
                    <th>Roles</th>
                    <th>Address</th>
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

export default PriestSkeletonLoader;
