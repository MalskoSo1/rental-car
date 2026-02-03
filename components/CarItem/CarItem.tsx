"use client";

import { formatAddress } from "@/lib/common";
import css from "./CarItem.module.css";
import { Car } from "@/type/car";
import Image from "next/image";
import Link from "next/link";

interface CarItemProps {
  car: Car;
}

const CarItem = ({ car }: CarItemProps) => {
  const addressDetails = formatAddress(car.address);

  return (
    <li key={car.id}>
      <span>Heart</span>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={276}
        height={268}
      />

      <div>
        <h2>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p>$ {car.rentalPrice}</p>
      </div>

      <div className={css.infoWrapper}>
        <p>{addressDetails.city}</p>

        <p>{addressDetails.country}</p>

        <p>{car.rentalCompany}</p>

        <p>{car.type}</p>

        <p>{car.mileage.toLocaleString()} km</p>
      </div>

      <Link href={`/catalog/${car.id}`}>Read more</Link>
    </li>
  );
};

export default CarItem;
