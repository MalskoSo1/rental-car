// import css from "./page.module.css";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { getCarByIdServer } from "@/lib/serverApi";

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getCar", id],
    queryFn: () => getCarByIdServer(id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarDetailsClient />
      </HydrationBoundary>
    </>
  );
};

export default CarDetails;
