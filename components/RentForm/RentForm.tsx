"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RentForm.module.css";
import * as Yup from "yup";

const RentForm = () => {
  const handleSubmit = () => console.log("hello");

  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const FormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    date: Yup.date().min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be in the past",
    ),
    comment: Yup.string(),
  });
  return (
    <>
      <div>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FormSchema}
        >
          <Form>
            {/* NAME */}
            <div className={css.formGroup}>
              <label htmlFor="name" className="sr-only">
                Name
              </label>

              <Field
                id="name"
                type="text"
                name="name"
                placeholder="Name*"
                className={css.input}
              />

              <div className={css.errorPlaceholder}>
                <ErrorMessage
                  component="span"
                  name="name"
                  className={css.error}
                  id="name-error"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className={css.formGroup}>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <Field
                id="email"
                type="text"
                name="email"
                placeholder="Email*"
                className={css.input}
              />

              <div className={css.errorPlaceholder}>
                <ErrorMessage
                  component="span"
                  name="email"
                  className={css.error}
                  id="email-error"
                />
              </div>
            </div>

            {/* DATE */}
            <div className={css.formGroup}>
              <label htmlFor="date" className="sr-only">
                Booking date
              </label>

              <Field
                id="date"
                type="date"
                name="date"
                placeholder="Booking date"
                className={css.input}
              />

              <div className={css.errorPlaceholder}>
                <ErrorMessage
                  component="span"
                  name="date" // here library with date
                  className={css.error}
                  id="date-error"
                />
              </div>
            </div>

            {/* COMMENT */}
            <div className={css.formGroup}>
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>

              <Field
                as="textarea"
                id="comment"
                type="text"
                name="comment"
                placeholder="Comment"
                className={css.textarea}
              />

              <div className={css.errorPlaceholder}>
                <ErrorMessage
                  component="span"
                  name="comment"
                  className={css.error}
                  id="comment-error"
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                Send
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RentForm;
