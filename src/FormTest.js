import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CustomRadio from "./CustomRadio";

const FormTest = () => (
    <div>
        <Formik
            initialValues={{
                outside: '',
                outsideInput: '',
                users: [],
            }}
            validationSchema={Yup.object({
                outside: Yup.string().required("outside required"),
                outsideInput: Yup.string().when('outside', {
                    is: '1',
                    then: Yup.string().required("outside input required")
                }),
                users: Yup.array().of(
                    Yup.object().shape({
                        name: Yup.string().required("Name required"),
                        email: Yup.string()
                            .required("email required")
                            .email("Enter valid email")
                    })
                )
            })}
            onSubmit={(values) => console.log('SUBMIT', values)}
            validate={(val) => { console.log('VALIDATE:', val) }}
            render={({ values, touched, errors, handleSubmit }) => (
                <Form>
                    {console.log('ERRORS:', errors)}
                    <Field
                        placeholder="outside"
                        name={`outside`}
                        component={CustomRadio}
                    />
                    <ErrorMessage name={`outside`} />

                    <Field
                        placeholder="outsideInput"
                        name={`outsideInput`}
                    />
                    <ErrorMessage name={`outsideInput`} />


                    <FieldArray
                        name="users"
                        render={(arrayHelpers) => {
                            const users = values.users;
                            return (
                                <div>
                                    {users && users.length > 0
                                        ? users.map((user, index) => (
                                            <div key={index}>
                                                <Field
                                                    placeholder="user name"
                                                    name={`users.${index}.name`}
                                                />
                                                <ErrorMessage name={`users.${index}.name`} />
                                                <br />

                                                <Field
                                                    placeholder="user email"
                                                    name={`users.${index}.email`}
                                                />
                                                <ErrorMessage name={`users.${index}.email`} />

                                                <br />

                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                >
                                                    -
                                                </button>
                                                <br />
                                                <br />
                                            </div>
                                        ))
                                        : null}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                name: "",
                                                email: ""
                                            })
                                        }
                                    >
                                        add a User
                                    </button>
                                    <div>
                                        <button type='button' onClick={handleSubmit}>Form Submit</button>
                                    </div>
                                </div>
                            );
                        }}
                    />
                    <hr />
                </Form>
            )}
        />
    </div>
);

export default FormTest;