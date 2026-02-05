import CarList from "@/components/CarList/CarList";
import SearchForm from "@/components/SearchForm/SearchForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import css from "./page.module.css";
import { fetchBrands, fetchCars } from "@/lib/carsApi";
import { Car, Cars } from "@/type/car";
import { useState } from "react";

const Catalog = async () => {
  const queryClient = new QueryClient();
  let page = 1;

  const plusPage = () => {
    page++;
  };

  const resetPage = () => {
    page = 1;
  };

  await queryClient.prefetchQuery({
    queryKey: ["getCars", null],
    queryFn: () => fetchCars(null),
  });

  const carsData = queryClient.getQueryData<Cars>(["getCars", null]);

  const allCarsData = await queryClient.fetchQuery({
    queryKey: ["getAllCars"],
    queryFn: () => fetchCars(null, "1", carsData?.totalCars.toString()),
  });
  const allCars: Car[] = allCarsData.cars;

  await queryClient.prefetchQuery({
    queryKey: ["getBrands"],
    queryFn: () => fetchBrands(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={css.content}>
          <SearchForm allCars={allCars} page={page} />
          <CarList plusPage={plusPage} />
        </div>
      </HydrationBoundary>
    </>
  );
};

export default Catalog;
