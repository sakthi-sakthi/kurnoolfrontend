import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ApiUrl } from '../../components/API/Api';

function NewsLetter() {
    const [pdfLinks, setPdfLinks] = useState([]);
    const [archivedPdfLinks, setArchivedPdfLinks] = useState([]);
    const [mainAccordionOpen, setMainAccordionOpen] = useState(true);
    const [subAccordionOpen, setSubAccordionOpen] = useState(1);

    const handleMainAccordionClick = () => {
        setMainAccordionOpen((prevState) => !prevState);
    };

    const handleSubAccordionClick = (index) => {
        if (index === subAccordionOpen) {
            setSubAccordionOpen(0);
        } else {
            setSubAccordionOpen(index);
        }
    };

    const handleMouseEnter = (event) => {
        event.currentTarget.style.overflowY = "scroll";
    };

    const handleMouseLeave = (event) => {
        event.currentTarget.style.overflowY = "hidden";
    };

    useEffect(() => {
        axios
            .get(`${ApiUrl}/get/Newsletter`)
            .then((response) => {
                const allPdfLinks = response.data.data;

                const currentYearPdfLinks = [];
                const archivedPdfLinks = [];

                const currentDate = new Date();

                allPdfLinks.forEach((item) => {
                    const dateParts = item.eventdate.split('-');
                    const eventDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

                    if (eventDate.getFullYear() === currentDate.getFullYear()) {
                        currentYearPdfLinks.push(item);
                    } else {
                        archivedPdfLinks.push(item);
                    }
                });

                setPdfLinks(currentYearPdfLinks);
                setArchivedPdfLinks(archivedPdfLinks);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    if (pdfLinks.length > 0) {
        pdfLinks.sort((a, b) => new Date(b.eventdate) - new Date(a.eventdate));
    }

    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="container subpage">
                <br />
                <h2>Monthly News Letter</h2>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div
                                className="col-12 col-lg-12 custom-scrollbar"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                <div className="accordion" id="newsletterAccordion">
                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header" onClick={handleMainAccordionClick}>
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#allNewsletters"
                                                aria-expanded="true"
                                                aria-controls="allNewsletters"
                                                style={{ fontWeight: "bold" }}>
                                                NewsLetter - {new Date().getFullYear()}
                                            </button>
                                        </h2>
                                        <div
                                            id="allNewsletters"
                                            className={`accordion-collapse collapse ${mainAccordionOpen ? "show" : ""}`}
                                            aria-labelledby="allNewsletters"
                                            data-parent="#newsletterAccordion">
                                            <div className="accordion-body">
                                                {pdfLinks.length > 0 ? (
                                                    pdfLinks
                                                        .reduce((acc, pdf) => {
                                                            const existingMonth = acc.find(
                                                                (item) => item.month === pdf.month
                                                            );
                                                            if (existingMonth) {
                                                                existingMonth.pdfs.push(pdf);
                                                            } else {
                                                                acc.push({ month: pdf.month, pdfs: [pdf] });
                                                            }
                                                            return acc;
                                                        }, [])
                                                        .map((monthGroup, index) => (
                                                            <div key={index}>
                                                                <div className="accordion-item">
                                                                    <h2
                                                                        className="accordion-header"
                                                                        onClick={() =>
                                                                            handleSubAccordionClick(index + 1)
                                                                        }>
                                                                        <button
                                                                            className="accordion-button"
                                                                            type="button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target={`#collapse${index}`}
                                                                            aria-expanded={index === 0 ? "true" : "false"}
                                                                            aria-controls={`collapse${index}`}
                                                                            onClick={(event) => {
                                                                                const clickedElement = event.target;
                                                                                const isSubAccordion = clickedElement.closest(
                                                                                    ".accordion-collapse"
                                                                                );

                                                                                if (!isSubAccordion) {
                                                                                    const mainAccordion = document.getElementById(
                                                                                        "allNewsletters"
                                                                                    );
                                                                                    if (mainAccordion) mainAccordion.classList.remove("show");
                                                                                }
                                                                            }}
                                                                            style={{ fontWeight: "bold" }}>
                                                                            {currentYear}
                                                                        </button>
                                                                    </h2>
                                                                    <div
                                                                        id={`collapse${index}`}
                                                                        className={`accordion-collapse collapse ${subAccordionOpen === index + 1 ? "show" : ""
                                                                            }`}
                                                                        aria-labelledby={`heading${index}`}
                                                                        data-parent="#newsletterAccordion">
                                                                        <div className="accordion-body">
                                                                            {monthGroup.pdfs.map((pdf, pdfIndex) => (
                                                                                <div key={pdfIndex}>
                                                                                    <p>
                                                                                        <b>{pdf.title} </b>
                                                                                    </p>
                                                                                    <p>{pdf.eventdate}</p>
                                                                                    <a
                                                                                        href={pdf.file_url}
                                                                                        rel="noopener noreferrer"
                                                                                        className="btn btn-sm"
                                                                                        target="_blank"
                                                                                        style={{
                                                                                            backgroundColor: "#012c6d",
                                                                                            color: "#e0ab08",
                                                                                            textDecoration: "none",
                                                                                        }}>
                                                                                        <FontAwesomeIcon icon={faDownload} /> Download
                                                                                    </a>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                ) : (
                                                    <p className="text-center font-weight-bold" style={{ fontSize: "16px" }}>
                                                        No Newsletters Available
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Archived Newsletters */}
                                    {archivedPdfLinks.length > 0 && (
                                        <div className="accordion-item mb-4">
                                            <h2 className="accordion-header" onClick={() => handleSubAccordionClick(0)}>
                                                <button
                                                    className="accordion-button"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#archiveNewsletters"
                                                    aria-expanded="false"
                                                    aria-controls="archiveNewsletters"
                                                    style={{ fontWeight: "bold" }}>
                                                    Archived NewsLetter - {new Date().getFullYear() - 1}
                                                </button>
                                            </h2>
                                            <div
                                                id="archiveNewsletters"
                                                className={`accordion-collapse collapse ${subAccordionOpen === 0 ? "show" : ""}`}
                                                aria-labelledby="archiveNewsletters"
                                                data-parent="#newsletterAccordion">
                                                <div className="accordion-body">
                                                    {archivedPdfLinks?.map((pdf, pdfIndex) => (
                                                        <div key={pdfIndex}>
                                                            <p>
                                                                <b>{pdf.title} </b>
                                                            </p>
                                                            <p>{pdf.eventdate}</p>
                                                            <a
                                                                href={pdf.file_url}
                                                                rel="noopener noreferrer"
                                                                className="btn btn-sm"
                                                                target="_blank"
                                                                style={{
                                                                    backgroundColor: "#012c6d",
                                                                    color: "#e0ab08",
                                                                    textDecoration: "none",
                                                                }}>
                                                                <FontAwesomeIcon icon={faDownload} /> Download
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsLetter;