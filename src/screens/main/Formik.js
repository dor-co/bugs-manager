import React from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

import { Radio } from "antd";

const Formik = () => {
  return (
    <>
      <Formik
        initialValues={{
          input1: null,
          radio: null,
          input2: null
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <>
            <Form
              onSubmit={formik.handleSubmit}
              className="custom-formik-container"
            >
              <Form.Group>
                <span>input1: </span>
                <Form.Control
                  id={"input1"}
                  name={"input1"}
                  {...formik.getFieldProps("input1")}
                />
              </Form.Group>

              {formik.getFieldProps("radio").value !== 2 && (
                <Form.Group>
                  <span>input2: </span>
                  <Form.Control
                    id={"input2"}
                    name={"input2"}
                    {...formik.getFieldProps("input2")}
                  />
                </Form.Group>
              )}

              <Form.Group>
                <span>radio: </span>
                <Radio.Group {...formik.getFieldProps("radio")}>
                  <Radio value={1}>yes</Radio>
                  <Radio value={2}>no</Radio>
                </Radio.Group>
              </Form.Group>
            </Form>

            <button
              style={{
                width: 200,
                height: 30,
                background: "#113776",
                color: "#fff"
              }}
              onClick={() => formik.handleSubmit()}
            >
              S U B M I T
            </button>
          </>
        )}
      </Formik>
    </>
  );
};
export default Formik;