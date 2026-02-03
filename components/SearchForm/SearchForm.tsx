"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./SearchForm.module.css";
import * as Yup from "yup";
import { fetchBrands } from "@/lib/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useVehiclesStore } from "@/store/useVehiclesStore";

const SearchForm = () => {
  const handleSubmit = () => console.log("hello");

  const {
    data: brands,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getBrands"],
    queryFn: () => fetchBrands(),
    // placeholderData: keepPreviousData,
  });

  const vehicles = useVehiclesStore((s) => s.vehicles);
  const carPrices = vehicles?.map((x) => Number(x.rentalPrice));
  const minPrice = Math.min(...(carPrices ?? []));
  const maxPrice = Math.max(...(carPrices ?? []));
  const availablePrices = [];

  for (let price = minPrice; price <= maxPrice; price += 10) {
    availablePrices.push(price);
  }

  const initialValues = {
    brand: "",
    price: "Choose a price",
    from: "",
    to: "",
  };

  const FormSchema = Yup.object().shape({
    brand: Yup.mixed().required("Brand is required"),
    price: Yup.mixed()
      .oneOf(["Expense", "Income"], "Invalid price")
      .required("Price is required"),
    from: Yup.number()
      .typeError("Must be a number")
      .integer("Must be an integer")
      .min(1, "Must be at least 1")
      .max(1000000, "Must be at most 1000000"),
    to: Yup.number()
      .typeError("Must be a number")
      .integer("Must be an integer")
      .min(1, "Must be at least 1")
      .max(1000000, "Must be at most 1000000"),
  });
  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FormSchema}
        >
          <Form>
            {/* CAR BRAND */}
            <div className={css.formGroup}>
              <label htmlFor="brand">Car brand</label>
              <Field
                as="select"
                id="brand"
                name="brand"
                className={css.select}
                placeholder="Choose a brand"
              >
                <option value="" disabled>
                  Choose a brand
                </option>
                {brands?.map((brand) => {
                  return (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                component="span"
                name="brand"
                className={css.error}
                id="brand-error"
              />
            </div>

            {/* PRICE */}
            <div className={css.formGroup}>
              <label htmlFor="price">Price/ 1 hour</label>
              <Field
                as="select"
                id="price"
                name="price"
                className={css.select}
                placeholder="Choose a price"
              >
                <option value="" disabled>
                  Choose a price
                </option>
                {availablePrices?.map((price) => {
                  return (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                component="span"
                name="price"
                className={css.error}
                id="price-error"
              />
            </div>

            {/* FROM / TO */}
            <fieldset className={css.formGroup}>
              <legend>Car mileage / km</legend>

              <div className={css.rangeInputs}>
                <Field
                  id="from"
                  type="number"
                  name="from"
                  placeholder="From"
                  className={css.input}
                />

                <Field
                  id="to"
                  type="number"
                  name="to"
                  placeholder="To"
                  className={css.input}
                />
              </div>

              <div>
                <ErrorMessage
                  component="span"
                  name="from"
                  className={css.error}
                />
                <ErrorMessage
                  component="span"
                  name="to"
                  className={css.error}
                />
              </div>
            </fieldset>

            {/* BUTTON */}
            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                Search
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SearchForm;
