"use client";

import RentForm from "@/components/RentForm/RentForm";
import { fetchCarById } from "@/lib/clientApi";
import { formatAddress } from "@/lib/common";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

// import css from "./page.module.css";

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
    // placeholderData: keepPreviousData,
  });
  const addressDetails = formatAddress(car?.address);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <div>
        <div>
          <Image
            src={
              car?.img ||
              "/img/flat-car-picture-placeholder-symbol-600nw-2366856295.webp"
            }
            alt={`${car?.brand} ${car?.model}`}
            width={640}
            height={512}
          />
          <RentForm />
        </div>
        <div>
          <div>
            <h2>
              {car?.brand} {car?.model}, {car?.year}
            </h2>
            <p>Id: {car?.id}</p>
            <span>SVG</span>
            <p>
              {addressDetails.city}, {addressDetails.country}
            </p>
            <p>Mileage: {car?.mileage.toLocaleString()} km</p>
            <p>$ {car?.rentalPrice}</p>
            <p>{car?.description}</p>
          </div>
          <div>
            <ul>
              Rental Conditions:
              {car?.rentalConditions.map((info, index) => {
                return (
                  <li key={index}>
                    <span>SVG</span>
                    {info}
                  </li>
                );
              })}
            </ul>
            <ul>
              Car Specifications:
              <li>
                <span>SVG</span>
                Year: {car?.year}
              </li>
              <li>
                <span>SVG</span>
                Type: {car?.type}
              </li>
              <li>
                <span>SVG</span>
                Fuel Consumption: {car?.fuelConsumption}
              </li>
              <li>
                <span>SVG</span>
                Engine Size: {car?.engineSize}
              </li>
            </ul>
            <ul>
              Accessories and functionalities:
              {car?.accessories.map((accessory, index) => {
                return (
                  <li key={index}>
                    <span>SVG</span>
                    {accessory}
                  </li>
                );
              })}
              {car?.rentalConditions.map((functionality, index) => {
                return (
                  <li key={index}>
                    <span>SVG</span>
                    {functionality}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetailsClient;
