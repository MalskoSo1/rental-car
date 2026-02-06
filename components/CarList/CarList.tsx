"use client";

import CarItem from "../CarItem/CarItem";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import css from "./CarList.module.css";
import { useEffect } from "react";
import { fetchCars } from "@/lib/carsApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

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
  const vehicles = useVehiclesStore((s) => s.vehicles);

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
    if (isCarsError) {
      toast.error("Oops! Something went wrong while loading cars.");
    }
  }, [isCarsError, carsError]);

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
      {vehicles && vehicles?.length > 0 && (
        <div className={css.carListWrapper}>
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
      )}
      {vehicles && vehicles.length === 0 && !isCarsLoading && (
        <p className={css.noDataList}>No results for your search.</p>
      )}
      {isCarsLoading && (
        <div className={css.carListLoaderWrapper}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CarList;
