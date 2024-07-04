import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ApiUrl } from "../../components/API/Api";

const Contact = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [loaderVisible, setLoaderVisible] = useState(false);

    const recaptchaRef = useRef();

    const navigate = useNavigate();

    const onSubmitContactForm = (data, e) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (!recaptchaValue) {
            setValue("recaptcha", "", { shouldValidate: true });
            setLoaderVisible(false);
            return;
        }

        setLoaderVisible(true);

        data.recaptchaValue = recaptchaValue;

        axios
            .post(`${ApiUrl}/store/contact`, data)
            .then((response) => {
                setLoaderVisible(false);
                if (response.data.status === 'success') {
                    Swal.fire(
                        "Thank you for contacting us!",
                        "",
                        "success"
                    );
                    e.target.reset();
                    navigate("/contactus");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.data.message,
                    });
                }
            })
            .catch((err) => {
                setLoaderVisible(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: err.message,
                });
            });
    };
    return (
        <>
            <div className="container subpage">
                <h3 className="heading">Contact Us</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <h5>Location</h5>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245700.65787757526!2d78.049197!3d15.800116000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5ddbdc93ac40f%3A0x74444a846579e47b!2sBishop&#39;s%20House!5e0!3m2!1sen!2sus!4v1720072651558!5m2!1sen!2sus" height={550} style={{ border: 0, width: " 100%" }} allowFullScreen title="st charles" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                        </div>
                    </div>
                </div>
                <h5>Contact Us</h5>
                <div className="row">
                    <div className="ecep bs-callout col-lg-6">
                        <img src="images/subpage/alumni-3-1.jpg" alt="" />

                        <div>
                            <i className="fa fa-map-marker"></i>&nbsp;&nbsp;&nbsp;
                            Diocese of Kurnool,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bishop’s House, Matha Kovil Street,<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;St. Sebastian’s Cathedral, Sultanpet,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Palakkad – 678 001, Kerala, S.India.
                        </div>
                        <br />
                        <div>
                            <i className="fa fa-phone"></i>&nbsp;&nbsp;
                            <a href="tel:+91" style={{ color: "#6b1d2f" }}>
                                (08518) 27 03 93 (O), 27 68 12 (P)
                            </a>
                        </div>
                        <br />

                        <div>
                            <i className="fa fa-envelope"></i>&nbsp;&nbsp;
                            <a href="mailto:bpjohannesocd@gmail.com" style={{ color: "#6b1d2f" }}>
                                bpjohannesocd@gmail.com
                            </a>
                        </div>
                        <br />

                        <div>
                            <i className="fa fa-globe"></i>&nbsp;&nbsp;
                            <a href="http://kurnooldiocese.in/" style={{ color: "#6b1d2f" }}>
                                kurnooldiocese.in
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 bs-callout">
                        <form
                            className="php-email-form"
                            onSubmit={handleSubmit(onSubmitContactForm)}
                        >
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Your Name <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        {...register("name", { required: true })}
                                        aria-invalid={errors?.name ? "true" : "false"}
                                    />
                                    {errors?.name?.type === "required" && (
                                        <div className="text-danger text_error">
                                            <label className="errlabel">Name is required</label>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Your Email <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        {...register("email", { required: true })}
                                        aria-invalid={errors?.email ? "true" : "false"}
                                    />
                                    {errors?.email?.type === "required" && (
                                        <div className="text-danger text_error">
                                            <label className="errlabel">Email is required</label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Your Mobile <span style={{ color: "red" }}>*</span></label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="mobile"
                                    id="mobile"
                                    maxLength={10}
                                    {...register("mobile", { required: true })}
                                    aria-invalid={errors?.mobile ? "true" : "false"}
                                />
                                {errors?.mobile?.type === "required" && (
                                    <div className="text-danger text_error">
                                        <label className="errlabel">Mobile is required</label>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message <span style={{ color: "red" }}>*</span></label>
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows={10}
                                    defaultValue={""}
                                    {...register("message", { required: true })}
                                    aria-invalid={errors?.message ? "true" : "false"}
                                />
                                {errors?.message?.type === "required" && (
                                    <div className="text-danger text_error">
                                        <label className="errlabel">Message is required</label>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey="959421af-0747-4c76-94da-27b547fd50cd"
                                    onChange={(value) => {
                                        setValue("recaptcha", value, { shouldValidate: true });
                                    }}
                                    style={{ maxWidth: "300px", margin: "0 auto" }}
                                />
                                {errors.recaptcha && (
                                    <span className="text-danger">Please complete the reCAPTCHA verification.</span>
                                )}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="buttonjs">
                                    Send Message
                                </button>

                                <span
                                    id="loader"
                                    style={{ display: loaderVisible ? "inline-block" : "none" }}
                                >
                                    <img
                                        src="images/subpage/gif/ajaxload.gif"
                                        width="32px"
                                        height="32px"
                                        alt="Loader"
                                    />
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
