// import css from "./CarList.module.css";

"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CarItem from "../CarItem/CarItem";
import { fetchCars } from "@/lib/clientApi";
import { useVehiclesStore } from "@/store/useVehiclesStore";

const CarList = () => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["getCars"],
    queryFn: () => fetchCars(),
    // placeholderData: keepPreviousData,
    placeholderData: { cars: [] },
    enabled: false,
  });

  const setVehicles = useVehiclesStore((s) => s.setVehicles);

  if (isSuccess) setVehicles(data.cars);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <ul>
        {data?.cars.map((car) => {
          return <CarItem key={car.id} car={car} />;
        })}
      </ul>

      <button type="button">Load more</button>
    </>
  );
};

export default CarList;
