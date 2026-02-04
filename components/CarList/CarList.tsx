"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CarItem from "../CarItem/CarItem";
import { fetchCars } from "@/lib/clientApi";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import css from "./CarList.module.css";

const CarList = () => {
  const cars = useVehiclesStore((s) => s.vehicles) ?? [];

  return (
    <div className={css.carListContainer}>
      <ul className={css.carList}>
        {cars.map((car) => {
          return <CarItem key={car.id} car={car} />;
        })}
      </ul>

      <button className={css.buttonLoadMore} type="button">
        Load more
      </button>
    </div>
  );
};

export default CarList;
