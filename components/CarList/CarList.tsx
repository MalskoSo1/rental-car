"use client";

import CarItem from "../CarItem/CarItem";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import css from "./CarList.module.css";

interface CarListProps {
  plusPage: () => void;
}

const CarList = ({ plusPage }: CarListProps) => {
  const cars = useVehiclesStore((s) => s.vehicles) ?? [];

  return (
    <div className={css.carListContainer}>
      <ul className={css.carList}>
        {cars.map((car) => {
          return <CarItem key={car.id} car={car} />;
        })}
      </ul>

      <button className={css.buttonLoadMore} type="button" onClick={plusPage}>
        Load more
      </button>
    </div>
  );
};

export default CarList;
