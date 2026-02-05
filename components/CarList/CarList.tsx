"use client";

import CarItem from "../CarItem/CarItem";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import css from "./CarList.module.css";
import { useEffect, useState } from "react";
import { fetchCars } from "@/lib/carsApi";
import { useQuery } from "@tanstack/react-query";

const CarList = () => {
  const cars = useVehiclesStore((s) => s.vehicles) ?? [];
  const currentPage = useVehiclesStore((s) => s.page);
  const nextPage = useVehiclesStore((s) => s.nextPage);
  const resetPage = useVehiclesStore((s) => s.resetPage);
  const setVehicles = useVehiclesStore((s) => s.setVehicles);
  const addVehicles = useVehiclesStore((s) => s.addVehicles);
  const filter = useVehiclesStore((s) => s.filter);
  const clearVehicles = useVehiclesStore((s) => s.clearVehicles);
  const clearFilter = useVehiclesStore((s) => s.clearFilter);

  const handleLoadMore = () => {
    nextPage();
  };

  const {
    data: carsData,
    isSuccess: isCarsSuccess,
    isError: isCarsError,
    error: carsError,
    isLoading: isCarsLoading,
  } = useQuery({
    queryKey: ["getCars", filter, currentPage],
    queryFn: () => fetchCars(filter, currentPage.toString()),
  });

  const noMoreResults =
    isCarsSuccess && carsData && carsData.totalPages === currentPage;

  useEffect(() => {
    if (isCarsSuccess) {
      resetPage();
      clearVehicles();
      clearFilter();
    }
  }, []);

  useEffect(() => {
    if (!isCarsSuccess) return;

    if (currentPage === 1) {
      setVehicles(carsData.cars);
    } else {
      addVehicles(carsData.cars);
    }
  }, [isCarsSuccess, carsData, currentPage, setVehicles, addVehicles]);

  return (
    <div className={css.carListContainer}>
      <ul className={css.carList}>
        {cars.map((car) => {
          return <CarItem key={car.id} car={car} />;
        })}
      </ul>
      {!noMoreResults ? (
        <button
          className={css.buttonLoadMore}
          type="button"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default CarList;
