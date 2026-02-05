"use client";

import { formatAddress } from "@/lib/common";
import css from "./CarItem.module.css";
import { Car } from "@/type/car";
import Image from "next/image";
import Link from "next/link";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useState } from "react";

interface CarItemProps {
  car: Car;
}

const CarItem = ({ car }: CarItemProps) => {
  const addressDetails = formatAddress(car.address);

  const favoriteList = useVehiclesStore((s) => s.favoriteList) ?? [];
  const setFavoriteList = useVehiclesStore((s) => s.setFavoriteList);

  const [isInFavorites, setIsInFavorites] = useState(
    favoriteList?.find((x) => x === car.id),
  );

  const handleFavoriteFunction = () => {
    if (isInFavorites) {
      const index = favoriteList?.indexOf(isInFavorites);
      favoriteList?.splice(index, 1);
      setIsInFavorites(undefined);
    } else {
      favoriteList.push(car.id);
      setIsInFavorites(car.id);
    }
    setFavoriteList(favoriteList);
  };

  return (
    <li key={car.id} className={css.carItem}>
      <div className={css.imageWrapper}>
        <button
          type="button"
          className={css.icon}
          onClick={handleFavoriteFunction}
        >
          {isInFavorites ? (
            <svg className={css.heart}>
              <use href="../../img/sprite.svg#icon-heart-active" />
            </svg>
          ) : (
            <svg className={css.heart}>
              <use href="../../img/sprite.svg#icon-heart" />
            </svg>
          )}
        </button>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={css.carImage}
          loading="eager"
        />
      </div>

      <div className={css.carInfo}>
        <h2 className={css.carTitle}>
          {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <p className={css.carTitle}>${car.rentalPrice}</p>
      </div>

      <div className={css.infoWrapper}>
        <p className={css.info}>{addressDetails.city}</p>

        <p className={css.info}>{addressDetails.country}</p>

        <p className={css.info}>{car.rentalCompany}</p>

        <p className={css.info}>{car.type}</p>

        <p className={css.info}>{car.mileage.toLocaleString()} km</p>
      </div>

      <Link href={`/catalog/${car.id}`} className={css.readMore}>
        Read more
      </Link>
    </li>
  );
};

export default CarItem;
