import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import './App.css';
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStore } from 'react-redux';
import { getName } from './redux/Actions';
import { useSelector, useDispatch } from "react-redux";

function FormTest() {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useStore();

    console.log("this is from useStore", store.getState());

    const handleClick = () => {
        history.push("/component", { data: "myData" });
    }

    const handleClickMain = () => {
        history.push("/manager");
    }

    const push = (val) => {
        dispatch(getName(val.firstName, val.lastName));
        history.push("/component");
    }

    const _focusOnError = () => { //focus on submit on error field
        setTimeout(function () {
            try {
                const elem = document.querySelector(".input-error-loan");
                if (elem.tagName === "INPUT") {
                    elem.focus();
                } else {
                    document.querySelector(".input-error-loan input").focus();
                }
            } catch (e) {
            }
        }, 0);
    };

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: ""
            }}
            onSubmit={values => {
                console.log(values);
                push(values);
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string()
                    .required("Required")
                    .min(3, "firstname too short")
                    .max(12, "firstname too long"),
                lastName: Yup.string()
                    .required("Required")
                    .min(3, "lastname too short")
                    .max(12, "lastname too long")
            })}
        >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <div className="titled-form-row">
                        <div className="form-area">
                            <Form.Group>
                                <Form.Label htmlFor="firstName" className="input-label">
                                    Firstname
                                </Form.Label>
                                <Form.Control
                                    autoComplete="off"
                                    aria-describedby="firstName_error"
                                    // autoComplete="chrome-off"
                                    id="firstName"
                                    name="firstName"
                                    maxLength="25"
                                    style={{ borderRadius: 0 }}
                                    className={`input-check ${formik.touched.firstName && formik.errors.firstName
                                        ? "input-error-loan"
                                        : ""
                                        } `}
                                    {...formik.getFieldProps("firstName")}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="errorsHolder" id="firstName_error">
                                        <span className="formError">
                                            {" "}
                                            {formik.errors.firstName}
                                        </span>
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="lastName" className="input-label">
                                    Lastname
                                </Form.Label>
                                <Form.Control
                                    autoComplete="off"
                                    aria-describedby="firstName_error"
                                    // autoComplete="chrome-off"
                                    id="lastName"
                                    name="lastName"
                                    maxLength="25"
                                    style={{ borderRadius: 0 }}
                                    className={`input-check ${formik.touched.lastName && formik.errors.lastName
                                        ? "input-error-loan"
                                        : ""
                                        } `}
                                    {...formik.getFieldProps("lastName")}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="errorsHolder" id="firstName_error">
                                        <span className="formError">
                                            {" "}
                                            {formik.errors.lastName}
                                        </span>
                                    </div>
                                )}
                            </Form.Group>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="submit-btn-new-loan btn-success"
                            style={{ position: 'absolute', top: 195 }}
                            onClick={() =>
                                formik.validateForm().then(() => _focusOnError())
                            }
                        >
                            submit
                        </button>

                        <button onClick={handleClick}>Go to Second</button>

                        <button onClick={handleClickMain}>Go to Main</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default FormTest;
