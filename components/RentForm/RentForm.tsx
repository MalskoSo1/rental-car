"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RentForm.module.css";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";

registerLocale("en-GB", enGB);

interface RentFormValues {
  name: string;
  email: string;
  date: Date | null;
  comment: string;
}

const RentForm = () => {
  const handleSubmit = (
    values: RentFormValues,
    { resetForm }: FormikHelpers<RentFormValues>,
  ) => {
    toast.success("Your booking request has been sent!");
    resetForm();
  };

  const initialValues: RentFormValues = {
    name: "",
    email: "",
    date: null,
    comment: "",
  };

  const FormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    date: Yup.date()
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        "Date cannot be in the past",
      )
      .nullable(),
    comment: Yup.string(),
  });
  return (
    <div className={css.bookingForm}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
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
                autoComplete="name"
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
                type="email"
                name="email"
                placeholder="Email*"
                className={css.input}
                autoComplete="email"
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

              <DatePicker
                id="date"
                selected={values.date}
                onChange={(date: Date | null) => setFieldValue("date", date)}
                placeholderText="Booking date"
                className={css.input}
                wrapperClassName={css.wrapper}
                calendarClassName={css.datePickerCalendar}
                autoComplete="off"
                formatWeekDay={(day) => day.toUpperCase().slice(0, 3)}
                locale="en-GB"
                minDate={new Date()}
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className={css.customHeader}>
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      className={`${css.monthBtn} ${prevMonthButtonDisabled ? css.monthBtnDisabled : ""}`}
                      type="button"
                    >
                      <svg className={css.monthIcon}>
                        <use href="/img/sprite.svg#icon-arrow-left" />
                      </svg>
                    </button>

                    <span className={css.currentMonth}>
                      {date.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      className={`${css.monthBtn} ${nextMonthButtonDisabled ? css.monthBtnDisabled : ""}`}
                      type="button"
                    >
                      <svg className={css.monthIcon}>
                        <use href="/img/sprite.svg#icon-arrow-right" />
                      </svg>
                    </button>
                  </div>
                )}
              />

              <div className={css.errorPlaceholder}>
                <ErrorMessage
                  component="span"
                  name="date"
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
            </div>

            {/* BUTTON */}
            <button type="submit" className={css.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RentForm;
