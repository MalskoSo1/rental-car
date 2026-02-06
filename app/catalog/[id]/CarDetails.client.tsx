"use client";

import RentForm from "@/components/RentForm/RentForm";
import { fetchCarById } from "@/lib/carsApi";
import { formatAddress } from "@/lib/common";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import css from "./CarDetails.client.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";

const CarDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getCar", id],
    queryFn: () => fetchCarById(id),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Oops! Something went wrong while loading car.");
    }
  }, [isError, error]);

  if (!car) {
    notFound();
  }

  const addressDetails = formatAddress(car?.address);

  return (
    <div className={css.carPage}>
      {isLoading && <Loader />}

      {isSuccess && car && (
        <div className={css.carInfoContainer}>
          <div className={css.carLeftPart}>
            <Image
              src={
                car?.img ||
                "/img/flat-car-picture-placeholder-symbol-600nw-2366856295.webp"
              }
              alt={`${car?.brand} ${car?.model}`}
              width={640}
              height={512}
              className={css.carImage}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 640px"
            />
            <RentForm />
          </div>
          <div className={css.carRightPart}>
            {/* MAIN INFO */}
            <div className={css.carMainInfo}>
              <div className={css.nameWrapper}>
                <h2 className={css.carTitle}>
                  {car?.brand} {car?.model}, {car?.year}
                </h2>
                <p className={css.carId}>Id: {car?.id}</p>
              </div>

              <div className={css.locationCarWrapper}>
                <span className={css.icon}>
                  <svg className={css.svgIcon}>
                    <use href="../../img/sprite.svg#icon-location" />
                  </svg>
                </span>

                <p className={css.carLocation}>
                  {addressDetails.city}, {addressDetails.country}
                </p>
                <p className={css.carMileage}>
                  Mileage: {car?.mileage.toLocaleString()} km
                </p>
              </div>

              <p className={css.carPrice}>${car?.rentalPrice}</p>
              <p className={css.carDescription}>{car?.description}</p>
            </div>

            {/* EXTRA INFO */}
            <div className={css.carExtraInfo}>
              <h3 className={css.rentalConditionsTitle}>Rental Conditions:</h3>
              <ul className={css.rentalConditions}>
                {car?.rentalConditions.map((info, index) => {
                  return (
                    <li key={index} className={css.rentalConditionsItem}>
                      <span className={css.icon}>
                        <svg className={css.svgIcon}>
                          <use href="../../img/sprite.svg#icon-check-circle" />
                        </svg>
                      </span>
                      {info}
                    </li>
                  );
                })}
              </ul>

              <h3 className={css.carSpecificationsTitle}>
                Car Specifications:
              </h3>
              <ul className={css.carSpecifications}>
                <li className={css.specItem}>
                  <span className={css.icon}>
                    <svg className={css.svgIcon}>
                      <use href="../../img/sprite.svg#icon-calendar" />
                    </svg>
                  </span>
                  Year: {car?.year}
                </li>
                <li className={css.specItem}>
                  <span className={css.icon}>
                    <svg className={css.svgIcon}>
                      <use href="../../img/sprite.svg#icon-car" />
                    </svg>
                  </span>
                  Type: {car?.type}
                </li>
                <li className={css.specItem}>
                  <span className={css.icon}>
                    <svg className={css.svgIcon}>
                      <use href="../../img/sprite.svg#icon-fuel-pump" />
                    </svg>
                  </span>
                  Fuel Consumption: {car?.fuelConsumption}
                </li>
                <li className={css.specItem}>
                  <span className={css.icon}>
                    <svg className={css.svgIcon}>
                      <use href="../../img/sprite.svg#icon-gear" />
                    </svg>
                  </span>
                  Engine Size: {car?.engineSize}
                </li>
              </ul>

              <h3 className={css.carAccessoriesTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.accessories}>
                {car?.accessories.map((accessory, index) => {
                  return (
                    <li key={index} className={css.accessoryItem}>
                      <span className={css.icon}>
                        <svg className={css.svgIcon}>
                          <use href="../../img/sprite.svg#icon-check-circle" />
                        </svg>
                      </span>
                      {accessory}
                    </li>
                  );
                })}
                {car?.rentalConditions.map((functionality, index) => {
                  return (
                    <li key={index} className={css.accessoryItem}>
                      <span className={css.icon}>
                        <svg className={css.svgIcon}>
                          <use href="../../img/sprite.svg#icon-check-circle" />
                        </svg>
                      </span>
                      {functionality}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsClient;
