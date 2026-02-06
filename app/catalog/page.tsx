import CarList from "@/components/CarList/CarList";
import SearchForm from "@/components/SearchForm/SearchForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./page.module.css";
import { fetchBrands, fetchCars } from "@/lib/carsApi";
import { Car, Cars } from "@/type/car";

const Catalog = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getCars", null, null],
    queryFn: () => fetchCars(null, "1"),
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
          <SearchForm allCars={allCars} />
          <CarList />
        </div>
      </HydrationBoundary>
    </>
  );
};

export default Catalog;
