"use client";

import { Formik, FormikProps, Form, Field, FormikValues } from "formik";
import css from "./SearchForm.module.css";
import * as Yup from "yup";
import { fetchBrands } from "@/lib/carsApi";
import { useQuery } from "@tanstack/react-query";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { components } from "react-select";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { Car, SearchFormValues } from "@/type/car";
import { toast } from "react-toastify";
import { useRef } from "react";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <div className={css.selectSkeleton}></div>,
});

interface Option {
  value: string | number;
  label: string;
}

interface SearchFormProps {
  allCars: Car[];
}

const SearchForm = ({ allCars }: SearchFormProps) => {
  const setFilter = useVehiclesStore((s) => s.setFilter);
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  const {
    data: brands,
    isError: isBrandsError,
    error: brandsError,
  } = useQuery({
    queryKey: ["getBrands"],
    queryFn: () => fetchBrands(),
  });

  useEffect(() => {
    if (isBrandsError) {
      toast.error("Oops! Something went wrong while loading brands.");
    }
  }, [isBrandsError, brandsError]);

  const carPrices = allCars?.map((x) => Number(x.rentalPrice));
  const minPrice = Math.min(...(carPrices ?? []));
  const maxPrice = Math.max(...(carPrices ?? []));
  const availablePrices: number[] = [];
  const brandOptions = useMemo(
    () => brands?.map((b) => ({ value: b, label: b })) ?? [],
    [brands],
  );

  for (let price = minPrice; price <= maxPrice; price += 10) {
    availablePrices.push(price);
  }

  const initialValues: SearchFormValues = {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  };

  const FormSchema = Yup.object().shape({
    brand: Yup.mixed(),
    price: Yup.mixed(),
    from: Yup.number().nullable(),
    to: Yup.number().nullable(),
  });

  const priceOptions = availablePrices?.map((price) => ({
    value: price,
    label: `$${price}`,
  }));

  const resetPage = useVehiclesStore((s) => s.resetPage);

  const handleSubmit = (values: SearchFormValues) => {
    const newFilter: SearchFormValues = {
      brand: values.brand || undefined,
      rentalPrice: values.rentalPrice || undefined,
      minMileage: values.minMileage || undefined,
      maxMileage: values.maxMileage || undefined,
    };
    resetPage();
    setFilter(newFilter);
  };

  return (
    <div className={css.formContainer}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        {(formik: FormikProps<typeof initialValues>) => (
          <Form className={css.form}>
            {/* CAR BRAND */}
            <div className={`${css.formGroup} ${css.brandGroup}`}>
              <p className={css.label}>Car brand</p>
              <div className={css.inputWrapper}>
                <Select
                  inputId="brand-input"
                  instanceId="brand-input"
                  name="brand"
                  options={brandOptions}
                  isSearchable={false}
                  placeholder="Choose a brand"
                  classNamePrefix="custom"
                  aria-label="Car brand"
                  value={
                    brandOptions?.find(
                      (b) => b.value === formik.values.brand,
                    ) || null
                  }
                  onChange={(option) =>
                    formik.setFieldValue(
                      "brand",
                      (option as Option)?.value || "",
                    )
                  }
                  components={{
                    DropdownIndicator: (props) => (
                      <components.DropdownIndicator {...props}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "16px",
                            height: "16px",
                            color: "#101828",
                          }}
                        >
                          {props.selectProps.menuIsOpen ? (
                            <svg
                              width="16"
                              height="16"
                              className={css.arrowDown}
                            >
                              <use href="../../img/sprite.svg#icon-arrow-up" />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              className={css.arrowDown}
                            >
                              <use href="../../img/sprite.svg#icon-arrow-down" />
                            </svg>
                          )}
                        </div>
                      </components.DropdownIndicator>
                    ),
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "12px",
                      border: "1px solid var(--inputs)",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      height: "44px",
                      width: "100%",
                      background: "var(--inputs)",
                      boxShadow: "none",
                      outline: "none",
                      "&:hover": {
                        border: "1px solid var(--inputs)",
                      },
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      padding: 0,
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: 0,
                      padding: 0,
                    }),

                    singleValue: (provided) => ({
                      ...provided,
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "var(--main)",
                      margin: 0,
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "var(--main)",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: 0,
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                    }),
                    //^ OPEN MENU
                    menu: (provided) => ({
                      ...provided,
                      marginTop: "4px",
                      border: "1px solid var(--inputs)",
                      borderRadius: "12px",
                      width: "100%",
                      height: "272px",
                      boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
                      background: "var(--white)",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: "8px 0",
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "var(--gray)",
                      maxHeight: "272px",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      background: "var(--white)",
                      color: state.isFocused ? "var(--main)" : "var(--gray)",
                      backgroundColor: "var(--white)",
                      "&:active": {
                        backgroundColor: "var(--white)",
                      },
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      padding: "8px 16px",
                      cursor: "pointer",
                    }),
                  }}
                />
                {formik.values.brand && (
                  <button
                    type="button"
                    className={css.iconXLibrary}
                    onClick={() => formik.setFieldValue("brand", "")}
                  >
                    <svg className={css.svgX}>
                      <use href="../../img/sprite.svg#icon-x" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* PRICE */}
            <div className={`${css.formGroup} ${css.priceGroup}`}>
              <p className={css.label}>Price / 1 hour</p>
              <div className={css.inputWrapper}>
                <Select
                  inputId="price-input"
                  instanceId="price-input"
                  name="rentalPrice"
                  aria-label="Price / 1 hour"
                  options={priceOptions}
                  value={
                    priceOptions?.find(
                      (p) => p.value === Number(formik.values.rentalPrice),
                    ) || null
                  }
                  isSearchable={false}
                  placeholder="Choose a price"
                  classNamePrefix="custom"
                  onChange={(option) => {
                    const selectedPrice = (option as Option)?.value || "";
                    formik.setFieldValue("rentalPrice", selectedPrice);
                  }}
                  formatOptionLabel={(option, { context }) => {
                    if (
                      context === "value" &&
                      Number(formik.values.rentalPrice) ===
                        (option as Option).value
                    ) {
                      return `To $${(option as Option).value}`;
                    }
                    return `${(option as Option).value}`;
                  }}
                  components={{
                    DropdownIndicator: (props) => (
                      <components.DropdownIndicator {...props}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "16px",
                            height: "16px",
                            color: "#101828",
                          }}
                        >
                          <svg
                            width="100%"
                            height="100%"
                            className={css.arrowDown}
                          >
                            <use
                              href={
                                props.selectProps.menuIsOpen
                                  ? "../../img/sprite.svg#icon-arrow-up"
                                  : "../../img/sprite.svg#icon-arrow-down"
                              }
                            ></use>
                          </svg>
                        </div>
                      </components.DropdownIndicator>
                    ),
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "12px",
                      border: "1px solid var(--inputs)",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      width: "100%",
                      height: "44px",
                      background: "var(--inputs)",
                      boxShadow: "none",
                      outline: "none",
                      "&:hover": {
                        border: "1px solid var(--inputs)",
                      },
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      padding: 0,
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: 0,
                      padding: 0,
                    }),

                    singleValue: (provided) => ({
                      ...provided,
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "var(--main)",
                      margin: 0,
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "var(--main)",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: 0,
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                    }),
                    //^ OPEN MENU
                    menu: (provided) => ({
                      ...provided,
                      marginTop: "4px",
                      border: "1px solid var(--inputs)",
                      borderRadius: "12px",
                      width: "100%",
                      boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
                      background: "var(--white)",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: "8px 0",
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "var(--gray)",
                      maxHeight: "188px",
                      overflowY: "auto",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      background: "var(--white)",
                      color: state.isFocused ? "var(--main)" : "var(--gray)",
                      backgroundColor: "var(--white)",
                      "&:active": {
                        backgroundColor: "var(--white)",
                      },
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "125%",
                      padding: "8px 16px",
                      cursor: "pointer",
                    }),
                  }}
                />
                {formik.values.rentalPrice && (
                  <button
                    type="button"
                    className={css.iconXLibrary}
                    onClick={() => formik.setFieldValue("rentalPrice", "")}
                  >
                    <svg className={css.svgX}>
                      <use href="../../img/sprite.svg#icon-x" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* FROM / TO */}
            <fieldset className={`${css.formGroup} ${css.fieldsetGroup}`}>
              <legend className={css.legend}>Car mileage / km</legend>

              <div className={css.rangeInputs}>
                <div className={css.inputBox}>
                  <label htmlFor="from" className={css.prefix}>
                    From
                  </label>
                  <Field
                    id="from"
                    type="number"
                    name="minMileage"
                    className={`${css.input} ${css.inputLeft} ${
                      formik.values.minMileage ? css.inputWithFilter : ""
                    }`}
                  />
                  {formik.values.minMileage && (
                    <button
                      type="button"
                      className={css.iconX}
                      onClick={() => {
                        formikRef.current?.setFieldValue("minMileage", "");
                      }}
                    >
                      <svg className={css.svgX}>
                        <use href="../../img/sprite.svg#icon-x" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className={css.inputBox}>
                  <label htmlFor="to" className={css.prefix}>
                    To
                  </label>
                  <Field
                    id="to"
                    type="number"
                    name="maxMileage"
                    className={`${css.input} ${css.inputRight} ${
                      formik.values.maxMileage ? css.inputWithFilter : ""
                    }`}
                  />
                  {formik.values.maxMileage && (
                    <button
                      type="button"
                      className={css.iconX}
                      onClick={() => {
                        formikRef.current?.setFieldValue("maxMileage", "");
                      }}
                    >
                      <svg className={css.svgX}>
                        <use href="../../img/sprite.svg#icon-x" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </fieldset>

            {/* BUTTON */}
            <button type="submit" className={css.submitButton}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
