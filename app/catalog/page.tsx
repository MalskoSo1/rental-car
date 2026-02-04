import CarList from "@/components/CarList/CarList";
import SearchForm from "@/components/SearchForm/SearchForm";
import { getBrandsServer, getCarsServer } from "@/lib/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./page.module.css";

const Catalog = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getCars"],
    queryFn: () => getCarsServer(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["getBrands"],
    queryFn: () => getBrandsServer(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={css.content}>
          <SearchForm />
          <CarList />
        </div>
      </HydrationBoundary>
    </>
  );
};

export default Catalog;
