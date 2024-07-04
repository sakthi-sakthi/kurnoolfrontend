import React from 'react'
import { Link } from 'react-router-dom'
import './notfound.css'
const NotFound = () => {
    return (
        <>
            <div className="notfound text-center">
                <h1 className="error">404</h1>
                <div className="page">Ooops!!! The page you are looking for is not found</div>
                <Link to="/" className="back-home btn-sm mt-2 mt-lg-0 text-white">Back to home</Link>
            </div>
        </>
    )
}

export default NotFound
